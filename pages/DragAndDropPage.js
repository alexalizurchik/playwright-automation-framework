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
        await this.draggableElement.dragTo(this.droppableElement);
    }

    async getDroppableText() {
        return await this.droppableElement.innerText();
    }
}

module.exports = { DragAndDropPage };
