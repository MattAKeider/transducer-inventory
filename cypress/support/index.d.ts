declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<void>;
    getFormInput(name: string): Chainable<JQuery<HTMLInputElement>>;
    getFormSelect(name: string): Chainable<JQuery<HTMLSelectElement>>;
  }
}
