import { Page, Locator } from '@playwright/test';

export class WindowsPage {
    private readonly _newTabButton: Locator;
    private readonly _newWindowButton: Locator;
    private readonly _newWindowMessageButton: Locator;
    readonly messageBodySelector: string;

    constructor(private readonly page: Page) {
        this._newTabButton = page.locator('#tabButton');
        this._newWindowButton = page.locator('#windowButton');
        this._newWindowMessageButton = page.locator('#messageWindowButton');
        this.messageBodySelector = 'body';
    }

    async open(): Promise<void> {
        await this.page.goto('/browser-windows');
    }

    async _openPopup(buttonLocator: Locator) {
        const pagePromise = this.page.context().waitForEvent('page');

        await buttonLocator.click();

        const newPage = await pagePromise;

        await newPage.waitForLoadState();

        return newPage;
    }

    async openNewTab(): Promise<Page> {
        return await this._openPopup(this._newTabButton);
    }

    async openNewWindow(): Promise<Page> {
        return await this._openPopup(this._newWindowButton);
    }

    async openNewWindowMessage(): Promise<Page> {
        return await this._openPopup(this._newWindowMessageButton);
    }

    async getPopupHeading(newPage: Page): Promise<string> {
        return await newPage.locator('#sampleHeading').innerText();
    }

    async getPopupBodyText(newPage: Page): Promise<string> {
        return await newPage.locator('body').innerText();
    }
}
