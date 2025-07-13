// server.ts or index.ts
import express from 'express';
import dotenv from 'dotenv';
import userRouter from './user'; 
import blogRouter from './blog';
import { initMiddleware } from './middleware'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// app.use(cors());
app.use(express.json());

// 🔐 Inject middleware before blog routes
initMiddleware(app);

// Routes (same as Hono path)
app.use('/api/v1/user', userRouter);  // /signup, /signin
app.use('/api/v1/blog', blogRouter);  // /, /bulk, /:id etc.

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// let blogRouter;
// try {
//   blogRouter = require('./blog').default;
//   console.log('✅ blogRouter imported');
// } catch (e) {
//   console.error('❌ Error importing blogRouter:', e);
// }
