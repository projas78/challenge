describe('API Tests', () => {
    it('1. should retrieve books from the API', () => {
      cy.request('GET', 'https://demoqa.com/BookStore/v1/Books')
        .then((response) => {
          expect(response.status).to.equal(200);
  
          expect(response.body).to.have.property('books').that.is.an('array');
  
          expect(response.body.books).to.have.length.greaterThan(0);
        });
    });
  
    it('2. should retrieve a specific book from the API test', () => {
      const isbn = '9781449325862';
  
      cy.request('GET', `https://demoqa.com/BookStore/v1/Book?ISBN=${isbn}`)
        .then((response) => {
          expect(response.status).to.equal(200);
  
          expect(response.body).to.have.property('isbn').that.equals(isbn);
        });
    });
  });