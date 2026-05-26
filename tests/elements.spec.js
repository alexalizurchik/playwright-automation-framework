// @ts-check
const { test, expect } = require('./fixtures');

test('Should show a successfull message after form submiting', async ({ textBoxPage }) => {
  const name = process.env.USER_NAME;
  const email = process.env.USER_EMAIL;
  const address = process.env.USER_ADDRESS;

  await textBoxPage.open();
  await textBoxPage.fillForm(name, email, address);

  await textBoxPage.checkOutputBlockText(name);
});

test('Should show a confirm message after dialog confirmation', async({ alertsPage }) => {
  const confirmMessage = 'You selected Ok';

  await alertsPage.open();
  await alertsPage.triggerDialog(true);
  await alertsPage.checkConfirmMessage(confirmMessage);
})

test('Should verify the text inside the dialog', async({ alertsPage }) => {
  const dialogMessage = 'Do you confirm action?';

  await alertsPage.open();
  await alertsPage.triggerDialog(true, dialogMessage);
})

test('Should show a decline message after dialog cancel', async({ alertsPage }) => {
  const declineMessage = 'You selected Cancel';

  await alertsPage.open();
  await alertsPage.triggerDialog(false);
  await alertsPage.checkConfirmMessage(declineMessage);
})

test('Should check a frame heading', async({ framesPage }) => {
  const expectedFrameHeading = 'This is a sample page';

  await framesPage.open();
  await framesPage.checkBigFrameHeading(expectedFrameHeading);
})

test('Should check a nested frame heading', async({ framesPage }) => {
  const expectedHeading = 'Child Iframe';

  await framesPage.open('/nestedframes');
  await framesPage.checkChildFrameHeading(expectedHeading);
})

test('Should move slider to the value', async({ sliderPage }) => {
  const firstTargetValue = 100;
  const secondTargetValue = 40;

  await sliderPage.open();
  await sliderPage.setSliderRange(firstTargetValue);
  await sliderPage.checkInputValue(firstTargetValue);

  await sliderPage.setSliderRange(secondTargetValue);
  await sliderPage.checkInputValue(secondTargetValue);
})

test('Should reset progress bar', async( { progressBarPage })=> {
  await progressBarPage.open();
  await progressBarPage.startProgress();
  await progressBarPage.waitForCompletion();
  await progressBarPage.resetProgress();
  await progressBarPage.checkIsReset();
})

test('Should drag and drop element', async({ dragAndDropPage }) => {
  await dragAndDropPage.open();
  await dragAndDropPage.dragAndDrop();
  await dragAndDropPage.checkIsDropped();
})

test('Should check button enabling', async({ dynamicPage }) => {
  await dynamicPage.open();
  await dynamicPage.checkEnableAfterButton();
})

test('Should check button color change', async({ dynamicPage }) => {
  await dynamicPage.open();
  await dynamicPage.checkColorChangeButton();
})

test('Should check button visibility', async({ dynamicPage }) => {
  await dynamicPage.open();
  await dynamicPage.checkVisibleAfterButton();
})