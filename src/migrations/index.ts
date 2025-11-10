import * as migration_20251104_151922 from './20251104_151922';
import * as migration_20251110_122603 from './20251110_122603';
import * as migration_20251110_133530 from './20251110_133530';
import * as migration_20251110_141958 from './20251110_141958';

export const migrations = [
  {
    up: migration_20251104_151922.up,
    down: migration_20251104_151922.down,
    name: '20251104_151922',
  },
  {
    up: migration_20251110_122603.up,
    down: migration_20251110_122603.down,
    name: '20251110_122603',
  },
  {
    up: migration_20251110_133530.up,
    down: migration_20251110_133530.down,
    name: '20251110_133530',
  },
  {
    up: migration_20251110_141958.up,
    down: migration_20251110_141958.down,
    name: '20251110_141958'
  },
];
