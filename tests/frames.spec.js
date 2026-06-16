// @ts-check
const { test } = require('./fixtures');

test('Should check a frame heading', async({ framesPage }) => {
  const expectedFrameHeading = 'This is a sample page';

  await framesPage.open();
  await framesPage.checkBigFrameHeading(expectedFrameHeading);
});

test('Should check a nested frame heading', async({ framesPage }) => {
  const expectedHeading = 'Child Iframe';

  await framesPage.open('/nestedframes');
  await framesPage.checkChildFrameHeading(expectedHeading);
});
