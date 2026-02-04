import * as migration_20251201_180831 from './20251201_180831';
import * as migration_20251219_001133 from './20251219_001133';
import * as migration_20260203_192200 from './20260203_192200';

export const migrations = [
  {
    up: migration_20251201_180831.up,
    down: migration_20251201_180831.down,
    name: '20251201_180831',
  },
  {
    up: migration_20251219_001133.up,
    down: migration_20251219_001133.down,
    name: '20251219_001133',
  },
  {
    up: migration_20260203_192200.up,
    down: migration_20260203_192200.down,
    name: '20260203_192200'
  },
];
