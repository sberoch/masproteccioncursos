import * as migration_20251104_151922 from './20251104_151922';

export const migrations = [
  {
    up: migration_20251104_151922.up,
    down: migration_20251104_151922.down,
    name: '20251104_151922'
  },
];
