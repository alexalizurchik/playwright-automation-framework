const base = require('@playwright/test');
const { TextBoxPage } = require('../pages/TextBoxPage');
const { AlertsPage } = require('../pages/AlertsPage');

// Расширяем базовый тест
const myTest = base.test.extend({
  // Создаем фикстуру searchPage
  textBoxPage: async ({ page }, use) => {
    const textBoxPage = new TextBoxPage(page);
    // "Передаем" готовую страницу в тест
    await use(textBoxPage);
  },
  alertsPage: async({ page }, use) => {
    const alertsPage = new AlertsPage(page);
    await use(alertsPage);
  }
});

module.exports = { 
  test: myTest, 
  expect: base.expect
};