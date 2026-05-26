const { expect } = require('@playwright/test');

class DynamicPage {
    constructor(page) {
        this.page = page;
        this.enableAfterButton = this.page.locator('#enableAfter');
        this.colorChangeButton = this.page.locator('#colorChange');
        this.visibleAfterButton = this.page.locator('#visibleAfter'); 
    }

    async open() {
        await this.page.goto('/dynamic-properties');
    }

    async checkEnableAfterButton() {
        await expect(this.enableAfterButton).toBeDisabled();
        await expect(this.enableAfterButton).toBeEnabled({ timeout: 6000 });
    }

    async checkColorChangeButton() {
        const INITIAL_COLOR = 'rgb(255, 255, 255)';
        const CHANGED_COLOR = 'rgb(220, 53, 69)';

        const initialColor = await this.colorChangeButton.evaluate((el) => getComputedStyle(el).color);
        await expect(this.colorChangeButton).toHaveCSS('color', INITIAL_COLOR);

        const changedColor = await this.colorChangeButton.evaluate((el) => getComputedStyle(el).color);
        await expect(this.colorChangeButton).toHaveCSS('color', CHANGED_COLOR, { timeout: 6000 });
    }

    async checkVisibleAfterButton() {
        await expect(this.visibleAfterButton).toBeHidden();
        await expect(this.visibleAfterButton).toBeVisible({ timeout: 6000 });
    }
}

module.exports = { DynamicPage };