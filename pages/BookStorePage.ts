import { Page, Locator } from '@playwright/test';

export class BookStorePage {
    readonly searchBox: Locator;
    readonly tableRows: Locator;

    constructor(private readonly page: Page) {
        this.searchBox = page.locator('#searchBox');
        this.tableRows = page.locator('table tbody tr');
    }

    async open(): Promise<void> {
        await this.page.goto('/books');
    }

    async search(query: string): Promise<void> {
        await this.searchBox.fill(query);
    }

    async clearSearch(): Promise<void> {
        await this.searchBox.fill('');
    }

    async getVisibleBookTitles(): Promise<string[]> {
        const rows = await this.tableRows.all();
        const titles: string[] = [];

        for (const row of rows) {
            titles.push((await row.locator('a').first().innerText()).trim());
        }

        return titles;
    }

    async getVisibleBookIsbns(): Promise<string[]> {
        const rows = await this.tableRows.all();
        const isbns: string[] = [];

        for (const row of rows) {
            const href = await row.locator('a').first().getAttribute('href');

            if (href) {
                const isbn = new URL(href, this.page.url()).searchParams.get('search');

                if (isbn) {
                    isbns.push(isbn);
                }
            }
        }

        return isbns;
    }
}