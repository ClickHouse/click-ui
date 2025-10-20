#!/usr/bin/env node

import { initCommand } from './commands/init.js';

const args = process.argv.slice(2);
const command = args[0];

if (command === 'init') {
  const options = {
    format: 'ts',
    force: false
  };

  // Parse options
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '-f' || args[i] === '--format') {
      options.format = args[i + 1];
      i++;
    } else if (args[i] === '--force') {
      options.force = true;
    } else if (args[i] === '-h' || args[i] === '--help') {
      console.log(`
Usage: @clickhouse/click-ui init [options]

Initialize Click UI configuration file

Options:
  -f, --format <format>  Config format (js or ts) (default: "ts")
  --force                Overwrite existing config file
  -h, --help             Display help for command
      `);
      process.exit(0);
    }
  }

  initCommand(options);
} else if (command === '--version' || command === '-V') {
  console.log('0.0.234');
} else if (command === '--help' || command === '-h' || !command) {
  console.log(`
Usage: @clickhouse/click-ui [options] [command]

CLI for ClickHouse Click UI

Options:
  -V, --version   Output the version number
  -h, --help      Display help for command

Commands:
  init [options]  Initialize Click UI configuration file
  help [command]  Display help for command
  `);
} else {
  console.error(`Unknown command: ${command}`);
  console.log('Run "@clickhouse/click-ui --help" for usage information.');
  process.exit(1);
}
