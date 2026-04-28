describe('API Health Check', () => {
  it('should return 200 for valid login credentials', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      body: { username: 'admin', password: 'admin123' },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.success).to.eq(true)
    })
  })

  it('should return error for invalid credentials', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      body: { username: 'admin', password: 'senhaerrada' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.success).to.eq(false)
    })
  })

  it('should return error for empty credentials', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      body: { username: '', password: '' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.success).to.eq(false)
    })
  })

  it('should respond within acceptable time', () => {
    const start = Date.now()

    cy.request({
      method: 'POST',
      url: '/login',
      body: { username: 'admin', password: 'admin123' },
    }).then(() => {
      const duration = Date.now() - start
      expect(duration).to.be.lessThan(3000)
    })
  })
})