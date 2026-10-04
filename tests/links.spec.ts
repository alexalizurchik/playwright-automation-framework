import { test, expect } from '../fixtures/index.js';

test.describe('@ui Links page tests', () => {
    test.beforeEach(async ({ linksPage }) => {
        await linksPage.open();
    });

    test('@smoke Should navigate to the Home page when clicking the Home link', async ({
        linksPage,
    }) => {
        const newPage = await linksPage.clickSimpleLink();

        try {
            await expect(newPage).toHaveURL('https://demoqa.com/');
        } finally {
            await newPage.close();
        }
    });

    test('@regression Should display Bad Request status when clicking the Bad Request link', async ({
        linksPage,
    }) => {
        await linksPage.clickBadRequestLink();

        const responseText = await linksPage.getLinkResponseText();
        expect(responseText).toContain('400');
        expect(responseText).toContain('Bad Request');
    });

    test('@regression Should display Created status when clicking the Created link', async ({
        linksPage,
    }) => {
        await linksPage.clickCreatedLink();
        const responseText = await linksPage.getLinkResponseText();
        expect(responseText).toContain('201');
        expect(responseText).toContain('Created');
    });

    test('@regression Should display No Content status when clicking the No Content link', async ({
        linksPage,
    }) => {
        await linksPage.clickNoContentLink();
        const responseText = await linksPage.getLinkResponseText();
        expect(responseText).toContain('204');
        expect(responseText).toContain('No Content');
    });

    test('@regression Should display Moved status when clicking the Moved link', async ({
        linksPage,
    }) => {
        await linksPage.clickMovedLink();
        const responseText = await linksPage.getLinkResponseText();
        expect(responseText).toContain('301');
        expect(responseText).toContain('Moved');
    });

    test('@regression Should display Unauthorized status when clicking the Unauthorized link', async ({
        linksPage,
    }) => {
        await linksPage.clickUnauthorizedLink();

        const responseText = await linksPage.getLinkResponseText();
        expect(responseText).toContain('401');
        expect(responseText).toContain('Unauthorized');
    });

    test('@regression Should display Forbidden status when clicking the Forbidden link', async ({
        linksPage,
    }) => {
        await linksPage.clickForbiddenLink();

        const responseText = await linksPage.getLinkResponseText();
        expect(responseText).toContain('403');
        expect(responseText).toContain('Forbidden');
    });

    test('@regression Should display Not Found status when clicking the Not Found link', async ({
        linksPage,
    }) => {
        await linksPage.clickNotFoundLink();

        const responseText = await linksPage.getLinkResponseText();
        expect(responseText).toContain('404');
        expect(responseText).toContain('Not Found');
    });
});
