// blogRoutes.ts

import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { blogInput, updateBlogInput } from '@rishav1712/common';

dotenv.config();

const blogRouter = express.Router();
const prisma = new PrismaClient({
  datasources:{
    db: {
      url: process.env.DATABASE_URL,
    }
  }
})
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// 🛡️ Middleware to verify JWT
blogRouter.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };
    // Set user ID in request object
    console.log('Decoded token payload:', payload);

    (req as any).userId = payload.id;
    next();
  } catch (e) {
    return res.status(403).json({ error: 'Invalid token' });
  }
});

// ➕ Create blog post
blogRouter.post('/', async (req, res) => {
  const body = req.body;
  const userId = (req as any).userId;

  const { success } = blogInput.safeParse(body);
  if (!success) return res.status(411).json({ error: 'Invalid input' });

  try {
    // 🔍 Confirm the user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // ✅ Create the post
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    res.json({ id: post.id });
  } catch (e: any) {
    console.error('❌ Prisma error:', e.message, e.code);
    res.status(500).json({ error: 'Error creating blog' });
  }
});


// ✏️ Update blog post
blogRouter.put('/:id', async (req, res) => {
  const userId = (req as any).userId;
  const body = req.body;

  // const { success } = updateBlogInput.safeParse(body);
  // if (!success) return res.status(411).json({ error: 'Invalid input' });

  try {
     // Check if the post exists and belongs to the current user
    const existingPost = await prisma.post.findUnique({
      where: { id: body.id },
    });

    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (existingPost.authorId !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }

    const blog = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    res.send('updated post');
  } catch (e) {
    res.status(500).json({ error: 'Error updating blog post' });
  }
});

// 📃 Get all blogs
blogRouter.get('/bulk', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true
          }
        },
        comments: {
          include: {
            author: true
          }
        }
      }
    });
    res.json({ posts });
  } catch (e) {
    res.status(500).json({ error: 'Error fetching blogs' });
  }
});


blogRouter.get('/my-posts', async (req, res) => {
  const userId = (req as any).userId; // from auth middleware
  try {
    const posts = await prisma.post.findMany({
      where: { authorId: userId }, // 👈 filter by logged-in user
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
        comments: {
          include: {
            author: true,
          },
        },
      },
    });

    res.json({ posts });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error fetching blogs' });
  }
});

    
// 🔍 Get blog by ID (after /bulk)
blogRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
            select: {
              name: true
            }
        },
        comments: {
          include: {
            author: true
          }
        }
      }
    });

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json({ post });
  } catch (e) {
    res.status(500).json({ error: 'Error fetching blog post' });
  }
});

// delete blog 
blogRouter.delete('/:id',  async (req, res) => {

  const userId = (req as any).userId;
  const postId = req.params.id;

  try{
    const existingPost = await prisma.post.findUnique({
      where: {id: postId},
    });

    if(!existingPost){
      return res.status(404).json({error: "Post not found"});
    }

    if(existingPost.authorId !== userId){
      return res.status(403).json({error: "Not authorized to delete this post"});
    }

    await prisma.post.delete({
      where: {id : postId},
    });

    res.send("Post deleted successfully");
  }
  catch(e){
    console.error(e);
    res.status(500).json({ error : "Error deleting blog post"});
  }

})
export default blogRouter