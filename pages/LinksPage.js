const { expect } = require('@playwright/test');

class LinksPage {
    constructor(page) {
        this.page = page;
        this._simpleLink = page.locator('#simpleLink');
        this._badRequestLink = page.locator('#bad-request');
        this._linkResponse = page.locator('#linkResponse');
    }

    async open() {
        await this.page.goto('/links');
    }

    async clickSimpleLink() {
        const pagePromise = this.page.context().waitForEvent('page');

        await this._simpleLink.click();

        const newPage = await pagePromise;
        await newPage.waitForLoadState();

        return newPage;
    }

    async clickBadRequestLink() {
        await this._badRequestLink.click();
        await this._linkResponse.waitFor({ state: 'visible' });
    }

    async checkHomePageUrl(newPage) {
        await expect(newPage).toHaveURL('https://demoqa.com/');
    }

    async checkBadRequestResponse() {
        await expect(this._linkResponse).toContainText('400');
        await expect(this._linkResponse).toContainText('Bad Request');
    }
}

module.exports = { LinksPage };
