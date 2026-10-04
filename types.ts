export interface DateOfBirth {
    day: string;
    month: string;
    year: string;
}

export interface TextBoxUser {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
}

export interface PracticeFormUser {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    address?: string;
    gender: string;
    dateOfBirth: DateOfBirth;
    subjects: string;
    hobbies: string[];
    picture?: string;
    state: string;
    city: string;
}

export interface WebTableUser {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    salary: number;
    department: string;
}

export interface UserCredentials {
    userName: string;
    password?: string;
}
