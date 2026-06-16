class BookStoreApi {
    constructor(request) {
        this.request = request;
    }

    getAuthHeaders(token) {
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }

    async createUser(credentials) {
        return this.request.post('/Account/v1/User', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: credentials
        });
    }

    async generateToken(credentials) {
        return this.request.post('/Account/v1/GenerateToken', { data: credentials });
    }

    async getAllBooks() {
        return this.request.get('/BookStore/v1/Books');
    }

    async addBookToCollection(userId, isbn, token) {
        return this.request.post('/BookStore/v1/Books', {
            headers: this.getAuthHeaders(token),
            data: {
                userId,
                collectionOfIsbns: [{ isbn }]
            }
        });
    }

    async deleteBookFromCollection(userId, isbn, token) {
        return this.request.delete('/BookStore/v1/Book', {
            headers: this.getAuthHeaders(token),
            data: { isbn, userId }
        });
    }

    async deleteUser(userId, token) {
        return this.request.delete(`/Account/v1/User/${userId}`, {
            headers: this.getAuthHeaders(token)
        });
    }
} 

module.exports = { BookStoreApi };
