import { APIRequestContext, APIResponse } from '@playwright/test';
import { UserCredentials } from '../types.js';

export class BookStoreApi {
    constructor(private readonly request: APIRequestContext) {}

    getAuthHeaders(token: string): Record<string, string> {
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    }

    async createUser(credentials: UserCredentials): Promise<APIResponse> {
        return this.request.post('/Account/v1/User', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            data: credentials,
        });
    }

    async generateToken(credentials: UserCredentials): Promise<APIResponse> {
        return this.request.post('/Account/v1/GenerateToken', { data: credentials });
    }

    async getAllBooks(): Promise<APIResponse> {
        return this.request.get('/BookStore/v1/Books');
    }

    async addBookToCollection(userId: string, isbn: string, token: string): Promise<APIResponse> {
        return this.request.post('/BookStore/v1/Books', {
            headers: this.getAuthHeaders(token),
            data: {
                userId,
                collectionOfIsbns: [{ isbn }],
            },
        });
    }

    async deleteBookFromCollection(
        userId: string,
        isbn: string,
        token: string,
    ): Promise<APIResponse> {
        return this.request.delete('/BookStore/v1/Book', {
            headers: this.getAuthHeaders(token),
            data: { isbn, userId },
        });
    }

    async deleteUser(userId: string, token: string): Promise<APIResponse> {
        return this.request.delete(`/Account/v1/User/${userId}`, {
            headers: this.getAuthHeaders(token),
        });
    }

    async getBookByIsbn(isbn: string): Promise<APIResponse> {
        return this.request.get(`/BookStore/v1/Book?ISBN=${isbn}`);
    }
}
