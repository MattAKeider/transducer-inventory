describe('Login', () => {
  it('should login successfully', () => {
    cy.visit('/');
    cy.get('button').contains('Login').click();
    cy.get('input[name=email]').type(Cypress.env('EMAIL'));
    cy.get('input[name=password]').type(Cypress.env('PASSWORD'));
    cy.get('button').contains('Submit').click();
    cy.location('pathname').should('eq', '/');
  });
});