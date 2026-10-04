import { test, expect } from '../fixtures/index.js';
import { practiceFormUser, formInvalidEmail, formInvalidMobile } from './test-data.js';

test.describe('@ui Practice Form tests', async () => {
    test.beforeEach(async ({ formsPage }) => {
        await formsPage.open();
    });

    test('@smoke Should fill the form and submit it', async ({ formsPage }) => {
        await formsPage.fillForm(practiceFormUser);

        await expect.poll(() => formsPage.isModalVisible()).toBe(true);

        const modalText = await formsPage.getModalText();
        const expectedValues = [
            `${practiceFormUser.firstName} ${practiceFormUser.lastName}`,
            practiceFormUser.email,
            practiceFormUser.gender,
            practiceFormUser.mobileNumber,
            `${practiceFormUser.dateOfBirth.day} ${practiceFormUser.dateOfBirth.month},${practiceFormUser.dateOfBirth.year}`,
            practiceFormUser.subjects,
            practiceFormUser.hobbies.join(', '),
            practiceFormUser.picture,
            `${practiceFormUser.state} ${practiceFormUser.city}`,
        ];

        for (const value of expectedValues) {
            expect(modalText).toContain(value);
        }
    });

    test('@smoke Should not submit form with invalid email', async ({ formsPage }) => {
        await formsPage.fillBaseInfo(formInvalidEmail);
        await formsPage.clickSubmit();

        expect(await formsPage.isModalVisible()).toBe(false);
    });

    test('@regression Should not submit form with 9-digit mobile number', async ({ formsPage }) => {
        await formsPage.fillBaseInfo(formInvalidMobile);
        await formsPage.clickSubmit();

        expect(await formsPage.isModalVisible()).toBe(false);
    });

    test('@smoke Should not submit empty form', async ({ formsPage }) => {
        await formsPage.clickSubmit();

        expect(await formsPage.isModalVisible()).toBe(false);
    });
});
