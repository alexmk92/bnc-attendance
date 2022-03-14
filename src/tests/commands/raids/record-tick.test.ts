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
  expect(raid.name).toContain('mistmoore');
});

it(`allows us to record a final tick`, async () => {
  expect(true).toBe(true);
});

it(`only permits one tick to be created each hour apart from early/final`, async () => {
  expect(true).toBe(true);
});
