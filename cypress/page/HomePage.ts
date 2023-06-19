class HomePage {
  searchAddress(address) {
    return cy.get('#address').type(address);
  }

  selectUnitOfMeasure(unit) {
    cy.get('#cboM').select(unit);
  }

  getCoordinates() {
    return cy.get('#latlngspan').invoke('text');
  }

  clickSearchButton() {
    return cy.get('#btnfind').click();
  }
}

export default HomePage;