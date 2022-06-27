import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import mysql from 'promise-mysql';

const app = express();
app.use(express.json());

app.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    const query = await connection.query('SELECT * FROM posts');

    await connection.end();

    return res.json(query);
  } catch (error) {
    next(error);
  }
});

app.post('/posts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    const result = await connection.query(
      `INSERT INTO posts (title, content) VALUES (?, ?)`,
      [req.body.title, req.body.content]
    );

    await connection.end();

    return res.status(201).json({ id: result.insertId });
  } catch (error) {
    next(error);
  }
});

app.delete(
  '/posts/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      });

      await connection.query(`DELETE FROM posts WHERE id = ?`, [req.params.id]);

      await connection.end();

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
