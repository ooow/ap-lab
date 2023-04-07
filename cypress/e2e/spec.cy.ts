describe( 'Intial Pageload test', () =>{
  it('Should visit the Products page', () => {
    cy.visit('/');
    cy.contains('Products');
    cy.contains('Australian shepherd');
    cy.get('[type="button"]').check;
    cy.contains('Dashboard').click();
    cy.contains('Product Info Dashboard');
    cy.get('.clear-button').click();
    cy.get('.search').click();
    cy.get('#mat-select-2-panel').contains('Australian kelpie').click();
  })
})

describe( 'Intial Pageload test', () =>{
  it('Should visit the Products page', () => {
    cy.visit('/');
    cy.get('.actions button').click();
    cy.get('#name').type('Indian Breed');
    cy.get('#picture').type('https://thesmartcanine.com/wp-content/uploads/2020/03/kombai-indian-dog-breed-min.jpg');
    cy.get('#description').type('A breed among indian dogs');
    cy.get('#name').click();
    cy.get('#createProduct').click();
  })
})