import addRaid from '@/commands/raids/add';
import deleteRaid from '@/commands/raids/delete';

it(`allows us to add a new raid for a given split`, async () => {
  const raid = await addRaid('Mistmoore', 1);
  expect(raid.name).toContain('mistmoore');
  expect(raid.split).toEqual('1');
  await deleteRaid([raid.id!]);
});

it(`will rename an existing raid if one is created for the same split on a given day`, async () => {
  const raid = await addRaid('Butcherblock LDoN', 3);
  expect(raid.split).toEqual('3');
  expect(raid.name).toContain('butcherblock ldon');

  const raid2 = await addRaid('Plane of Time', 3);
  expect(raid2.id).toEqual(raid.id);
  expect(raid2.split).toEqual('3');
  expect(raid2.name).toContain('plane of time');

  await deleteRaid([raid.id!, raid2.id!]);
});

it(`will allow multiple raids to be created on the same day if a new split id is used`, async () => {
  const raid = await addRaid('Mistmoore', 4);
  expect(raid.split).toEqual('4');
  expect(raid.name).toContain('mistmoore');

  const raid2 = await addRaid('Mistmoores', 5);
  expect(raid2.split).toEqual('5');
  expect(raid2.name).toContain('mistmoores');
  expect(raid2.id).not.toEqual(raid.id);

  await deleteRaid([raid.id!, raid2.id!]);
});
