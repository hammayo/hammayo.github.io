module.exports = {
  extends: ['next/core-web-vitals'],
  plugins: ['@typescript-eslint', 'unused-imports'],
  rules: {
    // Disable specific rules that are causing issues
    '@typescript-eslint/no-explicit-any': 'off',
    'react/no-unescaped-entities': 'off',
    'import/no-unused-modules': 'off',
    
    // Other useful rules
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'unused-imports/no-unused-imports': 'warn',
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'public/',
    '*.config.js',
    '*.config.ts',
  ],
};