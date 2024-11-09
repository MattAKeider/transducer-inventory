describe('Visit', () => {
  it('should visit successfully', () => {
    cy.visit('/');
    cy.get('h1').should('have.text', 'Transducer Inventory');
  });
});