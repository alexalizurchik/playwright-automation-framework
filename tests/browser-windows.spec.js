// @ts-check
const { test } = require('./fixtures');

test.describe('Browser windows tests', () => {
  const expectedUrl = 'https://demoqa.com/sample';
  const expectedHeading = 'This is a sample page';

  test.beforeEach(async({ windowsPage }) => {
    await windowsPage.open();
  });

  test('Should open new tab and check url', async({ windowsPage }) => {
    await windowsPage.checkNewTabUrl(expectedUrl);
  });

  test('Should open new tab and check heading', async({ windowsPage }) => {
    await windowsPage.checkNewTabHeading(expectedHeading);
  });

  test('Should open new window and check url', async({ windowsPage }) => {
    await windowsPage.checkNewWindowUrl(expectedUrl);
  });

  test('Should open new window and check heading', async({ windowsPage }) => {
    await windowsPage.checkNewWindowHeading(expectedHeading);
  });

  test('Should open new window message and check text', async({ windowsPage }) => {
    const expectedText = 'Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.';

    await windowsPage.checkNewWindowMessageText(expectedText);
  });
});
