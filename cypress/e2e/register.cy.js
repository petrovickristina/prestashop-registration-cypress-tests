const BASE_URL = 'https://nervous-fuel.demo.prestashop.com/en/'

const openRegistrationPage = () => {
  cy.visit(BASE_URL)

  cy.contains('Sign in', { timeout: 30000 })
    .should('be.visible')
    .click()

  cy.contains('Create your account', { timeout: 30000 })
    .should('be.visible')
    .click()

  cy.contains('Create an account', { timeout: 30000 })
    .should('be.visible')
}

const fillRequiredRegistrationFields = (
  email = `kristina${Date.now()}@test.com`,
  password = 'Kri$tinaQA_2026!'
) => {
  cy.get('input[name="firstname"]').clear().type('Kristina')
  cy.get('input[name="lastname"]').clear().type('Petrovic')
  cy.get('#field-email').clear().type(email)
  cy.get('input[name="password"]').clear().type(password)
}

const acceptRequiredConsents = () => {
  cy.get('input[name="psgdpr"]')
    .check({ force: true })
    .should('be.checked')

  cy.get('input[name="customer_privacy"]')
    .check({ force: true })
    .should('be.checked')
}

describe('Register functionality', () => {
  beforeEach(() => {
    openRegistrationPage()
  })

  it('should open the registration page', () => {
    cy.contains('Create an account').should('be.visible')
  })

  it('should register a new user successfully', () => {
    fillRequiredRegistrationFields()
    acceptRequiredConsents()

    cy.contains('button', 'Create account').click()

    cy.get('.alert-danger').should('not.exist')
  })

  it('should show validation errors when submitting empty form', () => {
    cy.contains('button', 'Create account').click()

    cy.get('input[name="firstname"]:invalid').should('exist')
    cy.get('input[name="lastname"]:invalid').should('exist')
    cy.get('#field-email:invalid').should('exist')
  })

  it('should show validation error for invalid email format', () => {
    fillRequiredRegistrationFields('invalid-email')
    acceptRequiredConsents()

    cy.contains('button', 'Create account').click()

    cy.get('#field-email:invalid').should('exist')
  })

  it('should show validation error for too short password', () => {
    fillRequiredRegistrationFields(`short${Date.now()}@test.com`, '123')
    acceptRequiredConsents()

    cy.contains('button', 'Create account').click()

    cy.contains('password', { matchCase: false }).should('be.visible')
  })

  it('should not register user without terms and conditions consent', () => {
    fillRequiredRegistrationFields()

    cy.get('input[name="customer_privacy"]').check({ force: true })

    cy.contains('button', 'Create account').click()

    cy.get('input[name="psgdpr"]:invalid').should('exist')
  })

  it('should not register user without customer data privacy consent', () => {
    fillRequiredRegistrationFields()

    cy.get('input[name="psgdpr"]').check({ force: true })

    cy.contains('button', 'Create account').click()

    cy.get('input[name="customer_privacy"]:invalid').should('exist')
  })

  it('should allow registration with newsletter checkbox selected', () => {
    fillRequiredRegistrationFields(`newsletter${Date.now()}@test.com`)
    acceptRequiredConsents()

    cy.get('input[name="newsletter"]').check({ force: true })

    cy.contains('button', 'Create account').click()

    cy.get('.alert-danger').should('not.exist')
  })

  it('should show validation error when first name is missing', () => {
    cy.get('input[name="lastname"]').type('Petrovic')
    cy.get('#field-email').type(`missingfirst${Date.now()}@test.com`)
    cy.get('input[name="password"]').type('Kri$tinaQA_2026!')
    acceptRequiredConsents()
  
    cy.contains('button', 'Create account').click()
  
    cy.get('input[name="firstname"]:invalid').should('exist')
  })
  
  it('should show validation error when last name is missing', () => {
    cy.get('input[name="firstname"]').type('Kristina')
    cy.get('#field-email').type(`missinglast${Date.now()}@test.com`)
    cy.get('input[name="password"]').type('Kri$tinaQA_2026!')
    acceptRequiredConsents()
  
    cy.contains('button', 'Create account').click()
  
    cy.get('input[name="lastname"]:invalid').should('exist')
  })
  
  it('should show validation error when email is missing', () => {
    cy.get('input[name="firstname"]').type('Kristina')
    cy.get('input[name="lastname"]').type('Petrovic')
    cy.get('input[name="password"]').type('Kri$tinaQA_2026!')
    acceptRequiredConsents()
  
    cy.contains('button', 'Create account').click()
  
    cy.get('#field-email:invalid').should('exist')
  })
  
  it('should show validation error when password is missing', () => {
    cy.get('input[name="firstname"]').type('Kristina')
    cy.get('input[name="lastname"]').type('Petrovic')
    cy.get('#field-email').type(`missingpassword${Date.now()}@test.com`)
    acceptRequiredConsents()
  
    cy.contains('button', 'Create account').click()
  
    cy.get('input[name="password"]:invalid').should('exist')
  })
  
  it('should allow registration without newsletter checkbox selected', () => {
    fillRequiredRegistrationFields(`nonewsletter${Date.now()}@test.com`)
    acceptRequiredConsents()
  
    cy.get('input[name="newsletter"]').should('not.be.checked')
  
    cy.contains('button', 'Create account').click()
  
    cy.get('.alert-danger').should('not.exist')
  })
  
  it('should allow selecting partner offers checkbox', () => {
    cy.get('input[name="optin"]')
      .check({ force: true })
      .should('be.checked')
  })

  it('should show password when password visibility button is clicked', () => {
    cy.get('input[name="password"]').type('Kri$tinaQA_2026!')
    cy.get('input[name="password"]').should('have.attr', 'type', 'password')
  
    cy.get('input[name="password"]')
      .siblings('button')
      .click()
  
    cy.get('input[name="password"]').should('have.attr', 'type', 'text')
  })
})