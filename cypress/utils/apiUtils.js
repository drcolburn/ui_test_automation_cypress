/**
 * API Utilities
 * Helper functions for API testing
 */

/**
 * Make API request with retry logic
 * @param {string} method - HTTP method
 * @param {string} url - API endpoint
 * @param {object} options - Request options
 * @param {number} retries - Number of retries
 * @returns {Cypress.Chainable} Cypress chainable
 */
export const apiRequest = (method, url, options = {}, retries = 3) => {
  const makeRequest = (attemptsLeft) => {
    return cy.request({
      method,
      url,
      failOnStatusCode: false,
      ...options,
    }).then((response) => {
      if (response.status >= 500 && attemptsLeft > 0) {
        cy.wait(1000)
        return makeRequest(attemptsLeft - 1)
      }
      return response
    })
  }
  
  return makeRequest(retries)
}

/**
 * Setup API intercepts
 * @param {Array} endpoints - Array of endpoint configurations
 */
export const setupApiIntercepts = (endpoints) => {
  endpoints.forEach(({ method, url, alias, response }) => {
    if (response) {
      cy.intercept(method, url, response).as(alias)
    } else {
      cy.intercept(method, url).as(alias)
    }
  })
}

/**
 * Wait for multiple API calls
 * @param {Array} aliases - Array of API aliases to wait for
 * @param {number} timeout - Timeout in milliseconds
 */
export const waitForApis = (aliases, timeout = 10000) => {
  aliases.forEach((alias) => {
    cy.wait(`@${alias}`, { timeout })
  })
}

/**
 * Verify API response status
 * @param {object} response - API response
 * @param {number} expectedStatus - Expected status code
 */
export const verifyResponseStatus = (response, expectedStatus) => {
  expect(response.status).to.eq(expectedStatus)
}

/**
 * Verify API response body
 * @param {object} response - API response
 * @param {object} expectedBody - Expected response body
 */
export const verifyResponseBody = (response, expectedBody) => {
  expect(response.body).to.deep.equal(expectedBody)
}

/**
 * Extract value from API response
 * @param {object} response - API response
 * @param {string} path - Path to value (e.g., 'data.user.id')
 * @returns {any} Extracted value
 */
export const extractFromResponse = (response, path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], response)
}
