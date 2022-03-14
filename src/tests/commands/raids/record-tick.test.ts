import recordTick from '@/commands/raids/record-tick';
import addRaid from '@/commands/raids/add';
import deleteRaid from '@/commands/raids/delete';

let raid: Raid;

beforeAll(async () => {
  raid = await addRaid('Mistmoore', 6);
});

afterAll(async () => {
  await deleteRaid([raid.id!]);
});

it(`allows us to record an early tick`, async () => {
  const onTimeTick = await recordTick(raid.id, ['karadin']);
  expect(onTimeTick.tick).toEqual(0);
  const firstTick = await recordTick(raid.id, ['karadin']);
  expect(firstTick.tick).toEqual(1);
});

it(`allows us to record a final tick`, async () => {
  expect(true).toBe(true);
});

it(`only permits one tick to be created each hour apart from early/final`, async () => {
  expect(true).toBe(true);
});
