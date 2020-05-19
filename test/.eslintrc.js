module.exports = {
  env: {
      mocha: true,
  },
  plugins: ['mocha'],
  'extends': [
    'plugin:mocha/recommended',
  ],
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': ['**/*.test.ts', 'test/**/*'],
    }],
    'mocha/no-mocha-arrows': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
  },
}
