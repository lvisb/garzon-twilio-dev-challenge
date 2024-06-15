import globals from "globals";
import tseslint from "typescript-eslint";
import pluginImport from 'eslint-plugin-import';

import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      }
    }
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      'sort-imports': [
        'error',
        { ignoreCase: true, ignoreDeclarationSort: true },
      ],
    }
  },
  {
    plugins: {
      import: pluginImport
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'type',
            'builtin',
            'external',
            'internal',
            ['sibling', 'parent'],
            'index',
          ],
          pathGroups: [
            {
              pattern: '~/**',
              group: 'sibling',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['type'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ]
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off' 
    }
  },
];
