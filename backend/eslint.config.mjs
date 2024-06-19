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
];
