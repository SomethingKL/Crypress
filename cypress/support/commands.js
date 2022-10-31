// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => {

    cy.get('#ddlLanguage').select('English');

    cy.get('#loginHeader').then(header => {
        expect(header.text()).is.eq('Sign In');
    })

    cy.get('#Email').type(username);
    cy.get('#Password').type(password);

    cy.get('#btnSubmit').then(button => {
        expect(button.text()).is.eql('Sign In');
    }).click();

    cy.url().should("contain", "dcisoftware.com/Home/Dashboard");
})

Cypress.Commands.add('logout', () => {
    cy.get('#ChangeUsernameId1').click();
    cy.get('#logoutForm').click();

    cy.url().should("contain", "dcisoftware.com/?IsSession=True");
})


//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })