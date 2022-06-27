import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import CreatePost from './use-cases/create-post';
import DeletePost from './use-cases/delete-post';
import GetPosts from './use-cases/get-posts';

const app = express();
app.use(express.json());

app.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getPosts = new GetPosts();

    const posts = await getPosts.execute();

    return res.json(posts);
  } catch (error) {
    next(error);
  }
});

app.post('/posts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createPost = new CreatePost();

    const result = await createPost.execute({
      title: req.body.title,
      content: req.body.content,
    });

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

app.delete(
  '/posts/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletePost = new DeletePost();

      await deletePost.execute({ id: +req.params.id });

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res
    .status(statusCode)
    .json({ message: err instanceof Error ? err.message : err });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on http://${process.env.HOST}:${process.env.PORT}`
  );
});
