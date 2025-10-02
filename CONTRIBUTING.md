# Contributing to the Cypress Test Automation Framework

## Framework Architecture

This framework follows a layered architecture pattern:

```
Tests (cypress/e2e/)
    ↓
Page Objects (cypress/pages/)
    ↓
Custom Commands (cypress/support/)
    ↓
Utilities (cypress/utils/)
    ↓
Fixtures (cypress/fixtures/)
```

## Adding New Tests

### 1. Create a Test File

Create a new test file in `cypress/e2e/` with the `.cy.js` extension:

```javascript
// cypress/e2e/newFeature.cy.js
import { NewPage } from '../pages'

describe('New Feature', () => {
  let newPage
  
  beforeEach(() => {
    newPage = new NewPage()
    newPage.visit()
  })
  
  it('should test new functionality', () => {
    // Your test code here
  })
})
```

### 2. Follow Naming Conventions

- Test files: `featureName.cy.js`
- Test suites: `describe('Feature Name', ...)`
- Test cases: `it('should do something specific', ...)`

### 3. Use AAA Pattern

Structure tests using Arrange-Act-Assert:

```javascript
it('should login successfully', () => {
  // Arrange
  const username = 'testuser'
  const password = 'password123'
  
  // Act
  loginPage.login(username, password)
  
  // Assert
  homePage.shouldBeDisplayed()
})
```

## Adding New Page Objects

### 1. Create a Page Object Class

Create a new file in `cypress/pages/`:

```javascript
// cypress/pages/NewPage.js
import BasePage from './BasePage'

class NewPage extends BasePage {
  constructor() {
    super()
    this.selectors = {
      mainElement: '[data-test="main-element"]',
      submitButton: '[data-test="submit-button"]',
    }
  }
  
  visit() {
    super.visit('/new-page')
    return this
  }
  
  clickSubmit() {
    this.click(this.selectors.submitButton)
    return this
  }
  
  shouldBeDisplayed() {
    this.shouldBeVisible(this.selectors.mainElement)
    return this
  }
}

export default NewPage
```

### 2. Export from Index

Add to `cypress/pages/index.js`:

```javascript
import NewPage from './NewPage'

export {
  BasePage,
  LoginPage,
  HomePage,
  NewPage, // Add this
}
```

### 3. Page Object Best Practices

- **Extend BasePage**: Always extend from BasePage to inherit common methods
- **Use selectors object**: Define all selectors in the constructor
- **Return this**: Return `this` from methods to enable chaining
- **Prefer data attributes**: Use `data-test` or `data-cy` attributes
- **Single responsibility**: Each method should do one thing
- **Descriptive names**: Use clear, action-oriented method names

## Adding Custom Commands

Add new commands to `cypress/support/commands.js`:

```javascript
/**
 * Custom command description
 * @example cy.myCustomCommand(param)
 */
Cypress.Commands.add('myCustomCommand', (param) => {
  // Command implementation
})
```

### Command Best Practices

- **Document**: Add JSDoc comments for all commands
- **Chain-friendly**: Make commands chainable when possible
- **Reusable**: Commands should be generic and reusable
- **Test thoroughly**: Test custom commands before using widely

## Adding Utility Functions

Add new utilities to appropriate file in `cypress/utils/`:

```javascript
// cypress/utils/stringUtils.js

/**
 * Function description
 * @param {type} param - Parameter description
 * @returns {type} Return value description
 */
export const myUtilFunction = (param) => {
  // Implementation
}
```

### Creating a New Utility Category

1. Create new file: `cypress/utils/newCategory.js`
2. Export functions from the file
3. Add to `cypress/utils/index.js`:

```javascript
import * as newCategory from './newCategory'

export {
  stringUtils,
  apiUtils,
  testDataUtils,
  newCategory, // Add this
}
```

## Adding Test Data

### 1. JSON Fixtures

Add new fixture files in `cypress/fixtures/`:

```json
// cypress/fixtures/newData.json
{
  "data": {
    "field1": "value1",
    "field2": "value2"
  }
}
```

### 2. Loading Fixtures in Tests

```javascript
before(() => {
  cy.fixture('newData').then((data) => {
    // Use data in tests
  })
})
```

## Code Style Guidelines

### JavaScript Style

- Use ES6+ features (arrow functions, destructuring, etc.)
- Use `const` and `let`, not `var`
- Use template literals for strings with variables
- Use meaningful variable and function names
- Add comments for complex logic

### Test Style

```javascript
// Good
it('should display error message when login fails', () => {
  // Test code
})

// Bad
it('test1', () => {
  // Test code
})
```

### Selectors

```javascript
// Preferred
'[data-test="element-id"]'
'[data-cy="element-id"]'

// Acceptable
'#element-id'
'.class-name'

// Avoid
'div > ul > li:nth-child(3)'
```

## API Testing

### Intercepting APIs

```javascript
it('should test API', () => {
  // Setup intercept
  cy.intercept('GET', '/api/endpoint', {
    statusCode: 200,
    body: { data: [] }
  }).as('apiCall')
  
  // Trigger API call
  cy.visit('/page')
  
  // Wait and verify
  cy.wait('@apiCall').then((interception) => {
    expect(interception.response.statusCode).to.equal(200)
  })
})
```

### Multiple Intercepts

```javascript
import { apiUtils } from '../utils'

const endpoints = [
  { method: 'GET', url: '/api/users', alias: 'getUsers' },
  { method: 'GET', url: '/api/products', alias: 'getProducts' },
]

apiUtils.setupApiIntercepts(endpoints)
cy.visit('/dashboard')
apiUtils.waitForApis(['getUsers', 'getProducts'])
```

## Debugging Tests

### Using Cypress Commands

```javascript
cy.debug()        // Pause and open DevTools
cy.pause()        // Pause test execution
cy.log('message') // Log to command log
```

### Debug in Test

```javascript
it('should debug test', () => {
  cy.get('button').then(($button) => {
    debugger // Stops execution if DevTools is open
  })
})
```

### Screenshots

```javascript
cy.screenshot('my-screenshot')
cy.get('.element').screenshot('element-screenshot')
```

## Testing the Framework

### Verify Installation

```bash
npm run cypress:verify
```

### Syntax Check

```bash
node --check cypress.config.js
node --check cypress/pages/NewPage.js
```

### Run Specific Tests

```bash
npm run test:spec cypress/e2e/login.cy.js
```

## Git Workflow

1. Create a feature branch
2. Make your changes
3. Test your changes locally
4. Commit with descriptive messages
5. Push and create pull request

### Commit Message Format

```
[Type] Brief description

- Detailed change 1
- Detailed change 2

Types: feat, fix, docs, refactor, test, chore
```

## Review Checklist

Before submitting a pull request:

- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Page objects use data attributes
- [ ] Methods return `this` for chaining
- [ ] Utility functions are documented
- [ ] Test data in fixtures

## Common Patterns

### Login Pattern

```javascript
beforeEach(() => {
  cy.login('username', 'password')
  cy.visit('/protected-page')
})
```

### Data-Driven Testing

```javascript
const testData = [
  { input: 'test1', expected: 'result1' },
  { input: 'test2', expected: 'result2' },
]

testData.forEach(({ input, expected }) => {
  it(`should handle ${input}`, () => {
    // Test with data
  })
})
```

### Conditional Testing

```javascript
it('should handle element conditionally', () => {
  cy.get('body').then(($body) => {
    if ($body.find('.optional-element').length) {
      cy.get('.optional-element').click()
    }
  })
})
```

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Pattern](https://martinfowler.com/bliki/PageObject.html)

## Questions?

For questions or discussions:
1. Check existing documentation
2. Review similar implementations in the codebase
3. Open an issue for clarification
4. Reach out to the team

Thank you for contributing! 🎉
