# PrestaShop Registration E2E Tests

## Overview

This project contains end-to-end (E2E) tests for the user registration functionality on the PrestaShop demo website using Cypress.

The goal of this project is to validate the registration flow through real user scenarios, including both positive and negative cases.

---

## Tech Stack

- Cypress
- JavaScript (ES6)
- Node.js

---

## How to run tests

1. Install dependencies:
npm install

2. Open Cypress:
npx cypress open

3. Run tests:
- Select `register.cy.js`
- Or click **Run all tests**

---

## Tested Application

https://nervous-fuel.demo.prestashop.com/en/

---

## Test Coverage

### Positive scenarios
- Open registration page
- Register a new user successfully
- Register with newsletter checkbox selected
- Register without newsletter checkbox selected
- Toggle password visibility

### Negative scenarios
- Submit empty form
- Invalid email format
- Password too short
- Missing first name
- Missing last name
- Missing email
- Missing password
- Missing Terms and Conditions consent
- Missing Customer Data Privacy consent

---

## Notes

- This is a demo website and may behave inconsistently
- Some validations are handled on the frontend only
- Tests avoid relying on login/logout due to unstable backend behavior

---

## Implementation Notes

### iframe (frameLive)

The demo site sometimes loads content inside an iframe (`#frameLive`).

An initial approach attempted to read the iframe source:

cy.get('#frameLive')
  .should('have.attr', 'src')
  .then(($iframe) => {
    const iframeSrc = $iframe.attr('src')
  })

This caused runtime errors and instability.

Final solution:
- Removed iframe handling
- Tests interact directly with the main page
- Improved overall stability

---

### Selectors Strategy

Tests use stable selectors:
- input[name="..."]
- button text via cy.contains()

Avoided:
- dynamic IDs
- deeply nested selectors

---

### Error Handling

Instead of checking exact error messages, tests verify:

cy.get('.alert-danger').should('exist')
cy.get('.alert-danger').should('not.exist')

This makes tests more resilient to UI text changes.

---

## Project Structure

cypress/
  e2e/
    register.cy.js

---

## Helper Functions

To improve readability and reuse:

- openRegistrationPage()
- fillRequiredRegistrationFields()
- acceptRequiredConsents()

---

## Future Improvements

- Add API testing
- Add login flow (with stable backend)

---

## Author

Kristina Petrovic  
QA Engineer