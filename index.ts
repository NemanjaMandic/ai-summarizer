import concurrently from 'concurrently';

concurrently([
  {
    command: 'bun dev',
    name: 'client',
    prefixColor: 'cyan',
    cwd: 'packages/client',
  },
  {
    command: 'bun dev',
    name: 'server',
    prefixColor: 'green',
    cwd: 'packages/server',
  },
]);
