/// <reference types="cypress" />

export const goToEntries = () => {
    cy.get('#leftmenuLinkEmployerPunches').click();
};

export const createEntry = filename => {
    cy.fixture(filename).as('entry');

    cy.get('#aActionButton').click();
    cy.get('#btnAddEmpTransaction').then(button => {
        expect(button.text()).is.eql('New Entry');
    }).click();

    cy.get('@entry').then(entry => {
        cy.get('#EntryTypeddl').select(entry.entryType);
        cy.get('#AccountType').select(entry.accountType);
        cy.get('#txtClientAccount').type(entry.client);
        cy.contains('li', entry.client).click({
            timeout: 10000
        })
        cy.get('#AssociatedserviceCode').select(entry.serviceCode);

        cy.get('#Servicedatetimepicker > .datepicker-button > .glyphicon').click();
        cy.get('#datepicker-calendar-PunchDate > table > tbody > tr > [aria-label=\'' + entry.serviceDate + '\']').click();
        cy.get('#PunchInTime').click();
        cy.contains(new RegExp('^' + entry.inTime + '$', 'g')).scrollIntoView().click();
        cy.get('#PunchOutTime').type('{selectall}{backspace}' + entry.outTime);

        cy.get('#drpEvvMethod').select(entry.method, { force: true });
        cy.get('#customReasonCode > .fa').click();
        cy.get('#drpCustomReason').select(entry.reason);
        cy.get('#txtareaReasonNote').type(entry.notes);
        cy.get('#idAddCustomReason > .fa').click();
        cy.get('#btnFormSubmitAddReasonModal').click();

        cy.get('#diagcode').type(entry.diagnosticCode);
        cy.get('#PunchNotesArea').type(entry.notes);
        cy.contains(entry.statements).click();
        cy.get('#btnTrasactionPunchFormSubmit').click();
        cy.get('#btnFormSubmitSavePunch').click();
    });
};

export const searchForEntry = filename => {
    cy.fixture(filename).as('entry');

    cy.get('@entry').then(entry => {
        cy.get('#txtClient').type(entry.client);
        cy.get('#txtServiceCode').type(entry.serviceCode);
        cy.get('#ddlAccountType').select(entry.accountType);
        cy.get('#datetimepickerStart > .datepicker-button > .glyphicon').click();
        cy.get('[aria-label=\'' + entry.serviceDate + '\']').click();
        cy.get('#btnSearch').click()
    });
};

export const getFirstListedId = id => {
    cy.get('[headers=\'punchIdthead\'] > a').invoke('text').as(name);
};

export const openFirstEntry = () => {
    cy.get('[headers=\'punchIdthead\'] > a').first().click();
};