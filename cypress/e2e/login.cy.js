import { LoginPage, HomePage } from '../pages'

describe('Login Functionality', () => {
  let loginPage
  let homePage
  let testUsers

  before(() => {
    // Load test data
    cy.fixture('users').then((users) => {
      testUsers = users
    })
  })

  beforeEach(() => {
    // Initialize page objects
    loginPage = new LoginPage()
    homePage = new HomePage()
    
    // Visit login page before each test
    loginPage.visit()
  })

  it('should display login form', () => {
    loginPage
      .shouldShowLoginForm()
      .shouldBeVisible(loginPage.selectors.usernameInput)
      .shouldBeVisible(loginPage.selectors.passwordInput)
      .shouldBeVisible(loginPage.selectors.loginButton)
  })

  it('should successfully login with valid credentials', () => {
    loginPage
      .login(testUsers.validUser.username, testUsers.validUser.password)
      .shouldBeLoggedIn()
    
    // Verify home page is displayed
    homePage.shouldBeDisplayed()
  })

  it('should show error message with invalid credentials', () => {
    loginPage
      .login(testUsers.invalidUser.username, testUsers.invalidUser.password)
      .shouldShowError('Invalid credentials')
  })

  it('should not login with empty username', () => {
    loginPage
      .enterPassword(testUsers.validUser.password)
      .clickLoginButton()
    
    // Verify still on login page
    cy.url().should('include', '/login')
  })

  it('should not login with empty password', () => {
    loginPage
      .enterUsername(testUsers.validUser.username)
      .clickLoginButton()
    
    // Verify still on login page
    cy.url().should('include', '/login')
  })

  it('should allow typing in username field', () => {
    const username = 'testuser123'
    loginPage.enterUsername(username)
    loginPage.getElement(loginPage.selectors.usernameInput)
      .should('have.value', username)
  })

  it('should mask password field', () => {
    loginPage.enterPassword('password123')
    loginPage.getElement(loginPage.selectors.passwordInput)
      .should('have.attr', 'type', 'password')
  })
})
