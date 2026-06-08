// @ts-check
const { WebTablesPage } = require('../pages/WebTablesPage');
const { test, expect } = require('./fixtures');
const { beforeEach } = test;

test('Should show a successfull message after form submiting', async ({ textBoxPage }) => {
  const name = process.env.USER_NAME;
  const email = process.env.USER_EMAIL;
  const address = process.env.USER_ADDRESS;

  await textBoxPage.open();
  await textBoxPage.fillForm(name, email, address);

  await textBoxPage.checkOutputBlockText(name);
});

test('Should show a confirm message after dialog confirmation', async({ alertsPage }) => {
  const confirmMessage = 'You selected Ok';

  await alertsPage.open();
  await alertsPage.triggerDialog(true);
  await alertsPage.checkConfirmMessage(confirmMessage);
})

test('Should verify the text inside the dialog', async({ alertsPage }) => {
  const dialogMessage = 'Do you confirm action?';

  await alertsPage.open();
  await alertsPage.triggerDialog(true, dialogMessage);
})

test('Should show a decline message after dialog cancel', async({ alertsPage }) => {
  const declineMessage = 'You selected Cancel';

  await alertsPage.open();
  await alertsPage.triggerDialog(false);
  await alertsPage.checkConfirmMessage(declineMessage);
})

test('Should check a frame heading', async({ framesPage }) => {
  const expectedFrameHeading = 'This is a sample page';

  await framesPage.open();
  await framesPage.checkBigFrameHeading(expectedFrameHeading);
})

test('Should check a nested frame heading', async({ framesPage }) => {
  const expectedHeading = 'Child Iframe';

  await framesPage.open('/nestedframes');
  await framesPage.checkChildFrameHeading(expectedHeading);
})

test('Should move slider to the value', async({ sliderPage }) => {
  const firstTargetValue = 100;
  const secondTargetValue = 40;

  await sliderPage.open();
  await sliderPage.setSliderRange(firstTargetValue);
  await sliderPage.checkInputValue(firstTargetValue);

  await sliderPage.setSliderRange(secondTargetValue);
  await sliderPage.checkInputValue(secondTargetValue);
})

test('Should reset progress bar', async( { progressBarPage })=> {
  await progressBarPage.open();
  await progressBarPage.startProgress();
  await progressBarPage.waitForCompletion();
  await progressBarPage.resetProgress();
  await progressBarPage.checkIsReset();
})

test('Should drag and drop element', async({ dragAndDropPage }) => {
  await dragAndDropPage.open();
  await dragAndDropPage.dragAndDrop();
  await dragAndDropPage.checkIsDropped();
})

test('Should check button enabling', async({ dynamicPage }) => {
  await dynamicPage.open();
  await dynamicPage.checkEnableAfterButton();
})

test('Should check button color change', async({ dynamicPage }) => {
  await dynamicPage.open();
  await dynamicPage.checkColorChangeButton();
})

test('Should check button visibility', async({ dynamicPage }) => {
  await dynamicPage.open();
  await dynamicPage.checkVisibleAfterButton();
})

test.describe('Browser windows tests', () => {
  test.beforeEach(async({ windowsPage }) => {
    await windowsPage.open();
  })

  const expectedUrl = 'https://demoqa.com/sample';
  const expectedHeading = 'This is a sample page';

  test('Should open new tab and check url', async({ windowsPage }) => {
    await windowsPage.checkPopupUrl(windowsPage.newTabButton, expectedUrl);
  })

  test('Should open new tab and check heading', async({ windowsPage }) => {
    await windowsPage.checkPopupText(windowsPage.newTabButton, false, expectedHeading);
  })

  test('Should open new window and check url', async({ windowsPage }) => {
    await windowsPage.checkPopupUrl(windowsPage.newWindowButton, expectedUrl);
  })

  test('Should open new window and check heading', async({ windowsPage }) => {
    await windowsPage.checkPopupText(windowsPage.newWindowButton, false, expectedHeading);
  })

  test('Should open new window message and check text', async({ windowsPage }) => {
  const expectedText = 'Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.';

  await windowsPage.checkPopupText(windowsPage.newWindowMessageButton, true, expectedText);
})
})

test('Should fill the form and submit it', async({ formsPage }) => {
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    mobileNumber: '1234567890',
    address: 'someAddress USA',
    gender: 'Male',
    dateOfBirth: {
      day: '15',
      month: 'May',
      year: '1990'
    },
    subjects: 'Maths',
    hobbies: ['Sports', 'Reading'],
    picture: 'test-image.png',
    state: 'NCR',
    city: 'Delhi'
  };

  await formsPage.open();
  await formsPage.fillForm(userData);
  await formsPage.checkSubmissionResult(userData);
})

test.describe('Web tables tests', () => {
  let userData;

  test.beforeEach(async({ webTablesPage }) => {
    userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      age: 30,
      salary: 50000,
      department: 'IT'
    };

    await webTablesPage.open();
    await webTablesPage.addNewRecord(userData);
  });


  test('Should add new record to the table and check it', async({ webTablesPage }) => {
    await webTablesPage.checkNewAddedRecord(userData);
  })

  test('Should edit an existing record by email', async({ webTablesPage }) => {
    const updatedData = {
      firstName: 'Johnny',
      salary: 60000
    }

    await webTablesPage.editRecordByAnchor(userData.email, updatedData);
    await webTablesPage.checkEditedRecord(userData.email, updatedData);
  })

  test('Should delete record and check it', async({ webTablesPage }) => {
    await webTablesPage.deleteRecordByAnchor(userData.email);
    await webTablesPage.checkDeletedRecord(userData.email);
  })
})
