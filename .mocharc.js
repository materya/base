module.exports = {
  require: [
    'ts-node/register',
    'tsconfig-paths/register',
    './test/mocha.env.ts',
  ],
  timeout: 10000,
  recursive: true,
  colors: true,
  exit: true,
}
