import BasePage from './BasePage'

/**
 * Home Page Object Model
 * Represents the home/dashboard page
 */
class HomePage extends BasePage {
  constructor() {
    super()
    // Define selectors
    this.selectors = {
      header: '[data-test="header"]',
      welcomeMessage: '[data-test="welcome-message"]',
      logoutButton: '[data-test="logout-button"]',
      mainContent: '[data-test="main-content"]',
      navigationMenu: '[data-test="nav-menu"]',
      userProfile: '[data-test="user-profile"]',
    }
  }

  /**
   * Visit the home page
   */
  visit() {
    super.visit('/')
    return this
  }

  /**
   * Verify home page is displayed
   */
  shouldBeDisplayed() {
    this.shouldBeVisible(this.selectors.header)
    this.shouldBeVisible(this.selectors.mainContent)
    return this
  }

  /**
   * Verify welcome message
   * @param {string} username - Expected username in welcome message
   */
  shouldShowWelcomeMessage(username) {
    this.shouldBeVisible(this.selectors.welcomeMessage)
    if (username) {
      this.shouldContainText(this.selectors.welcomeMessage, username)
    }
    return this
  }

  /**
   * Click logout button
   */
  logout() {
    this.click(this.selectors.logoutButton)
    return this
  }

  /**
   * Navigate to section
   * @param {string} sectionName - Name of the section to navigate to
   */
  navigateToSection(sectionName) {
    cy.contains(this.selectors.navigationMenu, sectionName).click()
    return this
  }

  /**
   * Verify navigation menu is visible
   */
  shouldShowNavigationMenu() {
    this.shouldBeVisible(this.selectors.navigationMenu)
    return this
  }

  /**
   * Click on user profile
   */
  clickUserProfile() {
    this.click(this.selectors.userProfile)
    return this
  }
}

export default HomePage
