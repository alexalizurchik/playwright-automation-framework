const { test } = require('../fixtures');
const { textBoxUser, formInvalidEmail } = require('./test-data');

test.describe('@ui Text box tests', async () => {
    test('@regression Should show a successful message after form submitting', async ({
        textBoxPage,
    }) => {
        await textBoxPage.open();
        await textBoxPage.fillForm(textBoxUser);

        await textBoxPage.checkOutputBlockText(`${textBoxUser.firstName} ${textBoxUser.lastName}`);
    });

    test('@smoke Should not submit form with invalid email', async ({ textBoxPage }) => {
        await textBoxPage.open();
        await textBoxPage.fillForm(formInvalidEmail);

        await textBoxPage.checkOutputBlockNotVisible();
    });

    test('@smoke Should not submit empty form', async ({ textBoxPage }) => {
        await textBoxPage.open();
        await textBoxPage.clickSubmit();

        await textBoxPage.checkOutputBlockNotVisible();
    });
});
