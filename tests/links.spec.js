const { test } = require('./fixtures');

test.describe('@ui Links page tests', () => {
  test.beforeEach(async({ linksPage }) => {
    await linksPage.open();
  });

  test('@smoke Should navigate to the Home page when clicking the Home link', async({ linksPage }) => {
    const newPage = await linksPage.clickSimpleLink();

    try {
      await linksPage.checkHomePageUrl(newPage);
    } finally {
      await newPage.close();
    }
  });

  test('@regression Should display Bad Request status when clicking the Bad Request link', async({ linksPage }) => {
    await linksPage.clickBadRequestLink();
    await linksPage.checkBadRequestResponse();
  });
});
