// @ts-check
const { test } = require('./fixtures');

test.describe('@ui Alerts and Dialogs Tests', async() => {
  test('@smoke Should show a confirm message after dialog confirmation', async({ alertsPage }) => {
    const confirmMessage = 'You selected Ok';

    await alertsPage.open();
    await alertsPage.triggerDialog(true);
    await alertsPage.checkConfirmMessage(confirmMessage);
  });

  test('@regression Should verify the text inside the dialog', async({ alertsPage }) => {
    const dialogMessage = 'Do you confirm action?';

    await alertsPage.open();
    await alertsPage.triggerDialog(true, dialogMessage);
  });

  test('@regression Should show a decline message after dialog cancel', async({ alertsPage }) => {
    const declineMessage = 'You selected Cancel';

    await alertsPage.open();
    await alertsPage.triggerDialog(false);
    await alertsPage.checkConfirmMessage(declineMessage);
  });
})
