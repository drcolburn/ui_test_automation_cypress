// ***********************************************
// This file is used to create custom Cypress commands
// and overwrite existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to login
 * @example cy.login('username', 'password')
 */
Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/login')
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.url().should('not.include', '/login')
  })
})

/**
 * Custom command to get element by data-test attribute
 * @example cy.getByTestId('submit-button')
 */
Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-test="${testId}"]`)
})

/**
 * Custom command to get element by data-cy attribute
 * @example cy.getByCy('submit-button')
 */
Cypress.Commands.add('getByCy', (selector) => {
  return cy.get(`[data-cy="${selector}"]`)
})

/**
 * Custom command to check if element is visible and enabled
 * @example cy.get('button').shouldBeClickable()
 */
Cypress.Commands.add('shouldBeClickable', { prevSubject: true }, (subject) => {
  cy.wrap(subject).should('be.visible').and('not.be.disabled')
})

/**
 * Custom command to wait for API response
 * @example cy.waitForApi('getUsers')
 */
Cypress.Commands.add('waitForApi', (alias, timeout = 10000) => {
  return cy.wait(`@${alias}`, { timeout })
})

/**
 * Custom command to set local storage item
 * @example cy.setLocalStorage('token', 'abc123')
 */
Cypress.Commands.add('setLocalStorage', (key, value) => {
  cy.window().then((window) => {
    window.localStorage.setItem(key, value)
  })
})

/**
 * Custom command to get local storage item
 * @example cy.getLocalStorage('token').should('eq', 'abc123')
 */
Cypress.Commands.add('getLocalStorage', (key) => {
  return cy.window().then((window) => {
    return window.localStorage.getItem(key)
  })
})

/**
 * Custom command to clear all local storage
 * @example cy.clearLocalStorage()
 */
Cypress.Commands.overwrite('clearLocalStorage', () => {
  cy.window().then((window) => {
    window.localStorage.clear()
  })
})
