import { Page, FrameLocator } from '@playwright/test';

export class FramesPage {
    readonly bigFrame: FrameLocator;
    readonly frameHeading: string;
    readonly parentFrame: FrameLocator;
    readonly childFrame: FrameLocator;

    constructor(private readonly page: Page) {
        this.bigFrame = page.frameLocator('#frame1');
        this.frameHeading = 'h1#sampleHeading';
        this.parentFrame = page.frameLocator('#frame1');
        this.childFrame = this.parentFrame.frameLocator('iframe');
    }

    async open(path = '/frames'): Promise<void> {
        await this.page.goto(path);
    }

    async getBigFrameHeading(): Promise<string> {
        return await this.bigFrame.locator(this.frameHeading).innerText();
    }

    async getChildFrameHeading(): Promise<string> {
        return await this.childFrame.locator('p').innerText();
    }

    async isChildFrameVisible(): Promise<boolean> {
        return await this.childFrame.locator('p').isVisible();
    }
}
