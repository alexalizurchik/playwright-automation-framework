import { Page, Locator } from '@playwright/test';

export class AlertsPage {
    readonly alertButton: Locator;
    readonly confirmButton: Locator;
    readonly confirmMessage: Locator;

    constructor(private readonly page: Page) {
        this.alertButton = page.locator('#alertButton');
        this.confirmButton = page.locator('#confirmButton');
        this.confirmMessage = page.locator('#confirmResult');
    }

    async open(): Promise<void> {
        await this.page.goto('/alerts', {
            waitUntil: 'domcontentloaded',
        });
    }

    async handleConfirmDialog({ accept = true }: { accept?: boolean } = {}): Promise<string> {
        const messagePromise = new Promise<string>((resolve) => {
            this.page.once('dialog', async (dialog) => {
                resolve(dialog.message());
                accept ? await dialog.accept() : await dialog.dismiss();
            });
        });

        await this.confirmButton.click();

        return messagePromise;
    }

    async handleAlert(): Promise<void> {
        this.page.once('dialog', (dialog) => {
            dialog.accept();
        });

        await this.alertButton.click();
    }

    async getConfirmMessage(): Promise<string> {
        return await this.confirmMessage.innerText();
    }

    async isConfirmMessageVisible(): Promise<boolean> {
        return await this.confirmMessage.isVisible();
    }
}
