# US-001: Manage Web Table Records

**Status:** Draft — acceptance criteria and test coverage defined

## User story

As a user of the DemoQA Web Tables page, I want to add, update, and delete records so that I can keep the displayed information accurate.

## Scope and assumptions

- Feature: `/webtables`; selected because the repository already contains tests for its record lifecycle.
- Record fields: first name, last name, email, age, salary, and department.
- Changes apply to the current page session. Persistence after refresh is outside this story.
- Test records use an email distinct from other records in the scenario so that assertions identify the intended row.
- Required-field and email validation below are proposed acceptance requirements; they have not been verified against the application.

## Acceptance criteria

### AC-01: Add a valid record

Given the Web Tables page is open, when I enter valid values in all six fields and submit the registration form, then the form closes and exactly one new row displays those values in their corresponding columns. Existing rows remain unchanged.

### AC-02: Update an existing record

Given a record exists, when I edit its first name and salary and submit, then the form closes and the same record displays the updated values. Its last name, email, age, and department remain unchanged, the total record count stays the same, and other records remain unchanged.

### AC-03: Delete an existing record

Given a record exists, when I activate its delete control, then that row and its action controls are removed, the total record count decreases by one, and other records remain unchanged.

### AC-04: Reject a missing required field

Given the registration form is open, when I leave any one required field empty and submit, then submission is blocked, the form stays open, the invalid field is identified, and no record is added. Exercise each of the six fields independently with otherwise valid values.

### AC-05: Reject an invalid email

Given the registration form is open with otherwise valid values, when I enter `not-an-email` and submit, then submission is blocked, the form stays open, the email field is identified as invalid, and no record is added.

## Explicit test coverage

Existing tests are in `tests/web-tables.spec.ts`. “Partial” describes assertions present in the source; it does not indicate a passing execution.

| Test ID | Criterion | Scenario and data                                                                     | Required assertions                                                                                                                | Current coverage                                                                                                                                                                                                                           | Tags              |
| ------- | --------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| WT-01   | AC-01     | Add `webTableUser` from `tests/test-data.ts`.                                         | Modal hidden; record count increases by one; exactly one row matches the email; all six column values match; other rows unchanged. | Partial: `Should add new record to the table and check it` checks that the last row contains all six values. The page helper waits for the modal to close. Count, exact column values, row identity, and other rows are not asserted.      | `@ui @regression` |
| WT-02   | AC-02     | Add `webTableUser`, then apply `updatedWebTableUser` (`Johnny`, salary `60000`).      | Modal hidden; updated values match; four unedited fields unchanged; record count unchanged; other rows unchanged.                  | Partial: `Should edit an existing record by email` checks the updated values in the row matched by the original email. The page helper waits for the modal to close. Remaining fields, counts, and other rows are not explicitly asserted. | `@ui @regression` |
| WT-03   | AC-03     | Add `webTableUser`, then delete the row matched by its email.                         | Matching row and delete control absent; record count decreases by one; other rows unchanged.                                       | Partial: `Should delete record and verify it is removed` asserts zero matching rows and zero matching delete controls. Total count and other rows are not asserted.                                                                        | `@ui @regression` |
| WT-04   | AC-04     | Six independent cases: omit first name, last name, email, age, salary, or department. | Modal remains visible; omitted field is invalid; record count unchanged; no new row.                                               | Missing: no required-field validation tests exist in this suite.                                                                                                                                                                           | `@ui @regression` |
| WT-05   | AC-05     | Add otherwise valid data with email `not-an-email`.                                   | Modal remains visible; email is invalid; record count unchanged; no new row.                                                       | Missing: no invalid-email test exists in this suite.                                                                                                                                                                                       | `@ui @regression` |

## Implementation notes for coverage

- Capture row counts and unaffected record values before each mutation.
- Assert values by column on the intended row instead of matching substrings in the last row.
- Validation tests must submit without using `addNewRecord` unchanged: that helper waits for the modal to close, which is inappropriate for rejected submissions.
- Use isolated page state and unique test data for each scenario.

## Definition of done

- All five acceptance criteria have automated coverage, including all six WT-04 cases.
- Existing partial tests are strengthened to include every required assertion in the matrix.
- The targeted suite passes in the configured Chromium project, with no skipped story scenarios.
- Coverage status is updated with execution evidence after implementation.

Targeted execution after implementation:

```bash
npx playwright test tests/web-tables.spec.ts --project=chromium
```

This story documents required coverage only. No tests were added or executed as part of drafting it.
