import { TextBoxUser, PracticeFormUser, WebTableUser, UserCredentials } from '../types.js';

export const textBoxUser: TextBoxUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: process.env.USER_EMAIL || 'john.doe@example.com',
    address: process.env.USER_ADDRESS || '221B Baker Street',
};

export const practiceFormUser: PracticeFormUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    mobileNumber: '1234567890',
    address: 'someAddress USA',
    gender: 'Male',
    dateOfBirth: {
        day: '15',
        month: 'May',
        year: '1990',
    },
    subjects: 'Maths',
    hobbies: ['Sports', 'Reading'],
    picture: 'test-image.png',
    state: 'NCR',
    city: 'Delhi',
};

export const webTableUser: WebTableUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    age: 30,
    salary: 50000,
    department: 'IT',
};

export const updatedWebTableUser: Partial<WebTableUser> = {
    firstName: 'Johnny',
    salary: 60000,
};

export const invalidUser: UserCredentials = {
    userName: 'nonexistent_user',
    password: 'WrongPassword!',
};

export const formInvalidEmail: PracticeFormUser = {
    ...practiceFormUser,
    email: 'not-an-email',
};

export const formInvalidMobile: PracticeFormUser = {
    ...practiceFormUser,
    mobileNumber: '123456789',
};

export const nonExistentIsbn: string = '0000000000';
export const fakeUserId: string = '00000000-0000-0000-0000-000000000000';
export const emptyToken: string = '';
