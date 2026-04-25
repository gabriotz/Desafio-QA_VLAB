import LoginPage from '../../pages/LoginPage'
import users from '../../fixtures/users.json'

describe('Login', () => {
  beforeEach(() => {
    LoginPage.visit()
  })

  it('deve logar com credenciais válidas', () => {
    LoginPage.login(users.valid.username, users.valid.password)
    cy.url().should('include', '/dashboard')
  })

  it('deve exibir erro com senha incorreta', () => {
    LoginPage.login(users.invalidPassword.username, users.invalidPassword.password)
    LoginPage.getErrorMessage().should('be.visible')
  })

  it('deve exibir erro com usuário inexistente', () => {
    LoginPage.login(users.invalidUser.username, users.invalidUser.password)
    LoginPage.getErrorMessage().should('be.visible')
  })

  it('deve exibir erro com campos vazios', () => {
    LoginPage.submit()
    LoginPage.getErrorMessage().should('be.visible')
  })

  it('deve redirecionar para login ao acessar dashboard sem autenticação', () => {
    cy.visit('/dashboard')
    cy.url().should('include', '/')
  })
})