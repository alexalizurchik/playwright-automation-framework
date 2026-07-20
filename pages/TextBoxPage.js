const { expect } = require('@playwright/test');

class TextBoxPage {
    constructor(page) {
        this.page = page;
        this.fullNameInput = page.getByPlaceholder('Full Name');
        this.emailInput = page.getByPlaceholder('name@example.com');
        this.currentAddressInput = page.getByPlaceholder('Current Address');
        this.submitButton = page.getByRole('button', {name: 'Submit'});
        this.outputBlock = page.locator('#output');
    }

    async open() {
        await this.page.goto('/text-box');
    }

    async fillForm(userData) {
        await this.fullNameInput.fill(`${userData.firstName} ${userData.lastName}`);
        await this.emailInput.fill(userData.email);
        await this.currentAddressInput.fill(userData.address);
            
        await this.submitButton.click();
    }

    async checkOutputBlockText(text) {
        await expect(this.outputBlock).toBeVisible(); 
        await expect(this.outputBlock).toContainText(text);
    }

    async checkOutputBlockNotVisible() {
        await expect(this.outputBlock).toBeHidden();
    }

}

module.exports = { TextBoxPage };