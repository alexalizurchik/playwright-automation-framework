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
    
    async isEnableAfterButtonEnabled() {
       return await this.enableAfterButton.isEnabled();
    }

    async getColorChangeButtonClass() {
        return await this.colorChangeButton.getAttribute('class');
    }

   async isVisibleAfterButtonVisible() {
        return await this.visibleAfterButton.isVisible();
    }
}

module.exports = { DynamicPage };
