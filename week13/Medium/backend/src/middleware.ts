import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function initMiddleware(app: any) {
  app.use('/api/v1/blog', (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization || '';
    const token = header.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as { id: string };
      (req as any).userId = decoded.id;
      next();
    } catch (err) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
  });
}
