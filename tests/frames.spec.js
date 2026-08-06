const { test, expect } = require('../fixtures');

test.describe('@ui Frames tests', async () => {
    test('@regression Should check a frame heading', async ({ framesPage }) => {
        const expectedFrameHeading = 'This is a sample page';

        await framesPage.open();
        expect(await framesPage.getBigFrameHeading()).toBe(expectedFrameHeading);
    });

    test('@regression Should check a nested frame heading', async ({ framesPage }) => {
        const expectedHeading = 'Child Iframe';

        await framesPage.open('/nestedframes');
        expect(await framesPage.getChildFrameHeading()).toBe(expectedHeading);
    });

    test('@regression Should not find child frame without navigating to nested frames', async ({
        framesPage,
    }) => {
        await framesPage.open();
        expect(await framesPage.isChildFrameVisible()).toBe(false);
    });
});
