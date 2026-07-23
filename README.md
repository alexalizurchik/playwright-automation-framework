# Playwright Automation Framework

An end-to-end Playwright automation framework for UI and API testing of the DemoQA application.

## 🎯 Project Goals

This project was created to practice building a maintainable Playwright automation framework from scratch using modern automation practices, including:

- Page Object Model
- Custom Playwright fixtures
- API-driven test setup
- Hybrid UI/API testing
- CI/CD integration
- AI-assisted test generation workflows

## 🚀 Tech Stack

**Node.js** (v18+) · **Playwright Test** · **JavaScript** (CommonJS) · **dotenv**

## ✨ Features

- **Page Object Model**: Encapsulated page interactions using reusable Page Object classes and custom Playwright fixtures.
- **Hybrid Testing**: Combined UI and API workflows within the same Playwright test suite.
- **API-based Authentication**: Automated user creation, authentication and cleanup for isolated test execution.
- **Categorized Execution:** Fully tagged test suites (@smoke, @regression, @ui, @api) for selective execution.
- **Centralized Test Data**: Environment-based configuration with reusable test data fixtures.
- **Reporting:** Built-in HTML reports with traces, screenshots, and videos collected automatically on failure.
- **CI/CD Integration**: Configured for parallel execution, automatic retries and `forbidOnly` checks in CI environments.

## 📁 Project Structure

```
├── fixtures/            # Custom test.extend() wiring — auto-injects page objects & API auth lifecycle
│   └── index.js
├── pages/               # 12 Page Object classes (TextBoxPage, AlertsPage, FormsPage, etc.)
│   └── BookStoreApi.js  # API helper encapsulating Playwright's APIRequestContext
├── tests/
│   ├── test-data.js     # Shared test datasets & user payloads
│   └── *.spec.js        # Test suites covering UI, API, and Hybrid scenarios
├── test-assets/         # Static assets and media files for upload tests (e.g., test-image.png)
├── playwright.config.js # Global Playwright configuration
└── package.json
```

## ⚡ Quick Start

```bash
npm install
npx playwright install
npm test
```

## 🛠️ Commands

| Command                   | Description                                     |
| ------------------------- | ----------------------------------------------- |
| `npm test`                | Runs all tests in headless mode                 |
| `npm run test:headed`     | Runs tests with visible browser windows         |
| `npm run test:ui-mode`    | Opens Playwright Interactive UI Mode            |
| `npm run test:smoke`      | Runs only @smoke tagged tests                   |
| `npm run test:regression` | Runs only @regression tagged tests              |
| `npm run test:ui`         | Runs frontend UI tests                          |
| `npm run test:api`        | Runs backend API tests                          |
| `npm run report`          | Serves and opens the generated HTML test report |

## 🏗️ Architecture

Each page is implemented as a dedicated Page Object encapsulating locators, actions and assertions. Playwright's `test.extend()` (configured in `fixtures/index.js`) injects page instances directly into test arguments, reducing repetitive setup code.

An `authorizedUser` fixture manages the authentication lifecycle through API requests. It creates a temporary user, retrieves an access token, injects authorization headers and removes the user after test execution. This approach keeps tests isolated while reducing UI setup time.

## 🧪 What's Tested

The framework covers 12 functional modules across both UI and API layers, including positive and negative scenarios:

- **UI Components:** Text Box, Alerts, Windows, Practice Form, Frames & Nested Frames, Slider, Progress Bar, Drag & Drop, Dynamic Properties, Web Tables, Links.
- **API Layer:** Book Store Account & Collection CRUD operations (/Account/v1, /BookStore/v1).
- **Hybrid Scenarios:** Dynamic test state preparation via API with UI state validation.
