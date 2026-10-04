import { test, expect } from '../fixtures/index.js';

test.describe('@ui Drag and Drop', async () => {
    test('@regression Should drag and drop element', async ({ dragAndDropPage }) => {
        await dragAndDropPage.open();
        expect(await dragAndDropPage.getDroppableText()).toBe('Drop Here');
        await dragAndDropPage.dragAndDrop();
        await expect.poll(() => dragAndDropPage.getDroppableText()).toBe('Dropped!');
    });
});
