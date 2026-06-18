// @ts-check
const { test } = require('./fixtures');

test.describe('@ui Dynamic properties tests', async() => {
  test('@regression Should check button enabling', async({ dynamicPage }) => {
    await dynamicPage.open();
    await dynamicPage.checkEnableAfterButton();
  });

  test('@regression Should check button color change', async({ dynamicPage }) => {
    await dynamicPage.open();
    await dynamicPage.checkColorChangeButton();
  });

  test('@regression Should check button visibility', async({ dynamicPage }) => {
    await dynamicPage.open();
    await dynamicPage.checkVisibleAfterButton();
  });
})
