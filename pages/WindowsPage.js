class WindowsPage {
    constructor(page) {
        this.page = page;
        this._newTabButton = page.locator('#tabButton');
        this._newWindowButton = page.locator('#windowButton');
        this._newWindowMessageButton = page.locator('#messageWindowButton');
        this.messageBodySelector = 'body';
    }

    async open() {
        await this.page.goto('/browser-windows');
    }

    async _openPopup(buttonLocator) {
        const pagePromise = this.page.context().waitForEvent('page');

        await buttonLocator.click();

        const newPage = await pagePromise;

        await newPage.waitForLoadState();

        return newPage;
    }

    async openNewTab() {
        return await this._openPopup(this._newTabButton);
    }

    async openNewWindow() {
        return await this._openPopup(this._newWindowButton);
    }

    async openNewWindowMessage() {
        return await this._openPopup(this._newWindowMessageButton);
    }

    async getPopupHeading(newPage) {
        return await newPage.locator('#sampleHeading').innerText();
    }

    async getPopupBodyText(newPage) {
        return await newPage.locator('body').innerText();
    }
}

module.exports = { WindowsPage };
