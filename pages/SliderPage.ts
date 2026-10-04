import { Page, Locator } from '@playwright/test';

export class SliderPage {
    readonly slider: Locator;
    readonly sliderValue: Locator;

    constructor(private readonly page: Page) {
        this.slider = page.locator('#slider');
        this.sliderValue = page.locator('#sliderValue');
    }

    async open(): Promise<void> {
        await this.page.goto('/slider');
    }

    async setSliderRange(targetValue: number): Promise<void> {
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

    async getSliderValue(): Promise<string> {
        return await this.sliderValue.inputValue();
    }
}
