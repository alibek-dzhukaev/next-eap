export {}

describe('users', () => {
    it('should add user', () => {
        // visit url
        cy.visit('http://localhost:3000')
        // go to users
        cy.findByRole('link', {name: /users/i}).click()
        // open drawer
        cy.get('.ant-btn').click()
        // fill in the form
        cy.get('#name').type('Aznaur')
        cy.findByRole('textbox', {name: /username/i}).type('Anzor')
        cy.findByRole('textbox', {name: /email/i}).type('kakashi-88@mail.ru')
        cy.findByRole('textbox', {name: /street/i}).type('Pobeda')
        cy.findByRole('textbox', {name: /suit/i}).type('Sokuluk')
        cy.findByRole('textbox', {name: /city/i}).type('shopokov')
        cy.findByRole('textbox', {name: /zipcode/i}).type('12345')
        cy.findByRole('textbox', {name: /phone/i}).type('123456789011')
        cy.findByRole('textbox', {name: /url/i}).type('localhost')
        cy.findByRole('textbox', {name: /company name/i}).type('my-company')
        cy.findByRole('textbox', {name: /catch phrase/i}).type('catch')
        cy.findByRole('textbox', {name: /bs/i}).type('bs')
        // submit the form
        cy.findByRole('button', {name: /submit/i}).click()
        // open user

        // find core information there

        // return to users
    })
})