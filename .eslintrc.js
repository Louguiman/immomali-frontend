module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // You can relax rules here if needed, e.g.:
    '@typescript-eslint/no-explicit-any': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-restricted-syntax': 'off',
    'no-constant-condition': 'off',
    'no-async-promise-executor': 'off',
    'no-prototype-builtins': 'off',
    'no-case-declarations': 'off',
    'no-empty-pattern': 'off',
    'no-fallthrough': 'off',
    'no-func-assign': 'off',
    'no-global-assign': 'off',
    'no-iterator': 'off',
    'no-labels': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-properties': 'off',
    'no-restricted-syntax': 'off',
    'no-sequences': 'off',
    'no-throw-literal': 'off',
    'no-with': 'off',
    'prefer-const': 'off',
    'prefer-spread': 'off',
    'prefer-template': 'off',
    'valid-typeof': 'off',
  }
};
