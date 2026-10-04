import { test, expect } from '../fixtures/index.js';

test.describe('@ui Slider tests', async () => {
    test.beforeEach(async ({ sliderPage }) => {
        await sliderPage.open();
    });

    test('@regression Should move slider to the value', async ({ sliderPage }) => {
        await sliderPage.setSliderRange(100);
        expect(await sliderPage.getSliderValue()).toBe('100');

        await sliderPage.setSliderRange(40);
        expect(await sliderPage.getSliderValue()).toBe('40');
    });

    test('@regression Should set slider to minimum value (0)', async ({ sliderPage }) => {
        await sliderPage.setSliderRange(0);
        expect(await sliderPage.getSliderValue()).toBe('0');
    });

    test('@regression Should set slider to mid-range value and verify', async ({ sliderPage }) => {
        await sliderPage.setSliderRange(50);
        expect(await sliderPage.getSliderValue()).toBe('50');
    });
});
