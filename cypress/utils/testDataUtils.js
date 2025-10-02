/**
 * Test Data Utilities
 * Helper functions for managing test data
 */

/**
 * Load fixture data
 * @param {string} fixturePath - Path to fixture file
 * @returns {Cypress.Chainable} Cypress chainable with fixture data
 */
export const loadFixture = (fixturePath) => {
  return cy.fixture(fixturePath)
}

/**
 * Generate test user data
 * @param {object} overrides - Properties to override
 * @returns {object} User data object
 */
export const generateUserData = (overrides = {}) => {
  const timestamp = Date.now()
  return {
    username: `testuser_${timestamp}`,
    email: `testuser_${timestamp}@example.com`,
    password: 'Test@1234',
    firstName: 'Test',
    lastName: 'User',
    ...overrides,
  }
}

/**
 * Generate test product data
 * @param {object} overrides - Properties to override
 * @returns {object} Product data object
 */
export const generateProductData = (overrides = {}) => {
  const timestamp = Date.now()
  return {
    name: `Test Product ${timestamp}`,
    description: 'This is a test product',
    price: 99.99,
    category: 'Electronics',
    inStock: true,
    quantity: 100,
    ...overrides,
  }
}

/**
 * Deep clone object
 * @param {object} obj - Object to clone
 * @returns {object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Merge test data with fixture
 * @param {object} fixtureData - Data from fixture
 * @param {object} testData - Test-specific data
 * @returns {object} Merged data
 */
export const mergeTestData = (fixtureData, testData) => {
  return { ...fixtureData, ...testData }
}

/**
 * Get random item from array
 * @param {Array} array - Array to select from
 * @returns {any} Random item
 */
export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Shuffle array
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
