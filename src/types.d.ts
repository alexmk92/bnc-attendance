interface Page {
  data: any[];
  totalRows: number;
  cursor: number;
  direction: Direction;
  pageSize: number;
  id?: number;
}

interface Entity {
  id?: any;
  created_at?: string;
  updated_at?: string;
}

interface Raid extends Entity {
  name: string;
  split: number;
}

interface PlayerAlt {
  player_id: number;
  alt_id: number;
}

interface Player extends Entity {
  name?: string;
  level?: number;
  class?:
    | 'bard'
    | 'beastlord'
    | 'berserker'
    | 'cleric'
    | 'druid'
    | 'enchanter'
    | 'magician'
    | 'monk'
    | 'necromancer'
    | 'paladin'
    | 'ranger'
    | 'rogue'
    | 'shadowknight'
    | 'shaman'
    | 'warrior'
    | 'wizard';
  race?:
    | 'barbarian'
    | 'dark elf'
    | 'drakkin'
    | 'dwarf'
    | 'erudite'
    | 'froglok'
    | 'gnome'
    | 'half elf'
    | 'halfling'
    | 'high elf'
    | 'human'
    | 'iksar'
    | 'ogre'
    | 'troll'
    | 'vah shir'
    | 'wood elf';
  attendance_30?: number;
  attendance_60?: number;
  attendance_90?: number;
  attendance_life?: number;
  ticks_since_last_win?: number;
}

type Direction = 'asc' | 'desc';

type LogLevel = 'info' | 'debug' | 'error' | 'warning' | 'silent';

interface AttendeeMetadata {
  [key: string]: number;
}

interface CacheConfig {
  host: string;
  password: string;
  user: string;
  port: number;
  debug: boolean;
  driver: string;
}

interface Tick {
  previous_tick_time: number;
  last_tick: number;
}
