const { test, expect } = require('../fixtures');

test.describe('@ui Drag and Drop', async () => {
    test.afterEach(async ({ page }) => {
        await expect(page).toHaveScreenshot({ animations: 'disabled' });
    });

    test('@regression Should drag and drop element', async ({ dragAndDropPage }) => {
        await dragAndDropPage.open();
        await dragAndDropPage.dragAndDrop();
    });
});
