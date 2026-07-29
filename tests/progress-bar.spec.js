const { test, expect } = require('../fixtures');

test.describe('@ui Progress bar tests', async () => {
    test.afterEach(async ({ page }) => {
        await expect(page).toHaveScreenshot({ animations: 'disabled' });
    });

    test('@regression Should reset progress bar', async ({ progressBarPage }) => {
        await progressBarPage.open();
        await progressBarPage.startProgress();
        await progressBarPage.waitForCompletion();
        await progressBarPage.resetProgress();
        await progressBarPage.checkIsReset();
    });

    test('@regression Should not reset progress bar before starting', async ({
        progressBarPage,
    }) => {
        await progressBarPage.open();
        await progressBarPage.checkIsReset();
    });
});
