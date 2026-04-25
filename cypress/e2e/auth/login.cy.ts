describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('deve carregar a página de login', () => {
    cy.url().should('include', 'app:3000')
  })
})