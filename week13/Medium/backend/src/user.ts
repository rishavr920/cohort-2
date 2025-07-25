// userRoutes.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { signupInput, signinInput } from '@rishav1712/common'; // Optional Zod validation

dotenv.config();

const userRouter = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// Signup Route
userRouter.post('/signup', async (req, res) => {
 
  const  parsed  = signupInput.safeParse(req.body);
  if (!parsed.success) return res.status(411).json({ error: 'Enter Email...' });
  const { email, password, name } = parsed.data;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    console.log(parsed.data);
    res.json({ jwt: token });
  } catch (e) {
    console.error(e);
    res.status(403).json({ error: 'Error while signing up' });
  }
});

// Signin Route
userRouter.post('/signin', async (req, res) => {
  const body = req.body;

  const { success } = signinInput.safeParse(body);
  if (!success) return res.status(411).json({ error: 'Enter your email' });

  try {
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user || user.password !== body.password) {
      return res.status(403).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({ jwt: token });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Signin failed',
      message: e instanceof Error ? e.message : String(e),
    });
  }
});

export default userRouter;
