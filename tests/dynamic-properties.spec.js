const { test, expect } = require('../fixtures');

test.describe('@ui Dynamic properties tests', async () => {
    test.beforeEach(async({ dynamicPage }) => {
        await dynamicPage.open();
    });

    test('@regression Should check button enabling', async ({ dynamicPage }) => {
        expect(await dynamicPage.isEnableAfterButtonEnabled()).toBe(false);
        await expect.poll(() => dynamicPage.isEnableAfterButtonEnabled(), { timeout: 10000 }).toBe(true);
    });

    test('@regression Should check button color change', async ({ dynamicPage }) => {
        expect(await dynamicPage.getColorChangeButtonClass()).not.toContain('text-danger');
        await expect.poll(() => dynamicPage.getColorChangeButtonClass(), { timeout: 10000 }).toContain('text-danger');
    });

    test('@regression Should check button visibility', async ({ dynamicPage }) => {
        expect(await dynamicPage.isVisibleAfterButtonVisible()).toBe(false);
        await expect.poll(() => dynamicPage.isVisibleAfterButtonVisible(), { timeout: 10000 }).toBe(true);
    });
});
