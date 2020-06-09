import { resolve } from 'path';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const sqliteOptions: SqliteConnectionOptions = {
  type: 'sqlite',
  database: resolve(__dirname, '..', 'database', 'database.sqlite'),
  entities: [resolve(__dirname, '..', 'database', 'entities', '*')],
  migrations: [resolve(__dirname, '..', 'database', 'migrations', '*')],
  subscribers: [resolve(__dirname, '..', 'database', 'subscribers', '*')],
  synchronize: false,
};
