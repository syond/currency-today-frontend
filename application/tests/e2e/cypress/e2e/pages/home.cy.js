/// <reference types="cypress" />

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  });

  it('Should load navbar', () => {
    // Logo
    cy.get('.justify-between > img').should('be.visible')

    // Menu item "Configuration"
    // cy.get('.md\:font-medium')
  })

  it('Should show flags', () => {
    cy.intercept('GET', 'https://currency-today-api.vercel.app/currency/BRL').as('getCurrencies')

    cy.wait('@getCurrencies')

    // Flag 1
    cy.get('.justify-center > :nth-child(1) > img').should('be.visible')
    // Flag 2
    cy.get(':nth-child(2) > img').should('be.visible')
    // Flag 3
    cy.get(':nth-child(3) > img').should('be.visible')

    // cy.contains('Pay electric bill').should('not.exist')
  })
});
