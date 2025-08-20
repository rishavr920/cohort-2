// comment.ts
import dotenv from 'dotenv';
import express from 'express';
import { PrismaClient } from '@prisma/client'; // your prisma instance
import { TokenExpiredError } from 'jsonwebtoken';

dotenv.config();

const commentRouter = express.Router();
const prisma = new PrismaClient({
  datasources:{
    db: {
      url: process.env.DATABASE_URL,
    }
  }
})
// Add comment
commentRouter.post("/:id/comment", async (req, res) => {
  

  const postId = req.params.id;   
  const userId = (req as any).userId; 
  const { content } = req.body;
  if (!postId || !content) {
    return res.status(400).json({ error: 'Post ID and content are required' });
  }

 try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: userId
      },
      include: {
        author: true,
      }
    });

    res.json({
      username: comment.author.name ?? "Anonymous",
      content: comment.content,
      createdAt: comment.createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Get comments for a post
commentRouter.get('/:id/comments', async (req, res) => {
  const postId = req.params.id;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { author: true },
      orderBy: { createdAt: "desc" }
    });

    // return only the required fields
    const result = comments.map(c => ({
      username: c.author?.name ?? "Anonymous",
      content: c.content,
      createdAt: c.createdAt,
      commentId: c.id
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});


// DELETE /api/v1/post/:postId/comment/:commentId
commentRouter.delete('/:Id/comment/:commentId', async (req, res) => {
  const userId = (req as any).userId; // from auth middleware
  const postId  = req.params.Id;
  const commentId = req.params.commentId

  try {
    // Check if comment exists and belongs to this post
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.postId !== postId) {
      return res.status(400).json({ error: 'Comment does not belong to this post' });
    }

    if (comment.authorId !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});


export default commentRouter