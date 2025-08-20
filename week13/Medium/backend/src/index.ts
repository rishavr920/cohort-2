// server.ts or index.ts
import express from 'express';
import dotenv from 'dotenv';
import userRouter from './user'; 
import blogRouter from './blog';
import commentRouter from './comment';
import { initMiddleware } from './middleware'
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://mediumfrontend-alpha.vercel.app' // prod vercel
];


app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked: ' + origin));
    }
  },
  credentials: true
}));
app.use(express.json());

// 🔐 Inject middleware before blog routes
initMiddleware(app);

// Routes (same as Hono path)
app.use('/api/v1/user', userRouter);  // /signup, /signin
app.use('/api/v1/blog', blogRouter);  // /, /bulk, /:id etc.
app.use('/api/v1/post',commentRouter);
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
