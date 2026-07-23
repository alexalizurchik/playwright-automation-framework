const playwright = require('eslint-plugin-playwright');
const prettier = require('eslint-config-prettier');

module.exports = [
    {
        ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'blob-report/'],
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script',
            globals: {
                require: 'readonly',
                module: 'readonly',
                __dirname: 'readonly',
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
