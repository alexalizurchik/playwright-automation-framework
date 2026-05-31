const { expect } = require('@playwright/test');
const path = require('path');

class FormsPage {
    constructor(page) {
        this.page = page;

        //Basic info
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.userEmailInput = page.locator('#userEmail');
        this.userNumberInput = page.locator('#userNumber');
        this.currentAddressInput = page.locator('#currentAddress');
        this.uploadPictureInput = page.locator('#uploadPicture');

        //Date of Birth
        this.dateOfBirthInput = page.locator('#dateOfBirthInput');
        this.daySelect = page.locator('.react-datepicker__day');
        this.monthSelect = page.locator('.react-datepicker__month-select');
        this.yearSelect = page.locator('.react-datepicker__year-select');

        //Subjects input
        this.subjectsInput = page.locator('#subjectsInput');

        //State and City dropdowns
        this.stateSelect = page.locator('#state');
        this.stateInput = this.stateSelect.locator('input');
        this.citySelect = page.locator('#city');
        this.cityInput = this.citySelect.locator('input');

        //Submit button
        this.submitButton = page.locator('#submit');

        //Modal content
        this.modalContent = page.locator('.modal-content');
    }

    async open() {
        await this.page.goto('/automation-practice-form');
    }

    async fillBaseInfo(firstName, lastName, email, mobileNumber, address) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.userEmailInput.fill(email);
        await this.userNumberInput.fill(mobileNumber);
        await this.currentAddressInput.fill(address);
    }

    async selectGender(gender) {
        await this.page.getByText(gender, { exact: true }).click();
    }

    async selectDateOfBirth(dateOfBirth) {
        await this.dateOfBirthInput.click();
        await this.monthSelect.selectOption(dateOfBirth.month);
        await this.yearSelect.selectOption(dateOfBirth.year);

        const dayLocator = this.daySelect
            .filter({ hasNot: this.page.locator('.react-datepicker__day--outside-month') })
            .filter({ hasText: new RegExp(`^${dateOfBirth.day}$`) });

        await dayLocator.click();
        await this.page.keyboard.press('Escape');
    }

    async selectSubjects(subjects) {
        await this.subjectsInput.click();
        await this.subjectsInput.fill(subjects);

        const option = this.page.locator('.subjects-auto-complete__option');

        await option.waitFor({ state: 'visible' });
        await option.first().click();
    }

    async selectHobbies(hobbies) {
        for (const hobby of hobbies) {
            await this.page.getByText(hobby, { exact: true }).click();
        }
    }

    async uploadPicture(fileName) {
        const filePath = path.resolve(__dirname, `../fixtures/${fileName}`);

        await this.uploadPictureInput.setInputFiles(filePath);
    }

    async selectStateAndCity(state, city) {
        await this.stateSelect.click();
        await this.stateInput.fill(state);

        const stateOption = this.stateSelect.getByText(state, { exact: true });
        
        await stateOption.waitFor({ state: 'visible' });
        await stateOption.click();
        
        await this.citySelect.click();
        await this.cityInput.fill(city);

        const cityOption = this.citySelect.getByText(city, { exact: true });
        
        await cityOption.waitFor({ state: 'visible' });
        await cityOption.click();
    }

    async fillForm(userData) {
        await this.fillBaseInfo(userData.firstName, userData.lastName, userData.email, userData.mobileNumber, userData.address);
        await this.selectGender(userData.gender);
        await this.selectDateOfBirth(userData.dateOfBirth);
        await this.selectSubjects(userData.subjects);
        await this.selectHobbies(userData.hobbies);

        if (userData.picture) {
            await this.uploadPicture(userData.picture);
        }

        await this.selectStateAndCity(userData.state, userData.city);
        await this.submitButton.click();
    }

    async checkSubmissionResult(expectedData) {
        const modal = this.modalContent;

        await expect(modal).toBeVisible();

        const expectedValues = [
            `${expectedData.firstName} ${expectedData.lastName}`,
            expectedData.email,
            expectedData.gender,
            expectedData.mobileNumber,
            `${expectedData.dateOfBirth.day} ${expectedData.dateOfBirth.month},${expectedData.dateOfBirth.year}`,
            expectedData.subjects,
            expectedData.hobbies.join(', '),
            expectedData.picture,
            `${expectedData.state} ${expectedData.city}`
        ];

        for (const value of expectedValues) {
            await expect(modal).toContainText(value);
        }
    }
}

module.exports = { FormsPage };