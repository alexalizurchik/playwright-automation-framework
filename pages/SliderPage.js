const { expect } = require('@playwright/test');

class SliderPage {
    constructor(page) {
        this.page = page;
        this.slider = page.locator('#slider');
        this.sliderValue = page.locator('#sliderValue');
    }

    async open() {
        await this.page.goto('/slider');
    }

    async setSliderRange(targetValue) {
        const target = Number(targetValue);

        await this.slider.click();

        let currentValue = Number(await this.slider.inputValue());

        while (currentValue !== target) {
            if (currentValue < target) {
                await this.slider.press('ArrowRight');
            } else {
                await this.slider.press('ArrowLeft');
            }

            currentValue = Number(await this.slider.inputValue());
            
            if (currentValue === target) break; 
        }
    }

    async checkInputValue(value) {
        await expect(this.sliderValue).toHaveValue(String(value));
    }
}

module.exports = { SliderPage };