const { expect } = require('@playwright/test');

class DragAndDropPage {
    constructor(page) {
        this.page = page;
        this.draggableElement = page.locator('#draggable');
        this.droppableElement = page.locator('#simpleDropContainer #droppable');
    }

    async open() {
        await this.page.goto('/droppable');
    }

    async dragAndDrop() {
        await expect(this.draggableElement).toHaveClass(/draggable/);

        await this.draggableElement.dragTo(this.droppableElement);
    }

    async checkIsDropped() {
        await expect(this.droppableElement).toHaveText('Dropped!');
    }
}

module.exports = { DragAndDropPage };