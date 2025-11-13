#!/bin/bash

pnpm install
pnpm payload migrate:create --skip-empty
pnpm payload migrate
pnpm build
pm2 start pnpm --name "test-front" -- start
pm2 save