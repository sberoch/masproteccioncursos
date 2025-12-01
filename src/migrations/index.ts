import * as migration_20251201_180831 from './20251201_180831';

export const migrations = [
  {
    up: migration_20251201_180831.up,
    down: migration_20251201_180831.down,
    name: '20251201_180831'
  },
];
