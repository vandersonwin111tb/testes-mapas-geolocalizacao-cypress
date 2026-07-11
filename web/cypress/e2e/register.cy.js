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

