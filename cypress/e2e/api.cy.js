import { apiUtils } from '../utils'

describe('API Testing', () => {
  let apiConfig

  before(() => {
    cy.fixture('api').then((config) => {
      apiConfig = config
    })
  })

  it('should intercept and mock login API', () => {
    cy.fixture('api').then((api) => {
      // Setup API intercept
      cy.intercept('POST', api.endpoints.login, api.apiResponses.successLogin).as('loginApi')
      
      // Visit login page
      cy.visit('/login')
      
      // Perform login
      cy.getByTestId('username').type('testuser')
      cy.getByTestId('password').type('password')
      cy.getByTestId('login-button').click()
      
      // Wait for and verify API call
      cy.wait('@loginApi').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
        expect(interception.response.body.success).to.be.true
        expect(interception.response.body.token).to.exist
      })
    })
  })

  it('should intercept and mock failed login API', () => {
    cy.fixture('api').then((api) => {
      // Setup API intercept for failed login
      cy.intercept('POST', api.endpoints.login, api.apiResponses.failedLogin).as('loginApi')
      
      // Visit login page
      cy.visit('/login')
      
      // Perform login with invalid credentials
      cy.getByTestId('username').type('invaliduser')
      cy.getByTestId('password').type('wrongpassword')
      cy.getByTestId('login-button').click()
      
      // Wait for and verify API call
      cy.wait('@loginApi').then((interception) => {
        expect(interception.response.statusCode).to.equal(401)
        expect(interception.response.body.success).to.be.false
        expect(interception.response.body.message).to.equal('Invalid credentials')
      })
    })
  })

  it('should test multiple API endpoints', () => {
    // Setup multiple API intercepts
    const endpoints = [
      { method: 'GET', url: '/api/users', alias: 'getUsers' },
      { method: 'GET', url: '/api/products', alias: 'getProducts' },
      { method: 'GET', url: '/api/orders', alias: 'getOrders' },
    ]
    
    apiUtils.setupApiIntercepts(endpoints)
    
    // Trigger API calls by visiting pages
    cy.visit('/dashboard')
    
    // Wait for all APIs
    apiUtils.waitForApis(['getUsers', 'getProducts', 'getOrders'])
  })

  it('should verify API response structure', () => {
    cy.intercept('GET', '/api/products').as('getProducts')
    
    cy.visit('/products')
    
    cy.wait('@getProducts').then((interception) => {
      const response = interception.response
      
      // Verify response status
      apiUtils.verifyResponseStatus(response, 200)
      
      // Verify response has expected properties
      expect(response.body).to.have.property('products')
      expect(response.body.products).to.be.an('array')
    })
  })

  it('should extract data from API response', () => {
    cy.fixture('api').then((api) => {
      cy.intercept('POST', api.endpoints.login, api.apiResponses.successLogin).as('loginApi')
      
      cy.visit('/login')
      cy.getByTestId('username').type('testuser')
      cy.getByTestId('password').type('password')
      cy.getByTestId('login-button').click()
      
      cy.wait('@loginApi').then((interception) => {
        const response = interception.response
        const token = apiUtils.extractFromResponse(response, 'body.token')
        const userId = apiUtils.extractFromResponse(response, 'body.user.id')
        
        expect(token).to.equal('mock-jwt-token')
        expect(userId).to.equal(1)
      })
    })
  })
})
