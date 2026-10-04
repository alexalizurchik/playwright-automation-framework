import { APIRequestContext } from "@playwright/test";

export class APIClient {
    constructor(private readonly request: APIRequestContext) {}

    async createUser(user) {
        return this.request.post('/users', {
            data: user
        })
    };

    async deleteUser(userId) {
        return this.request.delete(`/users/${userId}`);
    };

    async loginUser(user) {
        const response = await this.request.post('/login', {
            data: {
                email: user.email,
                password: user.password
            }
        }) 

        const body = await response.json();

        return body.token;
    }
}