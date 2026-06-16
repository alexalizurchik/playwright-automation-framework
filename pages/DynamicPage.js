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
        await expect(this.colorChangeButton).not.toHaveClass(/text-danger/);
        await expect(this.colorChangeButton).toHaveClass(/text-danger/, { timeout: 6000 });
    }

    async checkVisibleAfterButton() {
        await expect(this.visibleAfterButton).toBeHidden();
        await expect(this.visibleAfterButton).toBeVisible({ timeout: 6000 });
    }
}

module.exports = { DynamicPage };