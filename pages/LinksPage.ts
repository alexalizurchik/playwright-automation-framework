import { Page, Locator } from '@playwright/test';

export class LinksPage {
    private readonly _simpleLink: Locator;
    private readonly _createdLink: Locator;
    private readonly _noContentLink: Locator;
    private readonly _movedLink: Locator;
    private readonly _badRequestLink: Locator;
    private readonly _unauthorizedLink: Locator;
    private readonly _forbiddenLink: Locator;
    private readonly _notFoundLink: Locator;
    private readonly _linkResponse: Locator;

    constructor(private readonly page: Page) {
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

    async open(): Promise<void> {
        await this.page.goto('/links');
    }

    async clickSimpleLink(): Promise<Page> {
        const pagePromise = this.page.context().waitForEvent('page');

        await this._simpleLink.click();

        const newPage = await pagePromise;
        await newPage.waitForLoadState();

        return newPage;
    }

    async clickBadRequestLink(): Promise<void> {
        await this._clickApiLink(this._badRequestLink);
    }

    async clickCreatedLink(): Promise<void> {
        await this._clickApiLink(this._createdLink);
    }

    async clickNoContentLink(): Promise<void> {
        await this._clickApiLink(this._noContentLink);
    }

    async clickMovedLink(): Promise<void> {
        await this._clickApiLink(this._movedLink);
    }

    async clickUnauthorizedLink(): Promise<void> {
        await this._clickApiLink(this._unauthorizedLink);
    }

    async clickForbiddenLink(): Promise<void> {
        await this._clickApiLink(this._forbiddenLink);
    }

    async clickNotFoundLink(): Promise<void> {
        await this._clickApiLink(this._notFoundLink);
    }

    async _clickApiLink(linkLocator: Locator): Promise<void> {
        await linkLocator.click();
        await this._linkResponse.waitFor({ state: 'visible' });
    }

    async getLinkResponseText(): Promise<string> {
        return await this._linkResponse.innerText();
    }
}
