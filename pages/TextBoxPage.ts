import { Page, Locator } from '@playwright/test';
import { TextBoxUser } from '../types.js';

export class TextBoxPage {
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly currentAddressInput: Locator;
    readonly submitButton: Locator;
    readonly outputBlock: Locator;

    constructor(private readonly page: Page) {
        this.fullNameInput = page.getByPlaceholder('Full Name');
        this.emailInput = page.getByPlaceholder('name@example.com');
        this.currentAddressInput = page.getByPlaceholder('Current Address');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.outputBlock = page.locator('#output');
    }

    async open(): Promise<void> {
        await this.page.goto('/text-box');
    }

    async clickSubmit(): Promise<void> {
        await this.submitButton.click();
    }

    async fillForm(userData: TextBoxUser): Promise<void> {
        await this.fullNameInput.fill(`${userData.firstName} ${userData.lastName}`);
        await this.emailInput.fill(userData.email);
        await this.currentAddressInput.fill(userData.address);

        await this.clickSubmit();
    }

    async getOutputText(): Promise<string> {
        return this.outputBlock.innerText();
    }

    async isOutputVisible(): Promise<boolean> {
        return this.outputBlock.isVisible();
    }
}
