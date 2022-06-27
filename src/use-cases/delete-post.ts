import mysql from 'promise-mysql';

type Input = {
  id: number;
};

export default class DeletePost {
  constructor() {}

  async execute(input: Input): Promise<void> {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    await connection.query(`DELETE FROM posts WHERE id = ?`, [input.id]);

    await connection.end();
  }
}
