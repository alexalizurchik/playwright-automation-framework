// @ts-check
const { test } = require('./fixtures');
const { updatedWebTableUser, webTableUser } = require('./test-data');

test.describe('Web tables tests', () => {
  let userData;

  test.beforeEach(async({ webTablesPage }) => {
    userData = { ...webTableUser };

    await webTablesPage.open();
    await webTablesPage.addNewRecord(userData);
  });

  test('Should add new record to the table and check it', async({ webTablesPage }) => {
    await webTablesPage.checkNewAddedRecord(userData);
  });

  test('Should edit an existing record by email', async({ webTablesPage }) => {
    await webTablesPage.editRecordByAnchor(userData.email, updatedWebTableUser);
    await webTablesPage.checkEditedRecord(userData.email, updatedWebTableUser);
  });

  test('Should delete record and check it', async({ webTablesPage }) => {
    await webTablesPage.deleteRecordByAnchor(userData.email);
    await webTablesPage.checkDeletedRecord(userData.email);
  });
});
