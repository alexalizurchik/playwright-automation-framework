const { expect } = require('@playwright/test');

class DragAndDropPage {
    constructor(page) {
        this.page = page;
        this.draggableElement = page.locator('#draggable');
        this.droppableElement = page.locator('#simpleDropContainer #droppable');
    }

    async open() {
        await this.page.goto('/droppable');
        await this.page.waitForFunction(() =>
            document.querySelector('#draggable')?.classList.contains('ui-draggable'),
        );
    }

    async dragAndDrop() {
        await expect(this.droppableElement).toHaveText('Drop Here');

        await this.draggableElement.dragTo(this.droppableElement);

        await expect(this.droppableElement).toHaveText('Dropped!');
    }
}

module.exports = { DragAndDropPage };
