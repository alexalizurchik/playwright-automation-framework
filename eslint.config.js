import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default [
    {
        ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'blob-report/'],
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                process: 'readonly',
                console: 'readonly',
                document: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-undef': 'error',
            'prefer-const': 'error',
            'no-var': 'error',
            'prefer-template': 'warn',
            'no-console': 'off',
        },
    },
    {
        files: ['tests/**/*.js', 'fixtures/**/*.js'],
        ...playwright.configs['flat/recommended'],
        rules: {
            ...playwright.configs['flat/recommended'].rules,
            'playwright/valid-describe-callback': 'off',
            'playwright/no-standalone-expect': 'off',
            'playwright/expect-expect': [
                'warn',
                {
                    assertFunctionNames: [
                        'expect',
                        'checkOutputBlockText',
                        'checkOutputBlockNotVisible',
                    ],
                },
            ],
        },
    },
    prettier,
];
