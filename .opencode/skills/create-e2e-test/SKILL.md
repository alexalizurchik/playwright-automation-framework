---
name: create-e2e-test
description: >
  Use when the user asks you to generate Playwright E2E tests from a user story
  in this automation framework. Use for creating positive and negative test scenarios,
  inspecting pages from baseURL, finding or creating Page Object classes,
  collecting locators, adding methods, writing spec files, and validating tests.
  Do NOT use for general Playwright questions or debugging existing tests
  without a user story.
---

# Create E2E Test

## Goal

Generate maintainable Playwright JavaScript tests from a user story using the project's existing framework style.

The expected output is usually:
- updated or new `pages/*Page.js`
- updated or new `tests/*.spec.js`
- optionally updated `tests/test-data.js`
- verified test discovery and a focused test run

## Workflow

1. **Understand the user story**
   - Identify the feature/page, positive scenario, negative scenario, input data, expected result, and validation rules.
   - If a required detail is missing but can be discovered from the app, inspect the app instead of asking.
   - Ask a short clarification only when the story is ambiguous enough that generating tests would be unsafe.

2. **Inspect the project**
   - Read `playwright.config.js` to find `baseURL`.
   - Read `tests/fixtures.js`, existing `pages/*Page.js`, `tests/*.spec.js`, and `tests/test-data.js`.
   - Follow existing CommonJS style: `require(...)`, `module.exports`, JS files.
   - Preserve current fixture and Page Object conventions.

3. **Open and analyze the site**
   - Use the Browser plugin/in-app browser when available to open the relevant page under the configured `baseURL`.
   - Inspect the UI behavior manually: fields, buttons, validation messages, dynamic states, modals, navigation, and network/API effects if relevant.
   - Prefer user-facing Playwright locators: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`.
   - Use CSS locators only when semantic locators are not stable or not available.

4. **Find or create the Page Object**
   - If a relevant class already exists, extend it.
   - If not, create a new class in `pages/<Feature>Page.js`.
   - Add a fixture in `tests/fixtures.js` for a new Page Object.
   - Keep locators inside the Page Object. Tests should not access page internals like button locators directly.

5. **Model behavior at the right level**
   - Page Object methods should represent user actions and page assertions, not raw click chains in tests.
   - Keep public Page Object methods business-readable, for example:
     - `open()`
     - `submitValidForm(userData)`
     - `submitInvalidForm(userData)`
     - `checkSubmissionResult(expectedData)`
     - `checkRequiredFieldValidation()`
   - Private helper-style methods may use a leading underscore.

6. **Write positive and negative tests**
   - Add tests to the matching feature spec, for example `tests/forms.spec.js`.
   - Create a new spec file only when no matching feature file exists.
   - Positive test: verify the happy path from the story.
   - Negative test: verify the most meaningful failure path, such as invalid input, missing required field, unauthorized state, or rejected server response.
   - Use `tests/test-data.js` for reusable data. Keep one-off expected strings inside the spec if that is clearer.

7. **Keep tests isolated**
   - Use fixtures for setup and teardown.
   - For API-backed setup, prefer API setup + UI validation when it makes the UI test faster and more stable.
   - Clean up created server-side data where an API exists.
   - Do not rely on ordering between tests.

8. **Validate**
   - Run `npx playwright test --list` after structural changes.
   - Run the focused new/changed spec or `--grep` for the new scenario.
   - If browser or network execution fails due to sandbox restrictions, rerun with the required approval.
   - Report any external app flakiness separately from framework/code failures.

## Project-Specific Conventions

- Use JavaScript, not TypeScript.
- Use CommonJS imports and exports.
- Put Page Objects in `pages/`.
- Put specs in `tests/`.
- Put shared data in `tests/test-data.js`.
- Register every new Page Object fixture in `tests/fixtures.js`.
- Use `baseURL` from `playwright.config.js`; do not hardcode the host in Page Objects.
- Keep screenshots/videos/traces controlled by Playwright config, not ad hoc code.
- Do not add a generic framework abstraction unless it removes real duplication.

## Output Quality Checklist

Before finishing:
- The relevant Page Object exists and hides its locators.
- The spec contains both a positive and a negative scenario.
- The test names describe behavior, not implementation.
- Test data is not duplicated unnecessarily.
- `npx playwright test --list` succeeds.
- A focused Playwright run for the changed tests succeeds or the blocker is clearly explained.

## References

- Base directory for this skill: `/Users/alexandrina/Documents/projects/playwright-automation-framework`
- Existing Page Objects: `pages/*Page.js`
- Existing test fixtures: `tests/fixtures.js`
- Existing test specs: `tests/*.spec.js`
- Existing test data: `tests/test-data.js`
- Playwright config: `playwright.config.js`
