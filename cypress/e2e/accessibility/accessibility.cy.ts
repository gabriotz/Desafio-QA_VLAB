import 'cypress-axe'

describe('Acessibilidade', () => {
  context('Página de Login', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.injectAxe()
    })

    it('should have no critical accessibility violations on login page', () => {
      cy.checkA11y(undefined, {
        includedImpacts: ['critical', 'serious'],
      }, (violations) => {
        violations.forEach((v) => {
          cy.log(`[${v.impact}] ${v.description} — ${v.helpUrl}`)
        })
      })
    })

    it('should not have color contrast violations', () => {
      cy.checkA11y(undefined, {
        rules: {
          'color-contrast': { enabled: true },
        },
      })
    })

    it('[AUSÊNCIA] should have a government header bar', () => {
      // O sistema deveria ter uma Barra de Governo no topo
      // conforme padrões de sistemas públicos educacionais
      cy.get('[data-testid="barra-governo"], .barra-governo, #barra-governo')
        .should('exist') // FAILS — Barra de Governo não está implementada
    })
  })

  context('Página de Coleta', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('[data-testid="login-username"]').type('admin')
      cy.get('[data-testid="login-password"]').type('admin123')
      cy.get('[data-testid="login-button"]').click()
      cy.url().should('include', '/dashboard')
      cy.visit('/coleta')
      cy.injectAxe()
    })

    it('should have no critical accessibility violations on coleta page', () => {
      cy.checkA11y(undefined, {
        includedImpacts: ['critical', 'serious'],
      }, (violations) => {
        violations.forEach((v) => {
          cy.log(`[${v.impact}] ${v.description} — ${v.helpUrl}`)
        })
      })
    })
  })
})