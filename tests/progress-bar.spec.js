// @ts-check
const { test } = require('./fixtures');

test('Should reset progress bar', async({ progressBarPage }) => {
  await progressBarPage.open();
  await progressBarPage.startProgress();
  await progressBarPage.waitForCompletion();
  await progressBarPage.resetProgress();
  await progressBarPage.checkIsReset();
});
