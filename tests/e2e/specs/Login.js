// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
    it('Login', () => {
      cy.visit('/user/login');
      cy.get('input[id="account"]').type('error_lwei@163.com');
      cy.get('input[id="password"]').type('123456');
      cy.get('button[type="submit"]').click();
      cy.url({ timeout: 3000 }).should('includes', '/home');
    })
  })
  