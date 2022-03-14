import { getConnection } from '@/util/db';

export default async (raidId: number[]): Promise<{ data: string }> => {
  const knex = await getConnection();
  await knex.from('raid').whereIn('id', raidId).del();
  return { data: `Raid ${raidId.join(', ')} deleted` };
};
