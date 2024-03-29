import { getConnection } from '@/util/db';

type LootLine = {
  playerName: string;
  itemName: string;
  quantity?: number;
  lootedFrom?: string;
  wasAssigned: boolean;
};

export default async (raidId: string | bigint, lootLines: LootLine[]) => {
  const knex = await getConnection();
  const playerNames = lootLines
    .map(({ playerName }) => playerName?.toLowerCase().trim())
    .filter((p) => !!p);
  const itemNames = lootLines
    .map(({ itemName }) => {
      return itemName?.toLowerCase().trim();
    })
    .filter((i) => !!i);
  const itemIds = await knex
    .select(['id', 'name'])
    .from('item')
    .whereIn('name', itemNames);

  const playerIds = await knex
    .select(['id', 'name'])
    .from('player')
    .whereIn('name', playerNames);

  const playerNameIdMap: { [key: string]: bigint } = {};
  playerIds.forEach((player: { name: string; id: string }) => {
    playerNameIdMap[player.name.toLowerCase()] = BigInt(player.id);
  });

  const itemNameIdMap: { [key: string]: bigint } = {};
  itemIds.forEach((item: { name: string; id: string }) => {
    itemNameIdMap[item.name.toLowerCase()] = BigInt(item.id);
  });

  const linesToInsert = lootLines
    .map((lootLine) => {
      const { playerName, itemName, quantity, lootedFrom, wasAssigned } =
        lootLine;
      const playerId = playerNameIdMap[playerName?.toLowerCase()];
      const itemId = itemNameIdMap[itemName?.toLowerCase()];
      if (!playerId) {
        return null;
      }
      const date = new Date();
      date.setMilliseconds(0);
      date.setSeconds(0);

      return {
        looted_by_id: BigInt(playerId),
        item_id: BigInt(itemId),
        raid_id: BigInt(raidId),
        quantity: BigInt(quantity ?? 1),
        looted_from: lootedFrom || null,
        was_assigned: wasAssigned,
        created_at: date.toISOString(),
        updated_at: date.toISOString(),
      };
    })
    .filter((line) => line !== null);

  if (!linesToInsert.length) {
    return 0;
  }

  console.log(lootLines);
  console.info('inserting', linesToInsert);
  const rows = await knex('loot_history')
    .insert(linesToInsert)
    .onConflict()
    .ignore()
    .returning('*');
  console.log(rows);
  /// @ts-ignore
  return rows.reduce((acc, { rowCount }) => acc + rowCount, 0);
};
