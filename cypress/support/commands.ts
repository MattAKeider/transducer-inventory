Cypress.Commands.add('login', (email: string, password: string) => { 
  cy.session([email, password], () => {
    cy.visit('/');
    cy.get('button').contains('Login').click();
    cy.get('input[name=email]').type(Cypress.env(email));
    cy.get('input[name=password]').type(Cypress.env(password));
    cy.get('button').contains('Submit').click();
    cy.location('pathname').should('eq', '/');
  });
});

Cypress.Commands.add('getFormInput', (name: string) => {
  return cy.get(`input[name=${name}]`);
});

Cypress.Commands.add('getFormSelect', (name: string) => {
  return cy.get(`select[name=${name}]`);
});

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid=${testId}]`);
});