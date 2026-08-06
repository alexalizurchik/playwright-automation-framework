const { test, expect } = require('../fixtures');

test.describe('@ui Alerts and Dialogs Tests', () => {
     test.beforeEach(async ({ alertsPage }) => {
        await alertsPage.open();
    });

    test('@smoke Should show a confirm message after dialog confirmation', async ({
        alertsPage,
    }) => {
        const confirmMessage = 'You selected Ok';

        await alertsPage.handleConfirmDialog({ accept: true });
        expect(await alertsPage.getConfirmMessage()).toBe(confirmMessage);
    });

    test('@regression Should verify the text inside the dialog', async ({ alertsPage }) => {
        const dialogMessage = 'Do you confirm action?';
        const message = await alertsPage.handleConfirmDialog({ accept: true });
        
        expect(message).toBe(dialogMessage);
    });

    test('@regression Should show a decline message after dialog cancel', async ({
        alertsPage,
    }) => {
        const declineMessage = 'You selected Cancel';

        await alertsPage.handleConfirmDialog({ accept: false });
        expect(await alertsPage.getConfirmMessage()).toBe(declineMessage);
    });

    test('@smoke Should handle simple alert (not confirm dialog)', async ({ alertsPage }) => {
        await alertsPage.handleAlert();

        expect(await alertsPage.isConfirmMessageVisible()).toBe(false);
    });
});
