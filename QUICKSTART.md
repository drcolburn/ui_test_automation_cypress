# Cypress Test Automation Framework - Quick Start Guide

## Framework Overview

This Cypress test automation framework follows industry best practices with a modular and maintainable architecture.

## Key Components

### 1. Page Object Models (POM)
**Location:** `cypress/pages/`

Page Objects encapsulate page-specific elements and actions:

- **BasePage.js** - Base class with common methods
  - visit(), getElement(), click(), type()
  - shouldBeVisible(), shouldContainText()
  - waitForElement(), urlShouldContain()

- **LoginPage.js** - Login page specific
  - enterUsername(), enterPassword()
  - login(), shouldShowError()
  - shouldBeLoggedIn()

- **HomePage.js** - Home/Dashboard page
  - shouldBeDisplayed(), logout()
  - navigateToSection(), clickUserProfile()

### 2. Custom Commands
**Location:** `cypress/support/commands.js`

Reusable Cypress commands:
- `cy.login(username, password)` - Login with session
- `cy.getByTestId(testId)` - Get by data-test attribute
- `cy.getByCy(selector)` - Get by data-cy attribute
- `cy.shouldBeClickable()` - Verify clickable element
- `cy.waitForApi(alias)` - Wait for API
- `cy.setLocalStorage()` / `cy.getLocalStorage()` - Local storage helpers

### 3. Utility Functions
**Location:** `cypress/utils/`

Helper functions organized by category:

**stringUtils.js:**
- generateRandomString()
- generateRandomEmail()
- generateRandomNumber()
- formatDate()

**apiUtils.js:**
- apiRequest() - API call with retry
- setupApiIntercepts()
- waitForApis()
- verifyResponseStatus()
- extractFromResponse()

**testDataUtils.js:**
- generateUserData()
- generateProductData()
- loadFixture()
- getRandomItem()

### 4. Test Files
**Location:** `cypress/e2e/`

Organized by feature/functionality:
- **login.cy.js** - Login functionality tests
- **home.cy.js** - Home page tests
- **api.cy.js** - API testing examples

### 5. Fixtures
**Location:** `cypress/fixtures/`

Test data stored as JSON:
- **users.json** - User credentials
- **products.json** - Product data
- **api.json** - API endpoints and responses

## Quick Command Reference

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run all tests headless
npm test

# Run tests in Chrome
npm run test:chrome

# Run specific test file
npm run test:spec cypress/e2e/login.cy.js

# Run tests in headed mode (see browser)
npm run test:headed
```

## Test Writing Pattern

```javascript
import { LoginPage } from '../pages'

describe('Feature Name', () => {
  let loginPage
  
  beforeEach(() => {
    loginPage = new LoginPage()
    loginPage.visit()
  })
  
  it('should test something', () => {
    loginPage
      .enterUsername('testuser')
      .enterPassword('password')
      .clickLoginButton()
      .shouldBeLoggedIn()
  })
})
```

## Using Utilities in Tests

```javascript
import { stringUtils, testDataUtils } from '../utils'

it('should use utilities', () => {
  const email = stringUtils.generateRandomEmail()
  const userData = testDataUtils.generateUserData({
    email: email
  })
  
  // Use the generated data in your test
})
```

## API Testing Example

```javascript
it('should mock API', () => {
  cy.intercept('GET', '/api/users', {
    statusCode: 200,
    body: { users: [] }
  }).as('getUsers')
  
  cy.visit('/users')
  cy.wait('@getUsers')
})
```

## Configuration

**cypress.config.js** contains all framework settings:
- Base URL
- Timeouts
- Browser settings
- Video/Screenshot settings
- Retry configuration

## Framework Benefits

✅ **Maintainable** - Page objects separate test logic from UI
✅ **Reusable** - Custom commands and utilities reduce duplication
✅ **Scalable** - Clear structure supports growth
✅ **Data-Driven** - Fixtures enable data-driven testing
✅ **Organized** - Logical folder structure
✅ **Well-Documented** - Comprehensive README and code comments

## Next Steps

1. Update `cypress.config.js` with your application's base URL
2. Create page objects for your application pages
3. Write test scenarios in `cypress/e2e/`
4. Add test data to fixtures
5. Run tests and iterate

## Support

Refer to the main README.md for detailed documentation.
