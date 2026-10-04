import path from 'path';
import { fileURLToPath } from 'url';
import { Page, Locator } from '@playwright/test';
import { PracticeFormUser, DateOfBirth } from '../types.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

export class FormsPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly userEmailInput: Locator;
    readonly userNumberInput: Locator;
    readonly currentAddressInput: Locator;
    readonly uploadPictureInput: Locator;
    readonly dateOfBirthInput: Locator;
    readonly daySelect: Locator;
    readonly monthSelect: Locator;
    readonly yearSelect: Locator;
    readonly subjectsInput: Locator;
    readonly stateSelect: Locator;
    readonly stateInput: Locator;
    readonly citySelect: Locator;
    readonly cityInput: Locator;
    readonly submitButton: Locator;
    readonly modalContent: Locator;

    constructor(private readonly page: Page) {
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

    async open(): Promise<void> {
        await this.page.goto('/automation-practice-form');
    }

    async fillBaseInfo(userData: PracticeFormUser): Promise<void> {
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.userEmailInput.fill(userData.email);
        await this.userNumberInput.fill(userData.mobileNumber);
        if (userData.address) {
            await this.currentAddressInput.fill(userData.address);
        }
    }

    async clickSubmit(): Promise<void> {
        await this.submitButton.click();
    }

    async selectGender(gender: string): Promise<void> {
        await this.page.getByText(gender, { exact: true }).click();
    }

    async selectDateOfBirth(dateOfBirth: DateOfBirth): Promise<void> {
        await this.dateOfBirthInput.click();
        await this.monthSelect.selectOption(dateOfBirth.month);
        await this.yearSelect.selectOption(dateOfBirth.year);

        const dayLocator = this.daySelect
            .filter({ hasNot: this.page.locator('.react-datepicker__day--outside-month') })
            .filter({ hasText: new RegExp(`^${dateOfBirth.day}$`) });

        await dayLocator.click();
        await this.page.keyboard.press('Escape');
    }

    async selectSubjects(subjects: string): Promise<void> {
        await this.subjectsInput.click();
        await this.subjectsInput.fill(subjects);

        const option = this.page.locator('.subjects-auto-complete__option');

        await option.waitFor({ state: 'visible' });
        await option.first().click();
    }

    async selectHobbies(hobbies: string[]): Promise<void> {
        for (const hobby of hobbies) {
            await this.page.getByText(hobby, { exact: true }).click();
        }
    }

    async uploadPicture(fileName: string): Promise<void> {
        const filePath = path.resolve(currentDir, `../test-assets/${fileName}`);

        await this.uploadPictureInput.setInputFiles(filePath);
    }

    async selectStateAndCity(state: string, city: string): Promise<void> {
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

    async fillForm(userData: PracticeFormUser): Promise<void> {
        await this.fillBaseInfo(userData);
        await this.selectGender(userData.gender);
        await this.selectDateOfBirth(userData.dateOfBirth);
        await this.selectSubjects(userData.subjects);
        await this.selectHobbies(userData.hobbies);

        if (userData.picture) {
            await this.uploadPicture(userData.picture);
        }

        await this.selectStateAndCity(userData.state, userData.city);
        await this.clickSubmit();
    }

    async isModalVisible(): Promise<boolean> {
        return await this.modalContent.isVisible();
    }

    async getModalText(): Promise<string> {
        return await this.modalContent.innerText();
    }
}
