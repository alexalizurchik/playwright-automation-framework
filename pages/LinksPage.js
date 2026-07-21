const { expect } = require('@playwright/test');

class LinksPage {
    constructor(page) {
        this.page = page;
        this._simpleLink = page.locator('#simpleLink');
        this._createdLink = page.locator('#created');
        this._noContentLink = page.locator('#no-content');
        this._movedLink = page.locator('#moved');
        this._badRequestLink = page.locator('#bad-request');
        this._unauthorizedLink = page.locator('#unauthorized');
        this._forbiddenLink = page.locator('#forbidden');
        this._notFoundLink = page.locator('#invalid-url');
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
        await this._clickApiLink(this._badRequestLink);
    }

    async clickCreatedLink() {
        await this._clickApiLink(this._createdLink);
    }

    async clickNoContentLink() {
        await this._clickApiLink(this._noContentLink);
    }

    async clickMovedLink() {
        await this._clickApiLink(this._movedLink);
    }

    async clickUnauthorizedLink() {
        await this._clickApiLink(this._unauthorizedLink);
    }

    async clickForbiddenLink() {
        await this._clickApiLink(this._forbiddenLink);
    }

    async clickNotFoundLink() {
        await this._clickApiLink(this._notFoundLink);
    }

    async _clickApiLink(linkLocator) {
        await linkLocator.click();
        await this._linkResponse.waitFor({ state: 'visible' });
    }

    async checkHomePageUrl(newPage) {
        await expect(newPage).toHaveURL('https://demoqa.com/');
    }

    async checkLinkResponse(statusCode, statusText) {
        await expect(this._linkResponse).toContainText(String(statusCode));
        await expect(this._linkResponse).toContainText(statusText);
    }
}

module.exports = { LinksPage };
