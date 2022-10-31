/// <reference types="cypress" />

import { goToEntries, createEntry, searchForEntry, getFirstListedId } from './entryUtil.js';

describe('Testing Creating An Entry', () => {
    before("Navigate To Login", () => {
        // navigate to automation website
        cy.visit('https://spsandbox.dcisoftware.com/');
        cy.fixture('credentials').as('user');
    })

    /**
     * Test Case: New Entry
     *  - Logs in
     *  - Navigates to Entries page
     *  - Opens New Entry window
     *  - Enters fields and submits
     *  - Verifies that Searching for the Entry yields a new result
     */
    it('Scenario #1', () => {
        cy.get('@user').then(user => {
            cy.login(user.username, user.password);
        })

        goToEntries();
        searchForEntry('singleEntry');
        // In Selenium you can return the text as a string
        // It isn't immediately apparent how to correctly handle this situation with cypress
        getFirstListedId('existingId');

        // If this is run twice in a row it will fail
        // To run again just set the day in 'singleEntry.json' back 1 day
        // In selenium we can get the current day and then generate the entry for yesterday
        // Theoretically it could run like that once a day without issues
        // I think ideally this would need to identify existing dates and generate a random date that is not listed
        createEntry('singleEntry');
        searchForEntry('singleEntry');
        getFirstListedId('newId');

        cy.get('@existingId').then(existingId => {
            cy.get('@newId').then(newId => {
                expect(newId).is.not.eql(existingId);
            });
        });
    });

    after('Log Out', () => {
        cy.logout();
    });
})