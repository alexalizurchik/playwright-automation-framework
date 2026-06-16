// @ts-check
const { test, expect } = require('./fixtures');

test.describe('Book Store API tests', () => {
  test('Should authorise user successfully', async({ authorizedUser }) => {
    const response = await authorizedUser.generateToken();

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.status).toBe('Success');
    expect(body.token).toBeDefined();
  });

  test('Get all books', async({ bookStoreApi }) => {
    const response = await bookStoreApi.getAllBooks();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body.books)).toBeTruthy();
    expect(body.books.length).toBeGreaterThan(0);
  });

  test('Add book to collection', async({ authorizedUser, firstBookIsbn }) => {
    const response = await authorizedUser.addBookToCollection(firstBookIsbn);

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.books[0].isbn).toBe(firstBookIsbn);
  });

  test('Delete book from collection', async({ authorizedUser, firstBookIsbn }) => {
    await authorizedUser.addBookToCollection(firstBookIsbn);

    const response = await authorizedUser.deleteBookFromCollection(firstBookIsbn);

    expect(response.status()).toBe(204);
  });
});
