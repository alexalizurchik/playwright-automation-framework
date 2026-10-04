import { test, expect } from '../fixtures/index.js';
import { invalidUser, nonExistentIsbn, fakeUserId, emptyToken } from './test-data.js';

test.describe('@api Book Store API tests', () => {
    test('@smoke Should authorise user successfully', async ({ authorizedUser }) => {
        const response = await authorizedUser.generateToken();

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.status).toBe('Success');
        expect(body.token).toBeDefined();
    });

    test('@smoke Get all books', async ({ bookStoreApi }) => {
        const response = await bookStoreApi.getAllBooks();

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(Array.isArray(body.books)).toBeTruthy();
        expect(body.books.length).toBeGreaterThan(0);
    });

    test('@regression Add book to collection', async ({ authorizedUser, firstBookIsbn }) => {
        const response = await authorizedUser.addBookToCollection(firstBookIsbn);

        expect(response.status()).toBe(201);

        const body = await response.json();

        expect(body.books[0].isbn).toBe(firstBookIsbn);
    });

    test('@regression Delete book from collection', async ({ authorizedUser, firstBookIsbn }) => {
        await authorizedUser.addBookToCollection(firstBookIsbn);

        const response = await authorizedUser.deleteBookFromCollection(firstBookIsbn);

        expect(response.status()).toBe(204);
    });

    test('@smoke Should not authorise with wrong password', async ({ bookStoreApi }) => {
        const response = await bookStoreApi.generateToken(invalidUser);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.status).toBe('Failed');
        expect(body.token).toBeNull();
    });

    test('@regression Should not add book without authorisation', async ({
        bookStoreApi,
        firstBookIsbn,
    }) => {
        const response = await bookStoreApi.addBookToCollection(
            fakeUserId,
            firstBookIsbn,
            emptyToken,
        );

        expect(response.status()).toBe(401);
    });

    test('@regression Should return 400 for non-existent ISBN', async ({ bookStoreApi }) => {
        const response = await bookStoreApi.getBookByIsbn(nonExistentIsbn);

        expect(response.status()).toBe(400);
    });
});
