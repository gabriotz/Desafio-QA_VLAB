class RegisterPage {
  private usernameInput = '[data-testid="register-username"]'
  private emailInput = '[data-testid="register-email"]'
  private passwordInput = '[data-testid="register-password"]'
  private confirmPasswordInput = '[data-testid="register-confirm"]'
  private submitButton = '[data-testid="register-button"]'
  private message = '#registerMessage'
  private registerTab = '[data-testid="tab-register"]'

  visit() {
    cy.visit('/')
    cy.get(this.registerTab).click()
  }

  register(username: string, email: string, password: string, confirm: string) {
    cy.get(this.usernameInput).clear().type(username)
    cy.get(this.emailInput).clear().type(email)
    cy.get(this.passwordInput).clear().type(password)
    cy.get(this.confirmPasswordInput).clear().type(confirm)
    cy.get(this.submitButton).click()
  }

  fillUsername(value: string) {
    cy.get(this.usernameInput).clear().type(value)
  }

  fillEmail(value: string) {
    cy.get(this.emailInput).clear().type(value)
  }

  fillPassword(value: string) {
    cy.get(this.passwordInput).clear().type(value)
  }

  fillConfirmPassword(value: string) {
    cy.get(this.confirmPasswordInput).clear().type(value)
  }

  submit() {
    cy.get(this.submitButton).click()
  }

  getMessage() {
    return cy.get(this.message)
  }

  getEmailInputType() {
    return cy.get(this.emailInput).invoke('attr', 'type')
  }
}

export default new RegisterPage()