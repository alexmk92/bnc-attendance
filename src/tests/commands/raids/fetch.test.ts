import fetch from '@/commands/raids/fetch';

it(`should return an array of raids when a specific raid id is not passed`, async () => {
  const raids = await fetch(0, 'asc', 10);
  expect(raids.totalRows).toBe(0);
});
