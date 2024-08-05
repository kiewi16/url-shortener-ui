describe('App', () => {
  beforeEach(() => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
        statusCode: 200,
        fixture: "urls"
      })
   

    // cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
    //   statusCode: 200,
    //   body: {
    //     "id": 1,
    //     "title": "let's go",
    //     "short_url": "short URL!!",
    //     "long_url": "here is a long URL"
    //   }
    // })

    cy.intercept("POST", 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        "title": "keep going Kim",
        "short_url": "short URL",
        "long_url": "another long URL",
      }
    }).as('POST')
    
    cy.visit('http://localhost:3000')
  })
  it('should land on a home page with a title, a form and two shortened urls', () => {
    cy.get('h1').should('contain', 'URL Shortener')
    cy.get('[placeholder="Title..."]').should('be.visible')
    cy.get('[placeholder="URL to Shorten..."]').should('be.visible')
    cy.get('button').should('contain', 'Shorten Please!')
    cy.get('url-container, .url').should('have.length', 1)
    cy.get('url-container, .url, h3').should('contain', 'test data title')
    cy.get('url-container, .url, a').should('contain', "test data short_url")
    cy.get('url-container, .url, p').should('contain', "test data long_url")
  })

  it('should be able to fill out the title input and URL to shorten input, and see the shortened URL on the page after clicking the shorten please button', () => {
    cy.get('[placeholder="Title..."]').type('keep going Kim').should('have.value', 'keep going Kim')
    cy.get('[placeholder="URL to Shorten..."]').type('another long URL').should('have.value', 'another long URL')
    cy.get('button').click()
    cy.wait('@POST')
    cy.get('url-container, .url').should('have.length', 2)
    cy.get('url-container, .url, h3').first().should('contain', 'test data title')
    cy.get('url-container, .url, a').first().should('contain', "test data short_url")
    cy.get('url-container, .url, p').first().should('contain', "test data long_url")
    cy.get('url-container, .url, h3').last().should('contain', 'keep going Kim')
    cy.get('url-container, .url, a').last().should('contain', "short URL")
    cy.get('url-container, .url, p').last().should('contain', "another long URL")
  })
})