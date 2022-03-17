import recordTick from '@/commands/raids/record-tick';
import addRaid from '@/commands/raids/add';
import { getConnection } from '@/util/db';

let raid: Raid;

beforeEach(async () => {
  raid = await addRaid('Mistmoore', 5);
  const knex = await getConnection();
  await knex('player_raid').del();
});

it(`allows us to record an early tick`, async () => {
  const onTimeTick = await recordTick(raid.id, ['karadin']);
  expect(onTimeTick.tick).toEqual(0);
  const firstTick = await recordTick(raid.id, ['karadin']);
  expect(firstTick.tick).toEqual(1);
});

it(`allows us to record a final tick`, async () => {
  await recordTick(raid.id, ['karadin']); // on time tick
  const firstTick = await recordTick(raid.id, ['karadin']);
  const finalTick = await recordTick(raid.id, ['karadin'], true);
  expect(finalTick.tick).toBe(firstTick.tick + 1);
});

it(`won't allow us to record another tick within the same hour`, async () => {
  const onTimeTick = await recordTick(raid.id, ['karadin']);
  expect(onTimeTick.tick).toEqual(0);
  const firstTick = await recordTick(raid.id, ['karadin']);
  expect(firstTick.tick).toEqual(1);
  const additionalTick = await recordTick(raid.id, ['karadin']);
  expect(additionalTick.tick).toEqual(firstTick.tick);
});
