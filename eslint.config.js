import importPlugin from 'eslint-plugin-import'; // Import the import plugin
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier'; // Import Prettier plugin

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', '.eslintrc.cjs'] },
  {
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,

      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-console': 'warn',
      'react/jsx-key': 'warn',
      'no-unused-vars': 'warn',
      'react/prop-types': 'off',
      'import/no-cycle': 'warn',
      'react/display-name': 'warn',
      'no-case-declarations': 'warn',
      'react/button-has-type': 'warn',
      'react/no-children-prop': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'import/newline-after-import': 'warn',
      'import/prefer-default-export': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        },
      ],
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
        },
      ],
    },
  }
);
