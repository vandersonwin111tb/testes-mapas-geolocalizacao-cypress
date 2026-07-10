import data from '../fixtures/orphanages.json'
import createPage from '../support/pages/create'
import mapPage from '../support/pages/map'

describe('Cadastro de orfanatos', () => {

    it('Deve cadastrar um novo orfanato', () => {
        const orphanage = data.create

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })

        createPage.go()
        cy.setMapPosition(orphanage.position)
        createPage.form(orphanage)
        createPage.submit()

        mapPage.popup.haveText('Orfanato cadastrado com sucesso.')
    })

    it('Não deve cadastrar orfanato quando o nome é duplicado', () => {
        const orphanage = data.duplicate

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })

        cy.postOrphanage(orphanage)

        createPage.go()
        cy.setMapPosition(orphanage.position)
        createPage.form(orphanage)
        createPage.submit()

        createPage.popup.haveText('Já existe um cadastro com o nome: ' + orphanage.name)
    })
})

Cypress.Commands.add('postOrphanage', (orphanage) => {

    const formData = new FormData();
    formData.append('name', orphanage.name);
    formData.append('description', orphanage.description);
    formData.append('latitude', orphanage.position.latitude);
    formData.append('longitude', orphanage.position.longitude);
    formData.append('opening_hours', orphanage.opening_hours);
    formData.append('open_on_weekends', true);

    cy.request({
        url: 'http://localhost:3333/orphanages',
        method: 'POST',
        headers: {
            'content-type': 'multipart/form-data'
        },
        body: formData
    }).then(response => {
        expect(response.status).to.eq(201)
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