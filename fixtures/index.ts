import { test as base, expect, APIResponse } from '@playwright/test';
import { TextBoxPage } from '../pages/TextBoxPage.js';
import { AlertsPage } from '../pages/AlertsPage.js';
import { FramesPage } from '../pages/FramesPage.js';
import { SliderPage } from '../pages/SliderPage.js';
import { ProgressBarPage } from '../pages/ProgressBarPage.js';
import { DragAndDropPage } from '../pages/DragAndDropPage.js';
import { DynamicPage } from '../pages/DynamicPage.js';
import { WindowsPage } from '../pages/WindowsPage.js';
import { FormsPage } from '../pages/FormsPage.js';
import { WebTablesPage } from '../pages/WebTablesPage.js';
import { BookStoreApi } from '../pages/BookStoreApi.js';
import { LinksPage } from '../pages/LinksPage.js';
import { UserCredentials } from '../types.js';

type MyFixtures = {
    textBoxPage: TextBoxPage;
    bookStoreApi: BookStoreApi;
    alertsPage: AlertsPage;
    framesPage: FramesPage;
    sliderPage: SliderPage;
    progressBarPage: ProgressBarPage;
    dragAndDropPage: DragAndDropPage;
    dynamicPage: DynamicPage;
    windowsPage: WindowsPage;
    formsPage: FormsPage;
    webTablesPage: WebTablesPage;
    linksPage: LinksPage;
    authorizedUser: AuthorizedUser;
    firstBookIsbn: string;
};

interface AuthorizedUser {
    userId: string;
    token: string;
    credentials: UserCredentials;
    addBookToCollection: (isbn: string) => Promise<APIResponse>;
    deleteBookFromCollection: (isbn: string) => Promise<APIResponse>;
    generateToken: () => Promise<APIResponse>;
}

const createUniqueUserCredentials = (): UserCredentials => ({
    userName: `User_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    password: process.env.TEST_PASSWORD,
});

const test = base.extend<MyFixtures>({
    textBoxPage: async ({ page }, use) => {
        await use(new TextBoxPage(page));
    },
    alertsPage: async ({ page }, use) => {
        await use(new AlertsPage(page));
    },
    framesPage: async ({ page }, use) => {
        await use(new FramesPage(page));
    },
    sliderPage: async ({ page }, use) => {
        await use(new SliderPage(page));
    },
    progressBarPage: async ({ page }, use) => {
        await use(new ProgressBarPage(page));
    },
    dragAndDropPage: async ({ page }, use) => {
        await use(new DragAndDropPage(page));
    },
    dynamicPage: async ({ page }, use) => {
        await use(new DynamicPage(page));
    },
    windowsPage: async ({ page }, use) => {
        await use(new WindowsPage(page));
    },
    formsPage: async ({ page }, use) => {
        await use(new FormsPage(page));
    },
    webTablesPage: async ({ page }, use) => {
        await use(new WebTablesPage(page));
    },
    linksPage: async ({ page }, use) => {
        await use(new LinksPage(page));
    },
    bookStoreApi: async ({ request }, use) => {
        await use(new BookStoreApi(request));
    },
    authorizedUser: async ({ bookStoreApi }, use) => {
        const credentials = createUniqueUserCredentials();

        expect(
            credentials.password,
            'TEST_PASSWORD must be set for Book Store API tests',
        ).toBeTruthy();

        const createResponse = await bookStoreApi.createUser(credentials);
        expect(createResponse.status()).toBe(201);

        const userJson = (await createResponse.json()) as { userID: string };
        const userId = userJson.userID;

        const tokenResponse = await bookStoreApi.generateToken(credentials);
        const tokenJson = (await tokenResponse.json()) as { token: string };
        let token = tokenJson.token;

        expect(tokenResponse.status()).toBe(200);
        expect(token).toBeTruthy();

        const user: AuthorizedUser = {
            userId,
            get token() {
                return token;
            },
            credentials,
            addBookToCollection: (isbn) => bookStoreApi.addBookToCollection(userId, isbn, token),
            deleteBookFromCollection: (isbn) =>
                bookStoreApi.deleteBookFromCollection(userId, isbn, token),
            generateToken: async () => {
                const response = await bookStoreApi.generateToken(credentials);

                if (response.status() === 200) {
                    const body = (await response.json()) as { token: string };
                    token = body.token;
                }

                return response;
            },
        };

        await use(user);

        const deleteUserResponse = await bookStoreApi.deleteUser(userId, token);
        expect(deleteUserResponse.status()).toBe(204);
    },
    firstBookIsbn: async ({ bookStoreApi }, use) => {
        const response = await bookStoreApi.getAllBooks();
        const json = await response.json();

        expect(response.status()).toBe(200);
        expect(json.books.length).toBeGreaterThan(0);

        await use(json.books[0].isbn);
    }
});

export { test, expect };
