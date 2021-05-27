#!/usr/bin/env node
"use strict";

var _child_process = require("child_process");

var _path = require("path");

function parseArgs(args) {
  const envVars = [];

  for (let index = 0; index < args.length; index++) {
    if (args[index].match(/^[a-zA-Z_][a-zA-Z0-9_]*=/)) {
      envVars.push(args[index].split('=', 2));
      continue;
    }

    return {
      envVars: Object.fromEntries(envVars),
      command: (0, _path.normalize)(args[index]),
      commandArgs: args.slice(index + 1)
    };
  }

  return {
    envVars: {},
    command: '',
    commandArgs: []
  };
}

function run(args) {
  const {
    envVars,
    command,
    commandArgs
  } = parseArgs(args);

  if (!command) {
    console.error('[ERROR: with-env] No command passed. Pass a command like\n    with-env MY_VAR="my value" my-command');
    process.exit(1);
  }

  const commandProcess = (0, _child_process.spawn)(command, commandArgs, {
    stdio: 'inherit',
    shell: true,
    env: envVars
  });
  process.on('SIGTERM', () => commandProcess.kill('SIGTERM'));
  process.on('SIGINT', () => commandProcess.kill('SIGINT'));
  process.on('SIGBREAK', () => commandProcess.kill('SIGBREAK'));
  process.on('SIGHUP', () => commandProcess.kill('SIGHUP'));
  commandProcess.on('exit', (code, signal) => {
    if (code === null) {
      process.exit(signal === 'SIGINT' ? 0 : 1);
    }

    process.exit(code);
  });
}

run(process.argv.slice(2));