import { Page, Locator } from '@playwright/test';

export class DynamicPage {
    readonly enableAfterButton: Locator;
    readonly colorChangeButton: Locator;
    readonly visibleAfterButton: Locator;

    constructor(private readonly page: Page) {
        this.enableAfterButton = this.page.locator('#enableAfter');
        this.colorChangeButton = this.page.locator('#colorChange');
        this.visibleAfterButton = this.page.locator('#visibleAfter');
    }

    async open(): Promise<void> {
        await this.page.goto('/dynamic-properties');
    }

    async isEnableAfterButtonEnabled(): Promise<boolean> {
        return await this.enableAfterButton.isEnabled();
    }

    async getColorChangeButtonClass(): Promise<string | null> {
        return await this.colorChangeButton.getAttribute('class');
    }

    async isVisibleAfterButtonVisible(): Promise<boolean> {
        return await this.visibleAfterButton.isVisible();
    }
}
