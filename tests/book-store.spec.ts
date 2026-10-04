import { test, expect } from '../fixtures/index.js';

interface CatalogueBook {
    isbn: string;
    title: string;
    author: string;
}

const asCatalogueBook = (book: {
    isbn: string;
    title: string;
    author: string;
}): CatalogueBook => ({
    isbn: book.isbn,
    title: book.title,
    author: book.author,
});

const MIN_FRAGMENT_LENGTH = 3;

const matchesQuery = (book: CatalogueBook, query: string): boolean =>
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase());

const getMatchingIsbns = (books: CatalogueBook[], query: string): string[] =>
    books.filter((book) => matchesQuery(book, query)).map((book) => book.isbn);

const sortIsbns = (isbns: string[]): string[] => [...isbns].sort();

const getTitleWords = (book: CatalogueBook): string[] =>
    book.title.split(/\s+/).filter((word) => word.length >= MIN_FRAGMENT_LENGTH);

const isSuitableAnchor = (books: CatalogueBook[], book: CatalogueBook): boolean => {
    const hasDerivableFragment = getTitleWords(book).length > 0;
    const matchesOnlyItself = getMatchingIsbns(books, book.title).every(
        (isbn) => isbn === book.isbn,
    );

    return hasDerivableFragment && matchesOnlyItself;
};

const selectAnchorBook = (books: CatalogueBook[]): CatalogueBook => {
    const suitable = books.filter((book) => isSuitableAnchor(books, book));

    if (suitable.length === 0) {
        throw new Error('No book satisfies the anchor selection conditions');
    }

    return suitable.reduce((best, current) => {
        if (current.title.length > best.title.length) {
            return current;
        }

        if (current.title.length < best.title.length) {
            return best;
        }

        return current.title.localeCompare(best.title) < 0 ? current : best;
    });
};

const deriveTitleFragment = (books: CatalogueBook[]): string => {
    const uniqueTitleWords = [...new Set(books.flatMap((book) => getTitleWords(book)))];
    const qualifyingWords = uniqueTitleWords.filter((word) => {
        const matches = getMatchingIsbns(books, word).length;

        return matches > 0 && matches < books.length;
    });

    if (qualifyingWords.length === 0) {
        throw new Error('Could not derive a title fragment that exercises filtering');
    }

    return qualifyingWords.reduce((best, current) => {
        if (current.length > best.length) {
            return current;
        }

        if (current.length < best.length) {
            return best;
        }

        return current.localeCompare(best) < 0 ? current : best;
    });
};

test.describe('@ui Book Store tests', () => {
    test('@regression Should search the catalogue by full title, title fragment, and case variant', async ({
        bookStorePage,
        bookStoreApi,
    }) => {
        const response = await bookStoreApi.getAllBooks();
        expect(response.status()).toBe(200);

        const body = await response.json();
        const books: CatalogueBook[] = body.books.map(asCatalogueBook);
        expect(books.length).toBeGreaterThan(0);

        const anchorBook = selectAnchorBook(books);
        const fullTitleMatches = sortIsbns(getMatchingIsbns(books, anchorBook.title));
        expect(fullTitleMatches).toEqual([anchorBook.isbn]);

        await bookStorePage.open();

        await bookStorePage.search(anchorBook.title);

        await expect
            .poll(async () => sortIsbns(await bookStorePage.getVisibleBookIsbns()))
            .toEqual(fullTitleMatches);

        expect(await bookStorePage.getVisibleBookTitles()).toContain(anchorBook.title);

        const fragment = deriveTitleFragment(books);
        const fragmentMatches = getMatchingIsbns(books, fragment);

        await bookStorePage.search(fragment);

        await expect
            .poll(async () => sortIsbns(await bookStorePage.getVisibleBookIsbns()))
            .toEqual(sortIsbns(fragmentMatches));

        expect(fragmentMatches.length).toBeGreaterThan(0);
        expect(fragmentMatches.length).toBeLessThan(books.length);

        await bookStorePage.search(anchorBook.title.toUpperCase());

        await expect
            .poll(async () => sortIsbns(await bookStorePage.getVisibleBookIsbns()))
            .toEqual(fullTitleMatches);
    });
});