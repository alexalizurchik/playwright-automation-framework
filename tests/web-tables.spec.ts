import { test, expect } from '../fixtures/index.js';
import { updatedWebTableUser, webTableUser } from './test-data.js';

test.describe('@ui Web tables tests', () => {
    let userData = { ...webTableUser };

    test.beforeEach(async ({ webTablesPage }) => {
        userData = { ...webTableUser };

        await webTablesPage.open();
        await webTablesPage.addNewRecord(userData);
    });

    test('@regression Should add new record to the table and check it', async ({
        webTablesPage,
    }) => {
        const rowText = await webTablesPage.getLastRowText();
        const expectedValues = [
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.age.toString(),
            userData.salary.toString(),
            userData.department,
        ];

        for (const value of expectedValues) {
            expect(rowText).toContain(value);
        }
    });

    test('@regression Should edit an existing record by email', async ({ webTablesPage }) => {
        await webTablesPage.editRecordByAnchor(userData.email, updatedWebTableUser);

        const rowText = await webTablesPage.getRowText(userData.email);

        for (const value of Object.values(updatedWebTableUser).map(String)) {
            expect(rowText).toContain(value);
        }
    });

    test('@regression Should delete record and verify it is removed', async ({ webTablesPage }) => {
        await webTablesPage.deleteRecordByAnchor(userData.email);

        await expect.poll(() => webTablesPage.getRowCount(userData.email)).toBe(0);
        await expect.poll(() => webTablesPage.getDeleteButtonCount(userData.email)).toBe(0);
    });
});
