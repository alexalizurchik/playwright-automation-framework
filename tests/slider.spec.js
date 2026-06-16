// @ts-check
const { test } = require('./fixtures');

test('Should move slider to the value', async({ sliderPage }) => {
  const firstTargetValue = 100;
  const secondTargetValue = 40;

  await sliderPage.open();
  await sliderPage.setSliderRange(firstTargetValue);
  await sliderPage.checkInputValue(firstTargetValue);

  await sliderPage.setSliderRange(secondTargetValue);
  await sliderPage.checkInputValue(secondTargetValue);
});
