import BasePage from './BasePage'

/**
 * Login Page Object Model
 * Represents the login page and its elements
 */
class LoginPage extends BasePage {
  constructor() {
    super()
    // Define selectors
    this.selectors = {
      usernameInput: '[data-test="username"]',
      passwordInput: '[data-test="password"]',
      loginButton: '[data-test="login-button"]',
      errorMessage: '[data-test="error-message"]',
      loginForm: '[data-test="login-form"]',
    }
  }

  /**
   * Visit the login page
   */
  visit() {
    super.visit('/login')
    return this
  }

  /**
   * Enter username
   * @param {string} username - Username to enter
   */
  enterUsername(username) {
    this.type(this.selectors.usernameInput, username)
    return this
  }

  /**
   * Enter password
   * @param {string} password - Password to enter
   */
  enterPassword(password) {
    this.type(this.selectors.passwordInput, password)
    return this
  }

  /**
   * Click login button
   */
  clickLoginButton() {
    this.click(this.selectors.loginButton)
    return this
  }

  /**
   * Perform login with credentials
   * @param {string} username - Username
   * @param {string} password - Password
   */
  login(username, password) {
    this.enterUsername(username)
    this.enterPassword(password)
    this.clickLoginButton()
    return this
  }

  /**
   * Verify error message is displayed
   * @param {string} message - Expected error message
   */
  shouldShowError(message) {
    this.shouldBeVisible(this.selectors.errorMessage)
    this.shouldContainText(this.selectors.errorMessage, message)
    return this
  }

  /**
   * Verify login form is visible
   */
  shouldShowLoginForm() {
    this.shouldBeVisible(this.selectors.loginForm)
    return this
  }

  /**
   * Verify successful login by checking URL
   */
  shouldBeLoggedIn() {
    cy.url().should('not.include', '/login')
    return this
  }
}

export default LoginPage
