const { expect } = require('@playwright/test');

class WebTablesPage {
    constructor(page) {
        this.page = page;
        this.addButton = page.locator('#addNewRecordButton');
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.userEmailInput = page.locator('#userEmail');
        this.ageInput = page.locator('#age');
        this.salaryInput = page.locator('#salary');
        this.departmentInput = page.locator('#department');
        this.submitButton = page.locator('#submit');
        this.table = page.locator('table')
        this.tableRows = this.table.locator('tbody tr');
        this.modalContent = page.locator('.modal-content');
    }

    async open() {
        await this.page.goto('/webtables');
    }

    async addNewRecord(userData) {
        await this.addButton.click();
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.userEmailInput.fill(userData.email);
        await this.ageInput.fill(userData.age.toString());
        await this.salaryInput.fill(userData.salary.toString());
        await this.departmentInput.fill(userData.department);
        await this.submitButton.click();
        await expect(this.modalContent).not.toBeVisible();
    }

    async checkNewAddedRecord(userData) {
        const expectedValues = [
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.age.toString(),
            userData.salary.toString(),
            userData.department
        ];
        const lastTableRow = this.tableRows.last();

        for(const value of expectedValues) {
            await expect(lastTableRow).toContainText(value);
        }
    }

    async editRecordByAnchor(rowAnchor, updatedData) {
        const row = this.tableRows.filter({ hasText: rowAnchor });
        const editButton = row.locator('[id^="edit-record-"]');

        await editButton.click();

        const inputFields = {
            firstName: this.firstNameInput,
            lastName: this.lastNameInput,
            email: this.userEmailInput,
            age: this.ageInput,
            salary: this.salaryInput,
            department: this.departmentInput
        }

        for(const [key, value] of Object.entries(updatedData)) {
            if(inputFields[key] && value !== undefined) {
                await inputFields[key].clear();
                await inputFields[key].fill(value.toString());
            }
        }

        await this.submitButton.click();
        await expect(this.modalContent).not.toBeVisible();
    }

    async checkEditedRecord(rowAnchor, updatedData) {
        const editedRow = this.tableRows.filter({ hasText: rowAnchor });

        await expect(editedRow).toBeVisible();

        const expectedValues = Object.values(updatedData)
            .filter(value => value !== undefined && value !== null)
            .map(value => value.toString());

        for(const value of expectedValues) {
            await expect(editedRow).toContainText(value);
        }
    }

    async deleteRecordByAnchor(rowAnchor) {
        const row = this.tableRows.filter({ hasText: rowAnchor });
        const deleteButton = row.locator('[id^="delete-record-"]');

        await deleteButton.click();
    }

    async checkDeletedRecord(rowAnchor) {
        await expect(this.table).not.toContainText(rowAnchor);
    }
}

module.exports = { WebTablesPage };