describe('shared-ui: TopicButton component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=topicbutton--primary&args=name:React'));

    it('should render the topic name', () => {
      cy.get('[data-testid=topicName]').should('contain', 'React')
    });
});
