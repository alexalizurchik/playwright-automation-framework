import { Page, Locator } from '@playwright/test';

export class DragAndDropPage {
    readonly draggableElement: Locator;
    readonly droppableElement: Locator;

    constructor(private readonly page: Page) {
        this.draggableElement = page.locator('#draggable');
        this.droppableElement = page.locator('#simpleDropContainer #droppable');
    }

    async open(): Promise<void> {
        await this.page.goto('/droppable');
        await this.page.waitForFunction("document.querySelector('#draggable')?.classList.contains('ui-draggable')");
    }

    async dragAndDrop(): Promise<void> {
        await this.draggableElement.dragTo(this.droppableElement);
    }

    async getDroppableText(): Promise<string> {
        return await this.droppableElement.innerText();
    }
}
