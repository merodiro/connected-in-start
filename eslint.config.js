/* eslint-disable import-x/no-named-as-default-member */
import importAlias from '@dword-design/eslint-plugin-import-alias'
import react from '@eslint-react/eslint-plugin'
import js from '@eslint/js'
import tanStackQuery from '@tanstack/eslint-plugin-query'
import tanstackRouter from '@tanstack/eslint-plugin-router'
//  @ts-check
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import { importX } from 'eslint-plugin-import-x'
import perfectionist from 'eslint-plugin-perfectionist'
import promise from 'eslint-plugin-promise'
import reactHooksConfigs from 'eslint-plugin-react-hooks'
import unicorn from 'eslint-plugin-unicorn'
import { defineConfig, globalIgnores } from 'eslint/config'
import ts from 'typescript-eslint'

export default defineConfig(
  globalIgnores(['**/routeTree.gen.ts']),
  {
    extends: [
      js.configs.recommended,
      ts.configs.strictTypeChecked,
      ts.configs.stylisticTypeChecked,
      react.configs['recommended-typescript'],
      reactHooksConfigs.configs.flat.recommended,
      unicorn.configs.recommended,
      tanstackRouter.configs['flat/recommended'],
      tanStackQuery.configs['flat/recommended'],
      // @ts-expect-error Missing types
      promise.configs['flat/recommended'],
      importX.flatConfigs.recommended,
      importX.flatConfigs.react,
      importX.configs.typescript,
      importAlias.configs.recommended,
    ],
    plugins: {
      perfectionist,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-inferrable-types': [
        'error',
        { ignoreParameters: true },
      ],
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        { ignoreArrowShorthand: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            arguments: false,
            attributes: false,
          },
        },
      ],
      'perfectionist/sort-imports': ['error'],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/no-nested-ternary': 'off',
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      '@eslint-react/no-useless-fragment': 'error',
      '@dword-design/import-alias/prefer-alias': [
        'error',
        {
          alias: {
            '@': './src',
          },
        },
      ],
    },
    settings: {
      'import-x/resolver-next': [createTypeScriptImportResolver({})],
      perfectionist: {
        type: 'natural',
      },
    },
  },
  {
    files: ['**/*.js'],
    extends: [ts.configs.disableTypeChecked],
  },
)
