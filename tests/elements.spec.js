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

test('Should show a confirm message after dialog confirmation', async({ page, alertsPage }) => {
  const confirmMessage = 'You selected Ok';

  await alertsPage.open();
  await alertsPage.triggerDialog(true);
  await alertsPage.checkConfirmMessage(confirmMessage);
})

test('Should verify the text inside the dialog', async({ page, alertsPage }) => {
  const dialogMessage = 'Do you confirm action?';

  await alertsPage.open();
  await alertsPage.triggerDialog(true, dialogMessage);
})

test('Should show a decline message after dialog cancel', async({ page, alertsPage }) => {
  const declineMessage = 'You selected Cancel';

  await alertsPage.open();
  await alertsPage.triggerDialog(false);
  await alertsPage.checkConfirmMessage(declineMessage);
})

test('Should check a frame heading', async({ page, framesPage }) => {
  const expectedFrameHeading = 'This is a sample page';

  await framesPage.open();
  await framesPage.checkBigFrameHeading(expectedFrameHeading);
})

test('Should check a nested frame heading', async({ page, framesPage }) => {
  const expectedHeading = 'Child Iframe';

  await framesPage.open('/nestedframes');
  await framesPage.checkChildFrameHeading(expectedHeading);
})
