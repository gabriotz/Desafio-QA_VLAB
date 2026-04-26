import ColetaPage from '../../pages/ColetaPage'
import LoginPage from '../../pages/LoginPage'
import users from '../../fixtures/users.json'

describe('Coleta de Dados', () => {
  beforeEach(() => {
    LoginPage.visit()
    LoginPage.login(users.valid.username, users.valid.password)
    ColetaPage.waitForDashboard()
  })

  // ─────────────────────────────────────────────
  // POSITIVE TESTS
  // ─────────────────────────────────────────────

  context('Positive - Coleta válida', () => {
    it('should submit coleta with valid data successfully', () => {
      ColetaPage.fill('001', 'João Silva', 80, 90, 8, 100, 'completo')
      ColetaPage.submit()

      ColetaPage.getMessage()
        .should('be.visible')
        .and('not.contain', 'erro')
    })
  })

  // ─────────────────────────────────────────────
  // BUG DOCUMENTATION TESTS
  // ─────────────────────────────────────────────

  context('BUG-045 - Taxa de Conclusão aceita valores negativos', () => {
    it('[BUG] should reject negative value for Taxa de Conclusão', () => {
      ColetaPage.fill('002', 'Maria Lima', -50, 90, 8, 100, 'completo')
      ColetaPage.submit()

      // Expected: error message about invalid value
      // Actual: system accepts and submits normally
      ColetaPage.getMessage()
        .should('be.visible')
        .and('contain', 'inválido') // FAILS — documents BUG-045
    })
  })

  context('BUG-046 - Frequência aceita valores acima de 100%', () => {
    it('[BUG] should reject frequency value above 100', () => {
      ColetaPage.fill('003', 'Carlos Souza', 80, 150, 8, 100, 'completo')
      ColetaPage.submit()

      // Expected: error message about invalid value
      // Actual: system accepts and submits normally
      ColetaPage.getMessage()
        .should('be.visible')
        .and('contain', 'inválido') // FAILS — documents BUG-046
    })
  })

  context('BUG-047 - Nota de Avaliação sem limite máximo de 10', () => {
    it('[BUG] should reject nota above 10', () => {
      ColetaPage.fill('004', 'Ana Paula', 80, 90, 99, 100, 'completo')
      ColetaPage.submit()

      // Expected: error message about invalid value
      // Actual: system accepts and submits normally
      ColetaPage.getMessage()
        .should('be.visible')
        .and('contain', 'inválido') // FAILS — documents BUG-047
    })
  })

  context('BUG-052 - Histórico exibe dados de todos os usuários', () => {
    it('[BUG] historico should only show data from the logged user', () => {
      ColetaPage.abrirHistorico()

      // Expected: only records from the logged user
      // Actual: records from all users are visible
      ColetaPage.getHistorico()
        .should('not.contain', 'admin') // FAILS if other users' data appears — documents BUG-052
    })
  })
})