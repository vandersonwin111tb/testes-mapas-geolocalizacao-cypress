import data from '../fixtures/orphanages.json'

describe('mapa', () => {
    it('deve poder escolher um orfanato no mapa', () => {
        const orphanage = data.map

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })
        cy.postOrphanage(orphanage)
        cy.visit('http://localhost:3000/map')

        cy.get('.leaflet-marker-icon').as('mapList')

        cy.get('@mapList').each((ele, index, list) => {
            cy.get('@mapList')
                .eq(index)
                .click({ force: true })
            cy.wait(1000)

            cy.get('.leaflet-popup-content').as('divName')
            cy.get('@divName')
                .invoke('text')
                .then((txt) => {
                    cy.log(txt)
                    if (txt === orphanage.name) {
                        cy.get('@mapList').eq(index).as('foundItem')
                        cy.log('Orfanato encontrado - ' + orphanage.name)
                    }
                })
        })
        cy.get('@foundItem')
            .click({ force: true })

        cy.contains('.leaflet-popup-content', orphanage.name)
            .find('a').click({force:true})

        cy.contains('h1', orphanage.name)
            .should('be.visible')
    })
})