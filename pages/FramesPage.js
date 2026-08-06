class FramesPage {
    constructor(page) {
        this.page = page;
        this.bigFrame = page.frameLocator('#frame1');
        this.frameHeading = 'h1#sampleHeading';
        this.parentFrame = page.frameLocator('#frame1');
        this.childFrame = this.parentFrame.frameLocator('iframe');
    }

    async open(path = '/frames') {
        await this.page.goto(path);
    }

    async getBigFrameHeading() {
        return await this.bigFrame.locator(this.frameHeading).innerText();
    }

    async getChildFrameHeading() {
        return await this.childFrame.locator('p').innerText();
    }

    async isChildFrameVisible() {
        return await this.childFrame.locator('p').isVisible();
    }
}

module.exports = { FramesPage };
