module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'object-shorthand': 'error', // Expected property shorthand.
    '@typescript-eslint/no-explicit-any': 'off', // Unexpected any. Specify a different type.
    'react-hooks/exhaustive-deps': 'off', // React Hook useEffect has missing dependencies : [missingDeps]. Either include them or remove the dependency array.
    '@typescript-eslint/no-unused-vars': [
      // var is defined but never used.

      'error',
      { argsIgnorePattern: '^_' }, // ignores the rule in arguments of a function if arg starts with underscore ('_arg')
    ],
  },
};
