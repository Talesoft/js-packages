"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;

var _process$argv;

// import { spawn } from 'child_process'
function run(args) {
  console.log(args); // if (command) {
  //   const proc = spawn(
  //     // run `path.normalize` for command(on windows)
  //     commandConvert(command, env, true),
  //     // by default normalize is `false`, so not run for cmd args
  //     commandArgs.map(arg => commandConvert(arg, env)),
  //     {
  //       stdio: 'inherit',
  //       shell: options.shell,
  //       env,
  //     },
  //   )
  //   process.on('SIGTERM', () => proc.kill('SIGTERM'))
  //   process.on('SIGINT', () => proc.kill('SIGINT'))
  //   process.on('SIGBREAK', () => proc.kill('SIGBREAK'))
  //   process.on('SIGHUP', () => proc.kill('SIGHUP'))
  //   proc.on('exit', (code, signal) => {
  //     let crossEnvExitCode = code
  //     // exit code could be null when OS kills the process(out of memory, etc) or due to node handling it
  //     // but if the signal is SIGINT the user exited the process so we want exit code 0
  //     if (crossEnvExitCode === null) {
  //       crossEnvExitCode = signal === 'SIGINT' ? 0 : 1
  //     }
  //     process.exit(crossEnvExitCode) //eslint-disable-line no-process-exit
  //   })
  //   return proc
  // }
  // return null
}

run((_process$argv = process.argv) !== null && _process$argv !== void 0 ? _process$argv : []);