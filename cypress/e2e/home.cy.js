import { HomePage } from '../pages'
import { stringUtils, testDataUtils } from '../utils'

describe('Home Page Functionality', () => {
  let homePage
  let testUsers

  before(() => {
    cy.fixture('users').then((users) => {
      testUsers = users
    })
  })

  beforeEach(() => {
    homePage = new HomePage()
    
    // Login before accessing home page
    cy.login(testUsers.validUser.username, testUsers.validUser.password)
    homePage.visit()
  })

  it('should display home page after login', () => {
    homePage
      .shouldBeDisplayed()
      .shouldShowNavigationMenu()
  })

  it('should display welcome message', () => {
    homePage.shouldShowWelcomeMessage(testUsers.validUser.firstName)
  })

  it('should allow user to logout', () => {
    homePage.logout()
    
    // Verify redirected to login page
    cy.url().should('include', '/login')
  })

  it('should navigate to different sections', () => {
    const sections = ['Dashboard', 'Products', 'Orders', 'Profile']
    
    sections.forEach((section) => {
      homePage.navigateToSection(section)
      cy.url().should('include', section.toLowerCase())
    })
  })

  it('should display user profile on click', () => {
    homePage.clickUserProfile()
    
    // Verify profile modal or page is displayed
    cy.contains(testUsers.validUser.email).should('be.visible')
  })

  it('should generate random test data using utilities', () => {
    const randomString = stringUtils.generateRandomString(10)
    const randomEmail = stringUtils.generateRandomEmail()
    
    expect(randomString).to.have.length(10)
    expect(randomEmail).to.include('@example.com')
  })

  it('should use test data utilities', () => {
    const userData = testDataUtils.generateUserData({
      firstName: 'Custom',
      lastName: 'Name',
    })
    
    expect(userData.firstName).to.equal('Custom')
    expect(userData.lastName).to.equal('Name')
    expect(userData.username).to.include('testuser_')
  })
})
