class ColetaPage {
  private beneficiarioId = '[data-testid="beneficiario-id"]'
  private beneficiarioNome = '[data-testid="beneficiario-nome"]'
  private indicadorConclusao = '[data-testid="indicador-conclusao"]'
  private indicadorFrequencia = '[data-testid="indicador-frequencia"]'
  private indicadorNota = '[data-testid="indicador-nota"]'
  private indicadorProgresso = '[data-testid="indicador-progresso"]'
  private status = '[data-testid="coleta-status"]'
  private submitButton = '[data-testid="submit-coleta"]'
  private message = '[data-testid="coleta-message"]'
  private carregarHistorico = '[data-testid="carregar-historico"]'
  private historicoData = '[data-testid="historico-data"]'
  private tabHistorico = '[data-testid="tab-historico"]'

waitForDashboard() {
  cy.visit('/coleta')
  cy.get(this.beneficiarioId, { timeout: 10000 }).should('exist')
}

  fill(id: string, nome: string, conclusao: number, frequencia: number, nota: number, progresso: number, statusValue: string) {
    cy.get(this.beneficiarioId).clear().type(id)
    cy.get(this.beneficiarioNome).clear().type(nome)
    cy.get(this.indicadorConclusao).clear().type(String(conclusao))
    cy.get(this.indicadorFrequencia).clear().type(String(frequencia))
    cy.get(this.indicadorNota).clear().type(String(nota))
    cy.get(this.indicadorProgresso).clear().type(String(progresso))
    cy.get(this.status).select(statusValue)
  }

  submit() {
    cy.get(this.submitButton).click()
  }

  getMessage() {
    return cy.get(this.message)
  }

  abrirHistorico() {
    cy.get(this.tabHistorico).click()
    cy.get(this.carregarHistorico).click()
  }

  getHistorico() {
    return cy.get(this.historicoData)
  }
}

export default new ColetaPage()