const { expect } = require('@playwright/test');

class FramesPage {
    constructor(page) {
        this.page = page;
        this.bigFrame = page.frameLocator('#frame1');
        this.smallFrame = page.frameLocator('#frame2');
        this.frameHeading = 'h1#sampleHeading';
        this.parentFrame = page.frameLocator('#frame1');
        this.childFrame = this.parentFrame.frameLocator('iframe');
    } 

    async open(path = '/frames') {
        await this.page.goto(path);
    }

    async checkBigFrameHeading(text) {
        await expect(this.bigFrame.locator(this.frameHeading)).toHaveText(text);
    }

    async checkChildFrameHeading(text) {
        await expect(this.childFrame.locator('p')).toHaveText(text);
    }
}

module.exports = { FramesPage };