const { test, expect } = require('./fixtures');

test.describe('@ui Browser windows tests', () => {
  const expectedUrl = 'https://demoqa.com/sample';
  const expectedHeading = 'This is a sample page';

  test.beforeEach(async({ windowsPage }) => {
    await windowsPage.open();
  });

  test('@smoke Should open new tab and check url', async({ windowsPage }) => {
    await windowsPage.checkNewTabUrl(expectedUrl);
  });

  test('@regression Should open new tab and check heading', async({ windowsPage }) => {
    await windowsPage.checkNewTabHeading(expectedHeading);
  });

  test('@regression Should open new window and check url', async({ windowsPage }) => {
    await windowsPage.checkNewWindowUrl(expectedUrl);
  });

  test('@regression Should open new window and check heading', async({ windowsPage }) => {
    await windowsPage.checkNewWindowHeading(expectedHeading);
  });

  test('@regression Should open new window message and check text', async({ windowsPage }) => {
    const expectedText = 'Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.';

    await windowsPage.checkNewWindowMessageText(expectedText);
  });

  test('@regression Should not match wrong URL in new tab', async({ windowsPage }) => {
    const pagePromise = windowsPage.page.context().waitForEvent('page');

    await windowsPage.page.locator('#tabButton').click();

    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    try {
      await expect(newPage).not.toHaveURL('https://example.com');
    } finally {
      await newPage.close();
    }
  });
});
