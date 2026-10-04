# US-002: Search and View Book Details

**Status:** Draft — acceptance criteria and test coverage defined

**Intended use:** Input for the project's [`create-e2e-test` skill](../../skills/create-e2e-test/SKILL.md) to generate automated Playwright tests. Use the acceptance criteria and coverage matrix below to define scenarios and assertions, and follow the project's current TypeScript, Page Object, and fixture conventions.

## User story

As a visitor to the DemoQA Book Store, I want to search for books and view a selected book's details so that I can find relevant books and learn more about them.

## Scope and assumptions

- Feature: the DemoQA Book Store catalogue at `/books` and its book details view.
- Browsing, searching, and viewing details are available without signing in.
- Search matches a full or partial title or author, ignoring letter case.
- UI routes, search behavior, displayed fields, and navigation below are proposed acceptance requirements; they have not been verified against the live application.
- The repository already provides `BookStoreApi.getAllBooks()` and `BookStoreApi.getBookByIsbn()` in `pages/BookStoreApi.ts`, plus the `bookStoreApi` and `firstBookIsbn` fixtures in `fixtures/index.ts`.
- Existing coverage is API-only for this feature. There is no Book Store UI page object or UI test suite yet.
- Signing in, account management, and adding or removing books from a collection are outside this story.

## Acceptance criteria

### AC-01: Browse the catalogue without signing in

Given I am not signed in, when I open the Book Store page, then the catalogue displays the available books with their titles, authors, and publishers. Each book title provides a way to open that book's details, and browsing does not require authentication.

### AC-02: Search by title

Given the catalogue is loaded, when I enter a full or partial book title in the search field, then the displayed results contain only books whose title or author matches the query. A book with a matching title is included. Repeat with different letter case and confirm that the same books are returned.

### AC-03: Search by author

Given the catalogue is loaded, when I enter a full or partial author name in the search field, then the displayed results contain only books whose title or author matches the query. All books by the matching author are included. Repeat with different letter case and confirm that the same books are returned.

### AC-04: Handle a search with no matches

Given the catalogue is loaded, when I enter a query that matches no title or author, then no book rows are displayed and an empty-results indication is visible. The search field remains available so that I can change or clear the query.

### AC-05: Clear the search

Given a search has filtered the catalogue or returned no matches, when I clear the search field, then all available books are displayed again. Repeat independently from both starting states.

### AC-06: View the selected book's details

Given a book is visible in the catalogue or filtered results, when I select its title, then its details view opens and displays its ISBN, title, subtitle, author, publisher, publication date, page count, description, and website. These values match the selected book returned by `GET /BookStore/v1/Book?ISBN=<selected ISBN>`. An empty optional value may be displayed as empty; values from another book must not appear. Viewing details does not require authentication.

### AC-07: Return to the catalogue

Given I am viewing a book's details, when I activate the control for returning to the Book Store, then the catalogue and search field are available again and I can search for and open another book. Preserving the previous search query is outside this story.

### AC-08: Retrieve details by ISBN through the API

Given an ISBN obtained from `GET /BookStore/v1/Books`, when I request `GET /BookStore/v1/Book?ISBN=<ISBN>` without authentication, then the response status is `200` and its ISBN and detail fields match the corresponding catalogue entry. When I request the non-existent ISBN from `tests/test-data.ts`, then the response status is `400` and no valid book details are returned.

## Explicit test coverage

Existing API tests are in `tests/book-store-api.spec.ts`. “Partial” describes assertions present in the source; it does not indicate a passing execution. UI test IDs below describe planned coverage.

| Test ID | Criterion | Scenario and required assertions                                                                                                                                                            | Current coverage                                                                                      | Tags               |
| ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------ |
| BS-01   | AC-01     | Open `/books` without authentication; compare catalogue entries with the API by book identity; check title, author, publisher, and selectable title. Include all result pages if paginated. | Partial: `Get all books` checks API status `200` and a non-empty books array; no UI assertions exist. | `@ui @smoke`       |
| BS-02   | AC-02     | Search by a full title, title fragment, and a changed-case version; compare the complete result set with the expected title-or-author matches.                                              | Missing.                                                                                              | `@ui @regression`  |
| BS-03   | AC-03     | Search by a full author name, author fragment, and a changed-case version; assert all and only the expected matches.                                                                        | Missing.                                                                                              | `@ui @regression`  |
| BS-04   | AC-04     | Use a query verified to match no catalogue title or author; assert zero book rows, visible empty-results indication, and editable search field.                                             | Missing.                                                                                              | `@ui @regression`  |
| BS-05   | AC-05     | Clear a matching query and, independently, a non-matching query; compare the restored catalogue with its original book identities.                                                          | Missing.                                                                                              | `@ui @regression`  |
| BS-06   | AC-06     | Open a selected book from both unfiltered and filtered results without authentication; compare every displayed detail field with the API response for its ISBN.                             | Missing: the API helper exists, but no valid-ISBN detail test or UI detail assertions exist.          | `@ui @smoke`       |
| BS-07   | AC-07     | Return from details to the catalogue, search again, and open a different book; assert the new book's identity.                                                                              | Missing.                                                                                              | `@ui @regression`  |
| BS-08   | AC-08     | Retrieve an existing ISBN without authentication; assert status `200`, matching ISBN, and matching detail fields. Request `nonExistentIsbn`; assert status `400` and no valid book details. | Partial: `Should return 400 for non-existent ISBN` asserts only the negative response status.         | `@api @regression` |

## Implementation notes for coverage

- Add a `BookStorePage` page object, register it in `fixtures/index.ts`, and add `tests/book-store.spec.ts` following the existing Page Object Model and fixture conventions.
- Reuse the canonical `BookStoreApi` class and its `getBookByIsbn()` method.
- Obtain current catalogue data through `bookStoreApi.getAllBooks()` and assert a successful response before deriving test data. Avoid depending on catalogue order or hard-coded book titles.
- Derive expected search results from all catalogue entries using the same title-or-author, case-insensitive matching rule defined above. Choose non-empty fragments and verify that test queries exercise filtering.
- Identify the selected book by ISBN; do not rely solely on the first row or a potentially non-unique title.
- Compare complete result sets across pagination when applicable, excluding placeholders and empty rows.
- Use fresh page state for each scenario. These read-only scenarios should not use `authorizedUser`, create accounts, or mutate collections.
- Compare publication dates and page counts by value, allowing documented UI formatting differences.

## Definition of done

- All eight acceptance criteria have automated coverage, including both search fields, case variants, both clear-search starting states, and both detail-entry paths.
- Proposed UI assumptions are checked against the application and any differences are resolved in the story before coverage is marked complete.
- New UI coverage and the existing Book Store API suite pass in the configured Chromium project, with no skipped story scenarios.
- Coverage status is updated with execution evidence after implementation.

Targeted execution after implementation:

```bash
npx playwright test tests/book-store.spec.ts tests/book-store-api.spec.ts --project=chromium
```

This story documents required coverage only. No tests were added or executed as part of drafting it.
