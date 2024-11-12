describe('Transducer', () => {
  beforeEach(() => {
    cy.login('EMAIL', 'PASSWORD');
    cy.visit('/');
  });

  it('should create a new Transducer', () => {
    cy.get('button').contains('Add').click();
    cy.getFormInput('name').type('cypress');
    cy.getFormSelect('location').select('MIDTOWN');
    cy.getFormSelect('department').select('MFM');
    cy.getFormSelect('type').select('TV');
    cy.getFormInput('room').type('1');
    cy.getFormInput('serial').type('000-1234');
    cy.getFormInput('internal').type('1234');
    cy.getFormInput('control').type('1421');
    cy.getFormInput('received').type('2024-11-11');
    cy.getFormSelect('condition').select('New');
    cy.get('button').contains('Submit').click();
    cy.get('li').contains('cypress').should('exist');
  });

  it('should edit an existing transducer', () => {
    cy.get('li').contains('cypress').click();
    cy.get('button').contains('Edit').click();
    cy.getFormInput('name').clear().type('edited');
    cy.get('button').contains('Submit').click();
    cy.get('li').contains('cypress').should('not.exist');
    cy.get('li').contains('edited').should('exist');
  });

  it('should delete the created transducer', () => {
    cy.get('li').contains('edited').prev().click();
    cy.get('li').contains('edited').should('not.exist');
  });
});