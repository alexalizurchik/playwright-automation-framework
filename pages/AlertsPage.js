class AlertsPage {
    constructor(page) {
        this.page = page;
        this.alertButton = page.locator('#alertButton');
        this.confirmButton = page.locator('#confirmButton');
        this.confirmMessage = page.locator('#confirmResult');
    }

    async open() {
        await this.page.goto('/alerts', {
            waitUntil: 'domcontentloaded',
        });
        
    }

    async handleConfirmDialog({ accept = true } = {}) {
        const messagePromise = new Promise((resolve) => {
            this.page.once('dialog', async (dialog) => {
                resolve(dialog.message());
                accept ? await dialog.accept() : await dialog.dismiss();
            });
        });

        await this.confirmButton.click();

        return messagePromise;
    }

    async handleAlert() {
        this.page.once('dialog', (dialog) => {
            dialog.accept();
       })

       await this.alertButton.click();
    }

    async getConfirmMessage() {
        return await this.confirmMessage.innerText();
    }

    async isConfirmMessageVisible() {
        return await this.confirmMessage.isVisible();
    }
}

module.exports = { AlertsPage };
