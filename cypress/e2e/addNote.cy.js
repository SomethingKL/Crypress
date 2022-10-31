/// <reference types="cypress" />

import 'cypress-iframe'
import { goToEntries, openFirstEntry, searchForEntry } from './entryUtil.js';
import { addNote } from './entryDetailUtil.js';

/**
 * Test Case: Add A Note To An Existing Entry
 *  - Logs in
 *  - Navigates to the Entries page
 *  - Opens the detail view of an existing entry
 *  - Opens New Note window
 *  - Enters the Fields and submits
 *  - * Issues with iframe blocked this step
 *  - - - This step should validate that the new note was added
 */
describe('Testing Adding A Entry Note', () => {
    before("Navigate To Login", () => {
        // navigate to automation website
        cy.visit('https://spsandbox.dcisoftware.com/');
        cy.fixture('credentials').as('user');
    })

    it('Scenario #2', () => {
        cy.get('@user').then(user => {
            cy.login(user.username, user.password);
        })

        goToEntries();
        searchForEntry('singleEntry');
        openFirstEntry();
        addNote('newNote');
    });

    after('Log Out', () => {
        cy.logout();
    });
})