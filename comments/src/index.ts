import crypto from 'crypto';
import express, { Application, Request, Response } from 'express';

const app: Application = express();
app.use(express.json());

const port = process.env.PORT || 9998;

const commentsByPostId: any = {};

app.get('/posts/:id/comments', (req: Request, res: Response) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req: Request, res: Response) => {
  const { content } = req.body;
  const commentId = crypto.randomBytes(4).toString('hex');

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
