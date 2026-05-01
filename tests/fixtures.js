const base = require('@playwright/test');
const { TextBoxPage } = require('../pages/TextBoxPage');
const { AlertsPage } = require('../pages/AlertsPage');
const { FramesPage } = require('../pages/FramesPage');
const { SliderPage } = require('../pages/SliderPage');

const myTest = base.test.extend({
  textBoxPage: async ({ page }, use) => {
    const textBoxPage = new TextBoxPage(page);
    await use(textBoxPage);
  },
  alertsPage: async({ page }, use) => {
    const alertsPage = new AlertsPage(page);
    await use(alertsPage);
  },
  framesPage: async({ page }, use) => {
    const framesPage = new FramesPage(page);
    await use(framesPage);
  },
  sliderPage: async({ page }, use) => {
    const sliderPage = new SliderPage(page);
    await use(sliderPage);
  }
});

module.exports = { 
  test: myTest, 
  expect: base.expect
};