const { test } = require('./fixtures');

test.describe('@ui Progress bar tests', async() => {
  test('@regression Should reset progress bar', async({ progressBarPage }) => {
    await progressBarPage.open();
    await progressBarPage.startProgress();
    await progressBarPage.waitForCompletion();
    await progressBarPage.resetProgress();
    await progressBarPage.checkIsReset();
  });
});
