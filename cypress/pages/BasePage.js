/**
 * Base Page Object Model
 * Contains common methods that can be used by all page objects
 */
class BasePage {
  /**
   * Visit a page
   * @param {string} url - The URL to visit
   */
  visit(url = '') {
    cy.visit(url)
    return this
  }

  /**
   * Get element by selector
   * @param {string} selector - CSS selector
   */
  getElement(selector) {
    return cy.get(selector)
  }

  /**
   * Get element by data-test attribute
   * @param {string} testId - data-test attribute value
   */
  getByTestId(testId) {
    return cy.getByTestId(testId)
  }

  /**
   * Get element by data-cy attribute
   * @param {string} selector - data-cy attribute value
   */
  getByCy(selector) {
    return cy.getByCy(selector)
  }

  /**
   * Click on element
   * @param {string} selector - CSS selector
   */
  click(selector) {
    this.getElement(selector).click()
    return this
  }

  /**
   * Type text into input field
   * @param {string} selector - CSS selector
   * @param {string} text - Text to type
   */
  type(selector, text) {
    this.getElement(selector).clear().type(text)
    return this
  }

  /**
   * Check if element is visible
   * @param {string} selector - CSS selector
   */
  shouldBeVisible(selector) {
    this.getElement(selector).should('be.visible')
    return this
  }

  /**
   * Check if element contains text
   * @param {string} selector - CSS selector
   * @param {string} text - Expected text
   */
  shouldContainText(selector, text) {
    this.getElement(selector).should('contain.text', text)
    return this
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - CSS selector
   * @param {number} timeout - Timeout in milliseconds
   */
  waitForElement(selector, timeout = 10000) {
    this.getElement(selector).should('be.visible', { timeout })
    return this
  }

  /**
   * Get page title
   */
  getTitle() {
    return cy.title()
  }

  /**
   * Get current URL
   */
  getCurrentUrl() {
    return cy.url()
  }

  /**
   * Wait for URL to contain text
   * @param {string} text - Text that URL should contain
   */
  urlShouldContain(text) {
    cy.url().should('include', text)
    return this
  }

  /**
   * Wait for page to load
   */
  waitForPageLoad() {
    cy.document().its('readyState').should('eq', 'complete')
    return this
  }
}

export default BasePage
