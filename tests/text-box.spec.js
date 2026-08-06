const { test, expect } = require('../fixtures');
const { textBoxUser, formInvalidEmail } = require('./test-data');

test.describe('@ui Text box tests', async () => {
    test.beforeEach(async ({ textBoxPage }) => {
        await textBoxPage.open();
    });

    test('@regression Should show a successful message after form submitting', async ({
        textBoxPage,
    }) => {
        await textBoxPage.fillForm(textBoxUser);

        expect(await textBoxPage.getOutputText()).toContain(`${textBoxUser.firstName} ${textBoxUser.lastName}`);
    });

    test('@smoke Should not submit form with invalid email', async ({ textBoxPage }) => {
        await textBoxPage.fillForm(formInvalidEmail);

        expect(await textBoxPage.isOutputVisible()).toBe(false);
    });

    test('@smoke Should not submit empty form', async ({ textBoxPage }) => {
        await textBoxPage.clickSubmit();

        expect(await textBoxPage.isOutputVisible()).toBe(false);
    });
});
