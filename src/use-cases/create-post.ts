import mysql from 'promise-mysql';

type Input = {
  title: string;
  content: string;
};

type Output = {
  id: string;
};

export default class CreatePost {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    const result = await connection.query(
      `INSERT INTO posts (title, content) VALUES (?, ?)`,
      [input.title, input.content]
    );

    await connection.end();

    return { id: result.insertId };
  }
}
