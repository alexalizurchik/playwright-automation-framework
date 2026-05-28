const { expect } = require('@playwright/test');

class WindowsPage {
    constructor(page) {
        this.page = page;
        this.newTabButton = page.locator('#tabButton');
        this.newWindowButton = page.locator('#windowButton');
        this.newWindowMessageButton = page.locator('#messageWindowButton');
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

    async checkPopupUrl(buttonLocator, expectedUrl) {
        const newPage = await this._openPopup(buttonLocator);
        
        try {
            await expect(newPage).toHaveURL(expectedUrl);
        } finally {
            await newPage.close();
        }
    }

    async checkPopupText(buttonLocator, isMessageWindow = false, expectedText) {
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
}

module.exports = { WindowsPage };