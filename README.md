# Cypress Test Automation Framework

A well-structured Cypress test automation framework with page object models, utility functions, and reusable components.

## GitHub Copilot prompt used to create this repository's content

```
Create a Cypress test automation framework for a web application. The framework should include:

1.  **Project Structure:** Organize tests, page objects, and utility functions in a clear and maintainable directory structure.

```

## 📁 Project Structure

```
test_repo/
├── cypress/
│   ├── e2e/                    # Test files
│   │   ├── login.cy.js         # Login functionality tests
│   │   ├── home.cy.js          # Home page tests
│   │   └── api.cy.js           # API testing examples
│   ├── fixtures/               # Test data
│   │   ├── users.json          # User test data
│   │   ├── products.json       # Product test data
│   │   └── api.json            # API configurations
│   ├── pages/                  # Page Object Models
│   │   ├── BasePage.js         # Base page with common methods
│   │   ├── LoginPage.js        # Login page object
│   │   ├── HomePage.js         # Home page object
│   │   └── index.js            # Page objects export
│   ├── support/                # Support files
│   │   ├── commands.js         # Custom Cypress commands
│   │   └── e2e.js              # Global configuration
│   └── utils/                  # Utility functions
│       ├── stringUtils.js      # String manipulation utilities
│       ├── apiUtils.js         # API testing utilities
│       ├── testDataUtils.js    # Test data generation utilities
│       └── index.js            # Utils export
├── cypress.config.js           # Cypress configuration
├── package.json                # Project dependencies
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test_repo
```

2. Install dependencies:
```bash
npm install
```

3. Verify Cypress installation:
```bash
npm run cypress:verify
```

## 🧪 Running Tests

### Open Cypress Test Runner (Interactive Mode)

```bash
npm run cypress:open
```

### Run Tests in Headless Mode

```bash
npm test
# or
npm run cypress:run
```

### Run Tests in Specific Browser

```bash
npm run test:chrome    # Run in Chrome
npm run test:firefox   # Run in Firefox
npm run test:edge      # Run in Edge
```

### Run Tests in Headed Mode

```bash
npm run test:headed
```

### Run Specific Test File

```bash
npm run test:spec cypress/e2e/login.cy.js
```

## 📚 Framework Features

### Page Object Model (POM)

The framework uses Page Object Model pattern for better maintainability:

- **BasePage.js**: Contains common methods used across all pages
- **LoginPage.js**: Login page specific methods and selectors
- **HomePage.js**: Home page specific methods and selectors

Example usage:
```javascript
import { LoginPage } from '../pages'

const loginPage = new LoginPage()
loginPage.visit()
  .login('username', 'password')
  .shouldBeLoggedIn()
```

### Custom Commands

Located in `cypress/support/commands.js`:

- `cy.login(username, password)` - Login with session management
- `cy.getByTestId(testId)` - Get element by data-test attribute
- `cy.getByCy(selector)` - Get element by data-cy attribute
- `cy.shouldBeClickable()` - Verify element is visible and enabled
- `cy.waitForApi(alias)` - Wait for API response
- `cy.setLocalStorage(key, value)` - Set local storage item
- `cy.getLocalStorage(key)` - Get local storage item

### Utility Functions

**String Utils** (`cypress/utils/stringUtils.js`):
- `generateRandomString(length)` - Generate random string
- `generateRandomEmail(domain)` - Generate random email
- `generateRandomNumber(min, max)` - Generate random number
- `formatDate(date, format)` - Format date to string

**API Utils** (`cypress/utils/apiUtils.js`):
- `apiRequest(method, url, options, retries)` - Make API request with retry
- `setupApiIntercepts(endpoints)` - Setup multiple API intercepts
- `waitForApis(aliases)` - Wait for multiple API calls
- `verifyResponseStatus(response, expectedStatus)` - Verify API status
- `extractFromResponse(response, path)` - Extract value from response

**Test Data Utils** (`cypress/utils/testDataUtils.js`):
- `loadFixture(fixturePath)` - Load fixture data
- `generateUserData(overrides)` - Generate user test data
- `generateProductData(overrides)` - Generate product test data
- `getRandomItem(array)` - Get random item from array

### Fixtures

Test data is stored in JSON files under `cypress/fixtures/`:

- `users.json` - User credentials and data
- `products.json` - Product information
- `api.json` - API endpoints and mock responses

## 🔧 Configuration

The framework configuration is in `cypress.config.js`:

```javascript
{
  baseUrl: 'https://example.cypress.io',  // Base URL for tests
  viewportWidth: 1280,                     // Browser width
  viewportHeight: 720,                     // Browser height
  defaultCommandTimeout: 10000,            // Command timeout
  video: true,                             // Record videos
  screenshotOnRunFailure: true,           // Take screenshots on failure
  retries: { runMode: 2, openMode: 0 }   // Test retries
}
```

## 📝 Writing Tests

### Basic Test Structure

```javascript
import { LoginPage, HomePage } from '../pages'

describe('Feature Name', () => {
  let loginPage
  let homePage

  before(() => {
    // Runs once before all tests
    cy.fixture('users').then((users) => {
      // Load test data
    })
  })

  beforeEach(() => {
    // Runs before each test
    loginPage = new LoginPage()
    homePage = new HomePage()
    loginPage.visit()
  })

  it('should perform action', () => {
    // Test steps
    loginPage
      .login('username', 'password')
      .shouldBeLoggedIn()
    
    homePage.shouldBeDisplayed()
  })

  afterEach(() => {
    // Runs after each test
  })

  after(() => {
    // Runs once after all tests
  })
})
```

### API Testing Example

```javascript
import { apiUtils } from '../utils'

describe('API Tests', () => {
  it('should mock API response', () => {
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: { users: [] }
    }).as('getUsers')

    cy.visit('/users')
    cy.wait('@getUsers')
  })
})
```

## 🎯 Best Practices

1. **Use Page Objects**: Keep test logic in page objects, not in test files
2. **Use Custom Commands**: Create reusable commands for common operations
3. **Use Fixtures**: Store test data in fixtures for better maintainability
4. **Use Data Attributes**: Prefer `data-test` or `data-cy` attributes for selectors
5. **Keep Tests Independent**: Each test should be able to run independently
6. **Use Meaningful Names**: Use descriptive names for tests and variables
7. **Clean Up**: Reset state between tests using `beforeEach` and `afterEach`
8. **Don't Use Fixed Waits**: Use Cypress's built-in retry-ability instead of `cy.wait(time)`

## 🐛 Debugging

### Run Tests in Debug Mode

```bash
DEBUG=cypress:* npm run cypress:open
```

### Use Cypress Debug Commands

```javascript
cy.debug()        // Pause test execution
cy.pause()        // Pause and allow stepping through commands
cy.log('message') // Log message to command log
```

### View Test Artifacts

- Videos: `cypress/videos/`
- Screenshots: `cypress/screenshots/`
- Downloads: `cypress/downloads/`

## 📊 Reporting

Test results are displayed in the console. For CI/CD integration, consider adding:

- Mochawesome Reporter
- Cypress Dashboard
- Allure Reporter

## 🤝 Contributing

1. Create a new branch for your feature
2. Follow the existing code structure and naming conventions
3. Add tests for new functionality
4. Update documentation as needed
5. Submit a pull request

## 📄 License

ISC

## 📞 Support

For questions or issues, please open an issue in the repository.