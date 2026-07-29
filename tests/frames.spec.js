const { test, expect } = require('../fixtures');

test.describe('@ui Frames tests', async () => {
    test.afterEach(async ({ page }) => {
        await expect(page).toHaveScreenshot({ animations: 'disabled' });
    });

    test('@regression Should check a frame heading', async ({ framesPage }) => {
        const expectedFrameHeading = 'This is a sample page';

        await framesPage.open();
        await framesPage.checkBigFrameHeading(expectedFrameHeading);
    });

    test('@regression Should check a nested frame heading', async ({ framesPage }) => {
        const expectedHeading = 'Child Iframe';

        await framesPage.open('/nestedframes');
        await framesPage.checkChildFrameHeading(expectedHeading);
    });

    test('@regression Should not find child frame without navigating to nested frames', async ({
        framesPage,
    }) => {
        await framesPage.open();
        await framesPage.checkChildFrameIsHidden();
    });
});
