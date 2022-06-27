import Post from '../../domain/entity/post';
import PostRepository from '../../domain/repository/post-repository';
import mysql from 'promise-mysql';

export default class PostDatabaseRepository implements PostRepository {
  async save(post: Post): Promise<number> {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    const result = await connection.query(
      `INSERT INTO posts (title, content) VALUES (?, ?)`,
      [post.title, post.content]
    );

    await connection.end();

    return result.insertId;
  }

  async get(): Promise<Post[]> {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    const posts: Post[] = await connection.query('SELECT * FROM posts');

    await connection.end();

    return posts;
  }

  async delete(id: number): Promise<void> {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    await connection.query(`DELETE FROM posts WHERE id = ?`, [id]);

    await connection.end();
  }
}
