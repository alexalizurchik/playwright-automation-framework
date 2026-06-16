// @ts-check
const { test } = require('./fixtures');

test('Should check button enabling', async({ dynamicPage }) => {
  await dynamicPage.open();
  await dynamicPage.checkEnableAfterButton();
});

test('Should check button color change', async({ dynamicPage }) => {
  await dynamicPage.open();
  await dynamicPage.checkColorChangeButton();
});

test('Should check button visibility', async({ dynamicPage }) => {
  await dynamicPage.open();
  await dynamicPage.checkVisibleAfterButton();
});
