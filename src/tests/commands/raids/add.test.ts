import addRaid from '@/commands/raids/add';

it(`allows us to add a new raid for a given split`, async () => {
  const raid = await addRaid('Mistmoore', 1);
  expect(raid.name).toContain('Mistmoore');
  expect(raid.split).toEqual(1);
});

it(`will rename an existing raid if one is created for the same split on a given day`, async () => {
  const raid = await addRaid('Butcherblock LDoN', 1);
  expect(raid.split).toEqual(1);
  expect(raid.name).toContain('Butcherblock LDoN');

  const raid2 = await addRaid('Plane of Time', 1);
  expect(raid2.split).toEqual(1);
  expect(raid2.name).toContain('Plane of Time');
  expect(raid2.id).toEqual(raid.id);
});

it(`will allow multiple raids to be created on the same day if a new split id is used`, async () => {
  const raid = await addRaid('Mistmoore', 1);
  expect(raid.split).toEqual(1);
  expect(raid.name).toContain('Mistmoore');

  const raid2 = await addRaid('Mistmoore', 2);
  expect(raid2.split).toEqual(2);
  expect(raid2.name).toContain('Mistmoore');
  expect(raid2.id).not.toEqual(raid.id);
});
