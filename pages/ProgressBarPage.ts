import { Page, Locator } from '@playwright/test';

export class ProgressBarPage {
    readonly progressBar: Locator;
    readonly startButton: Locator;
    readonly resetButton: Locator;

    constructor(private readonly page: Page) {
        this.progressBar = this.page.locator('div[role="progressbar"]');
        this.startButton = this.page.locator('#startStopButton');
        this.resetButton = this.page.locator('#resetButton');
    }

    async open(): Promise<void> {
        await this.page.goto('/progress-bar');
    }

    async startProgress(): Promise<void> {
        await this.startButton.click();
    }

    async resetProgress(): Promise<void> {
        await this.resetButton.click();
    }

    async getProgressStatus(): Promise<string> {
        return await this.progressBar.innerText();
    }

    async getProgressValue(): Promise<string | null> {
        return await this.progressBar.getAttribute('aria-valuenow');
    }
}
