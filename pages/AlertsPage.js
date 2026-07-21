const { expect } = require('@playwright/test');

class AlertsPage {
    constructor(page) {
        this.page = page;
        this.alertButton = page.locator('#alertButton');
        this.confirmButton = page.locator('#confirmButton');
        this.confirmMessage = page.locator('#confirmResult');
    }

    async open() {
        await this.page.goto('/alerts');
    }

    async triggerDialog(shouldAccept = true, expectedText) {
        this.page.once('dialog', dialog => {
            if (expectedText) {
                expect(dialog.message()).toBe(expectedText);
            }

            shouldAccept ? dialog.accept() : dialog.dismiss();
        })

        await this.confirmButton.click();
    }

    async triggerAlert() {
        this.page.once('dialog', dialog => {
            dialog.accept();
        })

        await this.alertButton.click();
    }

    async checkConfirmMessage(message) {
        await expect(this.confirmMessage).toContainText(message);
    }

    async checkConfirmMessageNotPresent() {
        await expect(this.confirmMessage).toBeHidden();
    }
}

module.exports = { AlertsPage };