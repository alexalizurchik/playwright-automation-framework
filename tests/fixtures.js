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
  },
    progressBarPage: async({ page }, use) => {
    const progressBarPage = new ProgressBarPage(page);
    await use(progressBarPage);
  },
  dragAndDropPage: async({ page }, use) => {
    const dragAndDropPage = new DragAndDropPage(page);
    await use(dragAndDropPage);
  },
  dynamicPage: async({ page }, use) => {
    const dynamicPage = new DynamicPage(page);
    await use(dynamicPage);
  },
  windowsPage: async({ page }, use) => {
    const windowsPage = new WindowsPage(page);
    await use(windowsPage);
  },
  formsPage: async({ page }, use) => {
    const formsPage = new FormsPage(page);
    await use(formsPage);
  }
});

module.exports = { 
  test: myTest, 
  expect: base.expect
};