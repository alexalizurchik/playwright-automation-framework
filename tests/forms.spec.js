const { test } = require('./fixtures');
const { practiceFormUser, formInvalidEmail, formInvalidMobile } = require('./test-data');

test.describe('@ui Practice Form tests', async() => {
  test('@smoke Should fill the form and submit it', async({ formsPage }) => {
    await formsPage.open();
    await formsPage.fillForm(practiceFormUser);
    await formsPage.checkSubmissionResult(practiceFormUser);
  });

  test('@smoke Should not submit form with invalid email', async({ formsPage }) => {
    await formsPage.open();
    await formsPage.fillBaseInfo(formInvalidEmail);
    await formsPage.clickSubmit();

    await formsPage.checkModalNotVisible();
  });

  test('@regression Should not submit form with 9-digit mobile number', async({ formsPage }) => {
    await formsPage.open();
    await formsPage.fillBaseInfo(formInvalidMobile);
    await formsPage.clickSubmit();

    await formsPage.checkModalNotVisible();
  });

  test('@smoke Should not submit empty form', async({ formsPage }) => {
    await formsPage.open();
    await formsPage.submitEmptyForm();

    await formsPage.checkModalNotVisible();
  });
})