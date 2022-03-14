import { Knex } from 'knex';
import { newDb } from 'pg-mem';

export const getTestDb = async () => {
  const mem = newDb();
  const knex = mem.adapters.createKnex(undefined, {
    migrations: '@/migrations',
  }) as Knex<any, unknown[]>;
  await knex.migrate.latest();
  return knex;
};
