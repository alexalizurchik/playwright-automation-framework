const { test } = require('./fixtures');

test.describe('@ui Drag and Drop', async() => {
  test('@regression Should drag and drop element', async({ dragAndDropPage }) => {
    await dragAndDropPage.open();
    await dragAndDropPage.dragAndDrop();
    await dragAndDropPage.checkIsDropped();
  });
})
