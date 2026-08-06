class TextBoxPage {
    constructor(page) {
        this.page = page;
        this.fullNameInput = page.getByPlaceholder('Full Name');
        this.emailInput = page.getByPlaceholder('name@example.com');
        this.currentAddressInput = page.getByPlaceholder('Current Address');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.outputBlock = page.locator('#output');
    }

    async open() {
        await this.page.goto('/text-box');
    }

    async clickSubmit() {
        await this.submitButton.click();
    }

    async fillForm(userData) {
        await this.fullNameInput.fill(`${userData.firstName} ${userData.lastName}`);
        await this.emailInput.fill(userData.email);
        await this.currentAddressInput.fill(userData.address);

        await this.clickSubmit();
    }

    async getOutputText() {
        return await this.outputBlock.innerText();
    }

    async isOutputVisible() {
        return await this.outputBlock.isVisible();
    }
}

module.exports = { TextBoxPage };
