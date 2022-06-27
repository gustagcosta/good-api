import Connection from './connection';
import knex, { Knex } from 'knex';

export default class MysqlAdapter implements Connection {
  connection: Knex;

  constructor() {
    this.connection = knex({
      client: 'mysql2',
      connection: {
        host: process.env.MYSQL_HOST,
        port: 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      },
    });
  }

  query(statement: string, params?: any): Promise<any> {
    return this.connection.raw(statement, params);
  }

  close(): Promise<void> {
    return this.connection.destroy();
  }
}
