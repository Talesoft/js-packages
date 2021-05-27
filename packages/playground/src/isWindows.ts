export default function isWindows(): boolean {
  return process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE ?? '')
}
