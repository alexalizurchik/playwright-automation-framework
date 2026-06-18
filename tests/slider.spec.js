const { test } = require('./fixtures');

test.describe('@ui Slider tests', async() => {
  test('@regression Should move slider to the value', async({ sliderPage }) => {
    const firstTargetValue = 100;
    const secondTargetValue = 40;

    await sliderPage.open();
    await sliderPage.setSliderRange(firstTargetValue);
    await sliderPage.checkInputValue(firstTargetValue);

    await sliderPage.setSliderRange(secondTargetValue);
    await sliderPage.checkInputValue(secondTargetValue);
  });
});
