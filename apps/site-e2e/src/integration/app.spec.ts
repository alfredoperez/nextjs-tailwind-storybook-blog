import { getGreeting } from '../support/app.po';

describe('site', () => {
  beforeEach(() => cy.visit('/articles/dynamic-routing'));

  it('should render title', () => {
    cy.get('h1').should('contain', 'Dynamic Routing and Static Generation');
 });
});
