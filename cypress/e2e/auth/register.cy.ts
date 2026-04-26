import registerPage from '../../pages/RegisterPage'

describe('Register Module', () => {
  const timestamp = Date.now()

  beforeEach(() => {
    registerPage.visit()
  })

  // ─────────────────────────────────────────────
  // POSITIVE TESTS
  // ─────────────────────────────────────────────

  context('Positive - Valid registration', () => {
    it('should register successfully with valid data', () => {
      registerPage.register(
        `user${timestamp}`,
        `user${timestamp}@test.com`,
        'Password123',
        'Password123'
      )

      registerPage.getMessage()
        .should('be.visible')
        .and('not.contain', 'inválido')
        .and('not.contain', 'erro')
    })
  })

  // ─────────────────────────────────────────────
  // NEGATIVE TESTS
  // ─────────────────────────────────────────────

  context('Negative - Invalid email', () => {
    it('should show error when email is invalid (e.g. "gmo")', () => {
      registerPage.register(
        `user${timestamp}`,
        'gmo',
        'Password123',
        'Password123'
      )

      registerPage.getMessage()
        .should('be.visible')
        .and('contain', 'inválido')
    })
  })

  context('Negative - Passwords do not match', () => {
    it('should show error when passwords are different [BUG-032: validation is backend-only]', () => {
      registerPage.register(
        `user${timestamp}`,
        `user${timestamp}@test.com`,
        'Password123',
        'Different456'
      )

      // BUG-032: Frontend does not validate before submitting.
      // Error only appears after backend responds.
      registerPage.getMessage()
        .should('be.visible')
        .and('not.be.empty')
    })
  })

  context('Negative - Empty fields', () => {
    it('should show error when all fields are empty', () => {
      registerPage.submit()

      // System validates email first, so the error mentions "Email inválido"
      registerPage.getMessage()
        .should('be.visible')
        .and('contain', 'inválido')
    })
  })

  // ─────────────────────────────────────────────
  // BUG DOCUMENTATION TESTS
  // ─────────────────────────────────────────────

  context('BUG-029 - Username accepts spaces (no frontend validation)', () => {
    it('[BUG] should reject username with spaces — currently registers without error', () => {
      registerPage.register(
        'gab riel',
        `bug029${timestamp}@test.com`,
        'Password123',
        'Password123'
      )

      // Expected: error message about invalid username
      // Actual: system registers the user without any error
      registerPage.getMessage()
        .should('be.visible')
        .and('contain', 'inválido') // FAILS — documents BUG-029
    })
  })

  context('BUG-030 - Email field has type="text" instead of type="email"', () => {
    it('[BUG] email input should have type="email" but has type="text"', () => {
      // Expected: type="email" for browser-native validation
      // Actual: type="text" — documents BUG-030
      registerPage.getEmailInputType()
        .should('eq', 'email') // FAILS — documents BUG-030
    })
  })
})