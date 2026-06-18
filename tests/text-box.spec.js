const { test } = require('./fixtures');
const { textBoxUser } = require('./test-data');

test.describe('@ui Text box tests', async() => {
  test('@regression Should show a successful message after form submitting', async ({ textBoxPage }) => {
    await textBoxPage.open();
    await textBoxPage.fillForm(textBoxUser.name, textBoxUser.email, textBoxUser.address);

    await textBoxPage.checkOutputBlockText(textBoxUser.name);
  });
});
