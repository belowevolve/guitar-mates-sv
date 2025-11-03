import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	perfectionist.configs['recommended-alphabetical'],
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',
			'perfectionist/sort-imports': [
				'error',
				{
					groups: [
						'type-import',
						['value-builtin', 'value-external'],
						[
							'type-parent',
							'type-sibling',
							'type-index',
							'value-parent',
							'value-sibling',
							'value-index'
						],
						'type-internal',
						'value-internal',
						'ts-equals-import',
						'unknown'
					],
					internalPattern: ['^~/.+', '^@/.+', '^\\$lib/.+']
				}
			]
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				projectService: true,
				svelteConfig
			}
		},
		rules: {
			'svelte/no-at-html-tags': 'off',
			'svelte/no-navigation-without-resolve': 'off',
			'svelte/sort-attributes': 'error'
		}
	}
);
