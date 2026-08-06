const { test, expect } = require('../fixtures');


async function checkPopup(newPage, assertion) {
    try {
        await assertion(newPage);
    } finally {
        await newPage.close();
    }
}

test.describe('@ui Browser windows tests', () => {
    const expectedUrl = 'https://demoqa.com/sample';
    const expectedHeading = 'This is a sample page';

    test.beforeEach(async ({ windowsPage }) => {
        await windowsPage.open();
    });

    test('@smoke Should open new tab and check url', async ({ windowsPage }) => {
        const newPage = await windowsPage.openNewTab();
        const assertion = () => expect(newPage).toHaveURL(expectedUrl);

        await checkPopup(newPage, assertion);
    });

    test('@regression Should open new tab and check heading', async ({ windowsPage }) => {
        const newPage = await windowsPage.openNewTab();
        const assertion = async () => expect(await windowsPage.getPopupHeading(newPage)).toBe(expectedHeading);
        await checkPopup(newPage, assertion);
    });

    test('@regression Should open new window and check url', async ({ windowsPage }) => {
        const newPage = await windowsPage.openNewWindow();
        const assertion = async () => await expect(newPage).toHaveURL(expectedUrl);

        await checkPopup(newPage, assertion);
    });

    test('@regression Should open new window and check heading', async ({ windowsPage }) => {
        const newPage = await windowsPage.openNewWindow();
        const assertion = async () => expect(await windowsPage.getPopupHeading(newPage)).toBe(expectedHeading);

        await checkPopup(newPage, assertion);
    });

    test('@regression Should open new window message and check text', async ({ windowsPage }) => {
        const newPage = await windowsPage.openNewWindowMessage();
        const expectedText =
            'Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.';

        const assertion = async () => expect(await windowsPage.getPopupBodyText(newPage)).toBe(expectedText);
        
        await checkPopup(newPage, assertion);
    });
});
