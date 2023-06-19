import HomePage from '../page/HomePage'
import { getPlaceDescription } from '../utils/utils'

describe('LatLong.net Test Suite', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    cy.intercept('POST', '**/api/v1/hb**').as('postRequest');
    cy.visit('https://www.latlong.net/');
  });

  it('1. should search for an address and display the coordinates', () => {
    cy.get('h1').should('contain.text', 'Latitude and Longitude Finder');
  });

  it('2. check Name, latitude and longitude', () => {
    cy.get('label[for="place"]').should('contain.text', 'Place Name');
    // cy.get('input[placeholder="Type a place name"]').should('have.value', 'Type a place name');
    cy.get('label[for="lat"]').should('contain.text', 'Latitude');
    cy.get('label[for="lng"]').should('contain.text', 'Longitude');
  });

  it('3. should validate the place description', () => {
    const placeDescription = getPlaceDescription();
    cy.get('.col-9').should('contain.text', placeDescription);
  });

  it('4. should validate map presence', () => {
    cy.get('#latlongmap').should('be.visible');
  });

  it('5. Type country and check latitude and longitude', () => {
    cy.get('.width70').type('UK');
    cy.get('#btnfind').click();
    cy.get('#latlngspan').should('contain.text', '(55.378052, -3.435973)');
    cy.get('#dms-lat').should('contain.text', "55° 22' 40.9872'' N");
    cy.get('#dms-lng').should('contain.text', "3° 26' 9.5028'' W")
  });

  it('6. Use fixture to location UK', () => {
    cy.fixture('locations.json').then((data) => {
      const uk = data.locations.find((location) => location.name === 'UK');
      cy.get('.width70').type(uk.name);
      cy.get('#btnfind').click();
      cy.get('#latlngspan').should('contain.text', uk.latlngspan);
      
    });
  });

});

