// @ts-check
const { test } = require('./fixtures');
const { practiceFormUser } = require('./test-data');

test('Should fill the form and submit it', async({ formsPage }) => {
  await formsPage.open();
  await formsPage.fillForm(practiceFormUser);
  await formsPage.checkSubmissionResult(practiceFormUser);
});
