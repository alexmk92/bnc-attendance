import { getConnection } from '@/util/db';

export default async (raidId: number): Promise<{ data: string }> => {
  const knex = await getConnection();
  const raid = await knex.from('raid').where('id', raidId).first();
  if (!raid) {
    throw new Error(`Raid ${raidId} not found`);
  }

  await knex.from('raid').where('id', raidId).del();
  return { data: `Raid ${raidId} deleted` };
};
