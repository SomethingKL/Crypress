/// <reference types="cypress" />

//import 'cypress-iframe';

export const addNote = filename => {
    cy.fixture(filename).as('newNote');

    cy.get('#aActionButton').click();
    cy.get('#btnAddAnnotation').then(button => {
        expect(button.text()).is.eql('New Note');
    }).click();

    // The iframe here is giving me more trouble than I would have thought
    // The uncommented code here will enter the text into the iframe
    // However, the frame then fills the screen and there is seamingly no way to return to the default frame
    cy.get('@newNote').then(note => {
        cy.get('#AnnotationAnnotationType').select(note.noteType);
        cy.get('#AnnotationSubject').type(note.subject);

        //cy.get('.cke_wysiwyg_frame').then(frame => {
        //    cy.get('.cke_wysiwyg_frame').get('body').invoke('prop', 'innerHTML', note.newNote);
        //});
        //new Cypress.Promise(resolve => {
        //    cy.get('.cke_wysiwyg_frame').get('body').invoke('prop', 'innerHTML', note.newNote);
        //}).resolve();
        cy.get('.cke_wysiwyg_frame').get('body').invoke('prop', 'innerHTML', note.newNote);
        //writeToIframe(cy.iframe('.cke_wysiwyg_frame'), note);
        cy.get('#btnFormSubmitAnnotation').click();
    });
};

//export const writeToIframe = ($iframe, note) => {
//    return new Cypress.Promise(resolve => {
//        $iframe.on('load', () => {
//            resolve(cy.get('.cke_wysiwyg_frame').get('body').invoke('prop', 'innerHTML', note));
//        });
//    });
//};