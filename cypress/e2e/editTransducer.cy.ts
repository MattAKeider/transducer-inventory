describe('Edit Transducer', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/transducers', {
      fixture: 'transducers.json'
    });

    cy.intercept('GET', '/api/conditions/6774374a3766f741a2c328a7', {
      fixture: 'conditions.json'
    });

    cy.login('EMAIL', 'PASSWORD');
    cy.visit('/');
  });
  
  it('should edit an existing transducer', () => {
    cy.getByTestId('form').should('not.exist');
    cy.getByTestId('CYPRESS').click();
    cy.get('button').contains('Edit').click();
    cy.getByTestId('form').should('be.visible');

    // default should be all inputs are editable and condition as New
    cy.getFormInput('name').should('not.be.disabled');
    cy.getFormSelect('location').should('not.be.disabled');
    cy.getFormSelect('condition').should('contain.value', 'New');

    // make sure clicking out of service disables inputs and changes condition
    cy.getFormInput('service').check();
    cy.getFormInput('service').should('be.checked');
    cy.getFormInput('name').should('be.disabled');
    cy.getFormSelect('location').should('be.disabled');
    cy.getFormSelect('condition').should('contain.value', 'Broken (Out of Service)');
    
    // uncheck and edit form
    cy.getFormInput('service').uncheck();
    cy.getFormInput('service').should('be.not.checked');
    cy.getFormSelect('condition').should('contain.value', 'Working');
    cy.getFormInput('name').clear().type('Edited');
    cy.getFormInput('name').should('contain.value', 'Edited');
    cy.getFormSelect('location').select('MIDTOWN');
    cy.getFormSelect('location').should('contain.value', 'MIDTOWN');
    cy.getFormSelect('department').select('L&D');
    cy.getFormSelect('department').should('contain.value', 'L&D');
    cy.getFormSelect('type').select('TA');
    cy.getFormSelect('type').should('contain.value', 'TA');
    cy.getFormInput('room').clear().type('40');
    cy.getFormInput('room').should('contain.value', '40');
    cy.getFormInput('serial').clear().type('zzzzz');
    cy.getFormInput('serial').should('contain.value', 'zzzzz');
    cy.getFormInput('internal').clear().type('zzzzz');
    cy.getFormInput('internal').should('contain.value', 'zzzzz');
    cy.getFormInput('control').clear().type('zzzzz');
    cy.getFormInput('control').should('contain.value', 'zzzzz');

    // test out using an alias
    cy.get('textarea[name=notes]').as('textbox');
    cy.get('@textbox').type('This is still working and now tested!');
    cy.get('@textbox').should('contain.value', 'This is still working and now tested!');

    // submit and verify form closes
    cy.contains('Submit').click();
    cy.getByTestId('form').should('not.exist');
  });
});