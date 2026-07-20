const { test } = require('./fixtures');
const { practiceFormUser } = require('./test-data');

test.describe('@ui Practice Form tests', async() => {
  test('@smoke Should fill the form and submit it', async({ formsPage }) => {
    await formsPage.open();
    await formsPage.fillForm(practiceFormUser);
    await formsPage.checkSubmissionResult(practiceFormUser);
  });

  test('@smoke Should not submit form with invalid email', async({ formsPage }) => {
    await formsPage.open();
    await formsPage.submitWithInvalidEmail('not-an-email');

    await formsPage.checkModalNotVisible();
  });

  test('@regression Should not submit form with 9-digit mobile number', async({ formsPage }) => {
    await formsPage.open();
    await formsPage.submitWithInvalidMobile('123456789');

    await formsPage.checkModalNotVisible();
  });

  test('@smoke Should not submit empty form', async({ formsPage }) => {
    await formsPage.open();
    await formsPage.submitEmptyForm();

    await formsPage.checkModalNotVisible();
  });
})