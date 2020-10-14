describe("Task manager functionality", function () {
    beforeEach('Open the page', function () {
        cy.visitPage();
    });

    it('should add task', function () {
        cy.get('#add-task-button')
            .click();
        cy.get('#add-task-popup___BV_modal_body_')
            .should('be.visible');
        cy.get('#form-name-input')
            .type('Autotest name')
            .should('have.value', 'Autotest name');
        cy.get('#form-date-input')
            .type('Autotest date');
        cy.get('#create-button')
            .click();
        cy.get('#alert_success')
            .should('be.visible');
    });
});

describe("Task manager functionality with mocks", function () {
    beforeEach('Open the page', function () {
        cy.server();
        cy.route('GET', '/tasks', 'fixture:tasks.json').as('getTasks');
        cy.visitPage()
            .wait('@getTasks');
    });

    it('should open the page and display all elements correctly', function () {
        cy.get('h1')
            .should('have.text', 'Задачи');
        cy.get('.task-name')
            .should('have.length', 2)
            .first()
            .should('have.text', 'MOCKS!!!! Make the webinar');
    });
});

