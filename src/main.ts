import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import CreatePost from './application/create-post';
import DeletePost from './application/delete-post';
import GetPosts from './application/get-posts';
import MysqlAdapter from './infra/database/mysql-adapter';
import PostDatabaseRepository from './infra/repository/post-database-repository';

const connection = new MysqlAdapter();
const postRepository = new PostDatabaseRepository(connection);

const app = express();
app.use(express.json());

app.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getPosts = new GetPosts(postRepository);

    const posts = await getPosts.execute();

    return res.json(posts);
  } catch (error) {
    next(error);
  }
});

app.post('/posts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createPost = new CreatePost(postRepository);

    const id = await createPost.execute({
      title: req.body.title,
      content: req.body.content,
    });

    return res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
});

app.delete(
  '/posts/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletePost = new DeletePost(postRepository);

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

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server running on http://${process.env.HOST}:${process.env.PORT}`
  );
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log("server is going to sleep...")
    connection.close()
  })
})