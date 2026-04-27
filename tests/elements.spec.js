// @ts-check
const { test, expect } = require('./fixtures');

test('Should show a successfull message after form submiting', async ({ page, textBoxPage }) => {
  const name = process.env.USER_NAME;
  const email = process.env.USER_EMAIL;
  const address = process.env.USER_ADDRESS;

  await textBoxPage.open();
  await textBoxPage.fillForm(name, email, address);

  await textBoxPage.checkOutputBlockText(name);
});