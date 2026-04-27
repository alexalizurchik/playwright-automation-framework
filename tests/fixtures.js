const base = require('@playwright/test');
const { TextBoxPage } = require('../pages/TextBoxPage');

// Расширяем базовый тест
const myTest = base.test.extend({
  // Создаем фикстуру searchPage
  textBoxPage: async ({ page }, use) => {
    const textBoxPage = new TextBoxPage(page);
    // "Передаем" готовую страницу в тест
    await use(textBoxPage);
  },
});

module.exports = { 
  test: myTest, 
  expect: base.expect
};