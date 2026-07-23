const { test } = require('../fixtures');

test.describe('@ui Links page tests', () => {
    test.beforeEach(async ({ linksPage }) => {
        await linksPage.open();
    });

    test('@smoke Should navigate to the Home page when clicking the Home link', async ({
        linksPage,
    }) => {
        const newPage = await linksPage.clickSimpleLink();

        try {
            await linksPage.checkHomePageUrl(newPage);
        } finally {
            await newPage.close();
        }
    });

    test('@regression Should display Bad Request status when clicking the Bad Request link', async ({
        linksPage,
    }) => {
        await linksPage.clickBadRequestLink();
        await linksPage.checkLinkResponse('400', 'Bad Request');
    });

    test('@regression Should display Created status when clicking the Created link', async ({
        linksPage,
    }) => {
        await linksPage.clickCreatedLink();
        await linksPage.checkLinkResponse('201', 'Created');
    });

    test('@regression Should display No Content status when clicking the No Content link', async ({
        linksPage,
    }) => {
        await linksPage.clickNoContentLink();
        await linksPage.checkLinkResponse('204', 'No Content');
    });

    test('@regression Should display Moved status when clicking the Moved link', async ({
        linksPage,
    }) => {
        await linksPage.clickMovedLink();
        await linksPage.checkLinkResponse('301', 'Moved');
    });

    test('@regression Should display Unauthorized status when clicking the Unauthorized link', async ({
        linksPage,
    }) => {
        await linksPage.clickUnauthorizedLink();
        await linksPage.checkLinkResponse('401', 'Unauthorized');
    });

    test('@regression Should display Forbidden status when clicking the Forbidden link', async ({
        linksPage,
    }) => {
        await linksPage.clickForbiddenLink();
        await linksPage.checkLinkResponse('403', 'Forbidden');
    });

    test('@regression Should display Not Found status when clicking the Not Found link', async ({
        linksPage,
    }) => {
        await linksPage.clickNotFoundLink();
        await linksPage.checkLinkResponse('404', 'Not Found');
    });
});
