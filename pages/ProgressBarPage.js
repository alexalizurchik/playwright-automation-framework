const { expect } = require('@playwright/test');

class ProgressBarPage {
    constructor(page) {
        this.page = page;
        this.progressBar = this.page.locator('div[role="progressbar"]');
        this.startButton = this.page.locator('#startStopButton');
        this.resetButton = this.page.locator('#resetButton');
    }

    async open() {
        await this.page.goto('/progress-bar');
    }

    async startProgress() {
        await this.startButton.click();
    }

    async resetProgress() {
        await this.resetButton.click();
    }

    async waitForCompletion() {
        await expect(this.progressBar).toHaveText('100%', { timeout: 20000 });
    }

     async checkIsReset() {
        const value = await this.progressBar.getAttribute('aria-valuenow');
        expect(value).toBe('0');
    }

}

module.exports = { ProgressBarPage };