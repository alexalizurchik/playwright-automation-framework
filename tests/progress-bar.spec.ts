import { test, expect } from '../fixtures/index.js';

test.describe('@ui Progress bar tests', async () => {
    test.beforeEach(async ({ progressBarPage }) => {
        await progressBarPage.open();
    });

    test('@regression Should reset progress bar', async ({ progressBarPage }) => {
        await progressBarPage.startProgress();

        await expect
            .poll(() => progressBarPage.getProgressStatus(), { timeout: 20000 })
            .toBe('100%');

        await progressBarPage.resetProgress();

        await expect.poll(() => progressBarPage.getProgressValue()).toBe('0');
    });

    test('@regression Should not reset progress bar before starting', async ({
        progressBarPage,
    }) => {
        await expect.poll(() => progressBarPage.getProgressValue()).toBe('0');
    });
});
