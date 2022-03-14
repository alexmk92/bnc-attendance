import { __db__ } from '@/constants';
import knex, { Knex } from 'knex';
import { getTestDb } from './getTestDb';

let connection: Knex<any, unknown[]> | null = null;

export const getConnection = async () => {
  if (!connection) {
    console.log('Spawning new connection');
    if (process.env.NODE_ENV === 'test') {
      connection = await getTestDb();
    } else {
      connection = knex({
        client: 'pg',
        version: '21.2.4',
        connection: __db__,
        debug: __db__.debug,
        migrations: {
          directory: '@/migrations',
        },
      });
    }
  }

  return connection;
};
