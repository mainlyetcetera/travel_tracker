import chai from 'chai';
import { testtravelers } from '../test-data/traveler-test-data.js';

const expect = chai.expect;

describe('a Traveler', () => {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler(testTravelers[testTravelers.length - 1]);    
  });

  it('should be able to import testtravelers', () => {
    expect(testtravelers).to.be.an('Array');
  });

  it('should have an appropriate constructor', () => {
    expect(traveler.name).to.eql('Morey Flanders');
    expect(traveler.id).to.eql(50);
    expect(traveler.type).to.eql('foodie');
  });
});