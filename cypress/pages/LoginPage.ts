class LoginPage {
  private usernameInput = '[data-testid="login-username"]'
  private passwordInput = '[data-testid="login-password"]'
  private submitButton = '[data-testid="login-button"]'
  private errorMessage = '[data-testid="error-message"]'

  visit() {
    cy.visit('/')
  }

  fillUsername(username: string) {
    cy.get(this.usernameInput).clear().type(username)
  }

  fillPassword(password: string) {
    cy.get(this.passwordInput).clear().type(password)
  }

  submit() {
    cy.get(this.submitButton).click()
  }

  login(username: string, password: string) {
    this.fillUsername(username)
    this.fillPassword(password)
    this.submit()
  }

  getErrorMessage() {
    return cy.get(this.errorMessage)
  }
}

export default new LoginPage()