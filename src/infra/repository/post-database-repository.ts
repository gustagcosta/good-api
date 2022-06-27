import Post from '../../domain/entity/post';
import PostRepository from '../../domain/repository/post-repository';
import Connection from '../database/connection';

export default class PostDatabaseRepository implements PostRepository {
  constructor(readonly connection: Connection) { }

  async save(post: Post): Promise<number> {
    const [result] = await this.connection.query(
      `INSERT INTO posts (title, content) VALUES (?, ?)`,
      [post.title, post.content]
    );

    return result.insertId;
  }

  async get(): Promise<Post[]> {
    const posts: Post[] = await this.connection.query('SELECT * FROM posts');

    return posts;
  }

  async delete(id: number): Promise<void> {
    await this.connection.query(`DELETE FROM posts WHERE id = ?`, [id]);
  }
}
