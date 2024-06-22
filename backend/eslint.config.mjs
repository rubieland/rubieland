import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {
    ignores: ['dist/**', 'coverage/**', '*.cjs'],
  },
  {
    rules: {
      // TODO: add more rules
      'object-shorthand': 'error', // Expected property shorthand.
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Unexpected any. Specify a different type.
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        // var is defined but never used.

        'error',
        { argsIgnorePattern: '^_' }, // ignores the rule in arguments of a function if arg starts with underscore ('_arg')
      ],
    },
  },
];
