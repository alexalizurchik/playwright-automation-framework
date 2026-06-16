const { expect } = require('@playwright/test');

class WindowsPage {
    constructor(page) {
        this.page = page;
        this._newTabButton = page.locator('#tabButton');
        this._newWindowButton = page.locator('#windowButton');
        this._newWindowMessageButton = page.locator('#messageWindowButton');
        this.sampleHeadingSelector = '#sampleHeading';
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

    async _checkPopupUrl(buttonLocator, expectedUrl) {
        const newPage = await this._openPopup(buttonLocator);
        
        try {
            await expect(newPage).toHaveURL(expectedUrl);
        } finally {
            await newPage.close();
        }
    }

    async _checkPopupText(buttonLocator, expectedText, { isMessageWindow = false } = {}) {
        const newPage = await this._openPopup(buttonLocator);

        try {
            const selector = isMessageWindow ? this.messageBodySelector : this.sampleHeadingSelector;
            const element = newPage.locator(selector);

            if (!isMessageWindow) {
                await element.waitFor({ state: 'visible' });
            }
            
            await expect(element).toHaveText(expectedText);
        } finally {
            await newPage.close();
        }
    }

    async checkNewTabUrl(expectedUrl) {
        await this._checkPopupUrl(this._newTabButton, expectedUrl);
    }

    async checkNewTabHeading(expectedHeading) {
        await this._checkPopupText(this._newTabButton, expectedHeading);
    }

    async checkNewWindowUrl(expectedUrl) {
        await this._checkPopupUrl(this._newWindowButton, expectedUrl);
    }

    async checkNewWindowHeading(expectedHeading) {
        await this._checkPopupText(this._newWindowButton, expectedHeading);
    }

    async checkNewWindowMessageText(expectedText) {
        await this._checkPopupText(this._newWindowMessageButton, expectedText, { isMessageWindow: true });
    }
}

module.exports = { WindowsPage };
