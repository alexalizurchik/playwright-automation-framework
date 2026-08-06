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

    async getProgressStatus() {
        return await this.progressBar.innerText();
    }

    async getProgressValue() {
        return await this.progressBar.getAttribute('aria-valuenow');
    }
}

module.exports = { ProgressBarPage };
