Cypress.Commands.add('login', (email, password) => { 
  cy.session([email, password], () => {
    cy.visit('/');
    cy.get('button').contains('Login').click();
    cy.get('input[name=email]').type(Cypress.env(email));
    cy.get('input[name=password]').type(Cypress.env(password));
    cy.get('button').contains('Submit').click();
    cy.location('pathname').should('eq', '/');
  });
});