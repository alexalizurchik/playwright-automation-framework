const { test, expect } = require('./fixtures');
const { updatedWebTableUser, webTableUser } = require('./test-data');

test.describe('@ui Web tables tests', () => {
  let userData;

  test.beforeEach(async({ webTablesPage }) => {
    userData = { ...webTableUser };

    await webTablesPage.open();
    await webTablesPage.addNewRecord(userData);
  });

  test('@regression Should add new record to the table and check it', async({ webTablesPage }) => {
    await webTablesPage.checkNewAddedRecord(userData);
  });

  test('@regression Should edit an existing record by email', async({ webTablesPage }) => {
    await webTablesPage.editRecordByAnchor(userData.email, updatedWebTableUser);
    await webTablesPage.checkEditedRecord(userData.email, updatedWebTableUser);
  });

  test('@regression Should delete record and check it', async({ webTablesPage }) => {
    await webTablesPage.deleteRecordByAnchor(userData.email);
    await webTablesPage.checkDeletedRecord(userData.email);
  });

  test('@regression Should not find deleted record after deletion', async({ webTablesPage }) => {
    await webTablesPage.deleteRecordByAnchor(userData.email);
    await webTablesPage.checkDeletedRecord(userData.email);

    await expect(webTablesPage.tableRows.filter({ hasText: userData.email })).toHaveCount(0);
  });

  test('@regression Should not delete already deleted record', async({ webTablesPage }) => {
    await webTablesPage.deleteRecordByAnchor(userData.email);
    await webTablesPage.checkDeletedRecord(userData.email);

    const rowCountBefore = await webTablesPage.tableRows.count();
    const deleteButton = webTablesPage.tableRows.filter({ hasText: userData.email }).locator('[id^="delete-record-"]');
    await expect(deleteButton).toHaveCount(0);
  });
});
