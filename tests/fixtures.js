const base = require('@playwright/test');
const { TextBoxPage } = require('../pages/TextBoxPage');
const { AlertsPage } = require('../pages/AlertsPage');
const { FramesPage } = require('../pages/FramesPage');
const { SliderPage } = require('../pages/SliderPage');
const { ProgressBarPage } = require('../pages/ProgressBarPage');
const { DragAndDropPage } = require('../pages/DragAndDropPage');
const { DynamicPage } = require('../pages/DynamicPage');
const { WindowsPage } = require('../pages/WindowsPage');
const { FormsPage } = require('../pages/FormsPage');
const { WebTablesPage } = require('../pages/WebTablesPage');
const { BookStoreApi } = require('../pages/BookStoreApi');
const { LinksPage } = require('../pages/LinksPage');

const pageFixtures = {
  textBoxPage: TextBoxPage,
  alertsPage: AlertsPage,
  framesPage: FramesPage,
  sliderPage: SliderPage,
  progressBarPage: ProgressBarPage,
  dragAndDropPage: DragAndDropPage,
  dynamicPage: DynamicPage,
  windowsPage: WindowsPage,
  formsPage: FormsPage,
  webTablesPage: WebTablesPage,
  linksPage: LinksPage
};

const createFixture = (PageObject) => async ({ page }, use) => {
  await use(new PageObject(page));
};

const createUniqueUserCredentials = () => ({
  userName: `User_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
  password: process.env.TEST_PASSWORD
});

const myTest = base.test.extend({
  ...Object.fromEntries(
    Object.entries(pageFixtures).map(([fixtureName, PageObject]) => [
      fixtureName,
      createFixture(PageObject)
    ])
  ),
  bookStoreApi: async({ request }, use) => {
    await use(new BookStoreApi(request));
  },
  authorizedUser: async ({ bookStoreApi }, use) => {
    const credentials = createUniqueUserCredentials();

    base.expect(credentials.password, 'TEST_PASSWORD must be set for Book Store API tests').toBeTruthy();

    const createResponse = await bookStoreApi.createUser(credentials);
    base.expect(createResponse.status()).toBe(201);

    const userJson = await createResponse.json();
    const userId = userJson.userID;

    const tokenResponse = await bookStoreApi.generateToken(credentials);
    const tokenJson = await tokenResponse.json();
    let token = tokenJson.token;

    base.expect(tokenResponse.status()).toBe(200);
    base.expect(token).toBeTruthy();

    const user = {
      userId,
      get token() {
        return token;
      },
      credentials,
      addBookToCollection: (isbn) => bookStoreApi.addBookToCollection(userId, isbn, token),
      deleteBookFromCollection: (isbn) => bookStoreApi.deleteBookFromCollection(userId, isbn, token),
      generateToken: async () => {
        const response = await bookStoreApi.generateToken(credentials);

        if (response.status() === 200) {
          const body = await response.json();
          token = body.token;
        }

        return response;
      }
    };

    await use(user);

    const deleteUserResponse = await bookStoreApi.deleteUser(userId, token);
    base.expect(deleteUserResponse.status()).toBe(204);
  },
  firstBookIsbn: async ({ bookStoreApi }, use) => {
    const response = await bookStoreApi.getAllBooks();
    const json = await response.json();

    base.expect(response.status()).toBe(200);
    base.expect(json.books.length).toBeGreaterThan(0);

    await use(json.books[0].isbn);
  }
});

module.exports = { 
  test: myTest, 
  expect: base.expect
};
