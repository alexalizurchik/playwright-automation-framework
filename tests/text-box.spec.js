// @ts-check
const { test } = require('./fixtures');
const { textBoxUser } = require('./test-data');

test('Should show a successful message after form submitting', async ({ textBoxPage }) => {
  await textBoxPage.open();
  await textBoxPage.fillForm(textBoxUser.name, textBoxUser.email, textBoxUser.address);

  await textBoxPage.checkOutputBlockText(textBoxUser.name);
});
