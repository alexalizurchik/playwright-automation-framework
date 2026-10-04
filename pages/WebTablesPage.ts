import { Page, Locator } from '@playwright/test';
import { WebTableUser } from '../types.js';

export class WebTablesPage {
    readonly addButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly userEmailInput: Locator;
    readonly ageInput: Locator;
    readonly salaryInput: Locator;
    readonly departmentInput: Locator;
    readonly submitButton: Locator;
    readonly table: Locator;
    readonly tableRows: Locator;
    readonly modalContent: Locator;

    constructor(private readonly page: Page) {
        this.addButton = page.locator('#addNewRecordButton');
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.userEmailInput = page.locator('#userEmail');
        this.ageInput = page.locator('#age');
        this.salaryInput = page.locator('#salary');
        this.departmentInput = page.locator('#department');
        this.submitButton = page.locator('#submit');
        this.table = page.locator('table');
        this.tableRows = this.table.locator('tbody tr');
        this.modalContent = page.locator('.modal-content');
    }

    async open(): Promise<void> {
        await this.page.goto('/webtables');
    }

    async addNewRecord(userData: WebTableUser): Promise<void> {
        await this.addButton.click();
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.userEmailInput.fill(userData.email);
        await this.ageInput.fill(userData.age.toString());
        await this.salaryInput.fill(userData.salary.toString());
        await this.departmentInput.fill(userData.department);
        await this.submitButton.click();
        await this.modalContent.waitFor({ state: 'hidden' });
    }

    async editRecordByAnchor(rowAnchor: string, updatedData: Partial<WebTableUser>): Promise<void> {
        const row = this.tableRows.filter({ hasText: rowAnchor });
        const editButton = row.locator('[id^="edit-record-"]');

        await editButton.click();

        const inputFields: Record<string, Locator> = {
            firstName: this.firstNameInput,
            lastName: this.lastNameInput,
            email: this.userEmailInput,
            age: this.ageInput,
            salary: this.salaryInput,
            department: this.departmentInput,
        };

        for (const [key, value] of Object.entries(updatedData)) {
            if (inputFields[key] && value !== undefined) {
                await inputFields[key].clear();
                await inputFields[key].fill(value.toString());
            }
        }

        await this.submitButton.click();
        await this.modalContent.waitFor({ state: 'hidden' });
    }

    async deleteRecordByAnchor(rowAnchor: string): Promise<void> {
        const row = this.tableRows.filter({ hasText: rowAnchor });
        const deleteButton = row.locator('[id^="delete-record-"]');

        await deleteButton.click();
    }

    async getLastRowText(): Promise<string> {
        return await this.tableRows.last().innerText();
    }

    async getRowText(anchor: string): Promise<string> {
        return await this.tableRows.filter({ hasText: anchor }).innerText();
    }

    async getRowCount(anchor: string): Promise<number> {
        return await this.tableRows.filter({ hasText: anchor }).count();
    }

    async getDeleteButtonCount(anchor: string): Promise<number> {
        return await this.tableRows
            .filter({ hasText: anchor })
            .locator('[id^="delete-record-"]')
            .count();
    }
}
