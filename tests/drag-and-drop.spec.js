// @ts-check
const { test } = require('./fixtures');

test('Should drag and drop element', async({ dragAndDropPage }) => {
  await dragAndDropPage.open();
  await dragAndDropPage.dragAndDrop();
  await dragAndDropPage.checkIsDropped();
});
