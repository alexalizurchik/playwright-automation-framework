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

  test('@regression Should set slider to minimum value (0)', async({ sliderPage }) => {
    await sliderPage.open();
    await sliderPage.setSliderRange(0);
    await sliderPage.checkInputValue(0);
  });

  test('@regression Should set slider to mid-range value and verify', async({ sliderPage }) => {
    await sliderPage.open();
    await sliderPage.setSliderRange(50);
    await sliderPage.checkInputValue(50);
  });
});
