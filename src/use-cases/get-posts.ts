import mysql from 'promise-mysql';

export default class GetPosts {
  constructor() {}

  async execute(): Promise<object[]> {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    const query = await connection.query('SELECT * FROM posts');

    await connection.end();

    return query;
  }
}
