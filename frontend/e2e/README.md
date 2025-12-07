# End-to-End Testing with Playwright

This directory contains E2E tests for the CatalystBench Incident Application.

## Setup

1. Install dependencies (Playwright will be installed with npm install):
   ```bash
   cd frontend
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests
```bash
npm run test:e2e
```

### Run tests in UI mode (interactive)
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Run tests in debug mode
```bash
npm run test:e2e:debug
```

### Run specific test file
```bash
npx playwright test auth.spec.js
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
```

## Test Structure

- `auth.spec.js` - Authentication tests (login, register, navigation)
- `incidents.spec.js` - Incident management tests (CRUD operations)
- `navigation.spec.js` - Navigation and routing tests
- `utils.js` - Helper functions for tests

## Configuration

The Playwright configuration is in `playwright.config.js`. It:
- Automatically starts the dev server before tests
- Runs tests on Chromium, Firefox, and WebKit
- Generates HTML reports
- Takes screenshots on failure

## Environment Variables

Set `PLAYWRIGHT_TEST_BASE_URL` to test against a different URL:
```bash
PLAYWRIGHT_TEST_BASE_URL=https://your-app.onrender.com npm run test:e2e
```

## Backend Requirements

Some tests require a running backend. To run full E2E tests:

1. Start your backend server (or use your deployed backend URL)
2. Update the `VITE_API_URL` in your environment or test config
3. Uncomment the full E2E test cases in the test files

## Writing New Tests

1. Create a new `.spec.js` file in the `e2e` directory
2. Import test utilities from `utils.js`
3. Use Playwright's test API:
   ```javascript
   import { test, expect } from '@playwright/test';
   
   test('my test', async ({ page }) => {
     await page.goto('/');
     await expect(page.locator('h1')).toBeVisible();
   });
   ```

## Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

