import crypto from 'crypto';
import express from 'express';

const app = express();
app.use(express.json());

const port = process.env.PORT || 9999;

const posts: any = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const { title } = req.body;
  const id = crypto.randomBytes(4).toString('hex');

  posts[id] = {
    id,
    title
  };

  res.status(201).send(posts[id]);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
