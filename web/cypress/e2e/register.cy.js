import data from '../fixtures/orphanages.json'
// import { faker } from '@faker-js/faker'

describe('Cadastro de orfanatos', () => {

    it('Deve cadastrar um novo orfanato', () => {
        // cy.visit('http://localhost:3000/orphanages/create')

        cy.visit('http://localhost:3000/orphanages/create')

        const orphanage = data.create

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })

        cy.get('legend')
            .should('be.visible')
            .should('have.text', 'Cadastro')

        cy.setMapPosition(orphanage.position)

        // cy.get('input[name="name"]')
        //     .type('Orfanato crinça feliz')

        cy.get('input[name=name]')
            .type(orphanage.name)

        cy.get('#description')
            .type(orphanage.description)

        cy.get('input[type=file]')
            .selectFile('cypress/fixtures/images/kids-playground-1.png', { force: true })

        cy.get('#opening_hours')
            .type(orphanage.opening_hours)

        cy.contains('button', orphanage.open_on_weekends).click()

        cy.get('.save-button').click()


    })
})

Cypress.Commands.add('setMapPosition', (position) => {
    window.localStorage.setItem('hope-qa:latitude', position.latitude)
    window.localStorage.setItem('hope-qa:longitude', position.longitude)
})

Cypress.Commands.add('visitWithMockGeolocation', (url, latitude = -23.5970626, longitude = -46.690731) => {
    const mockGeolocation = (win, latitude, longitude) => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition', cb => {
            return cb({ coords: { latitude, longitude } });
        });
    };
    cy.visit(url, {
        onBeforeLoad: win => {
            mockGeolocation(win, latitude, longitude);
        }
    });
});