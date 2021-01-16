import chai from 'chai';
import { testTravelers } from '../test-data/traveler-test-data.js';
import Traveler from '../src/data-handling/Traveler.js';

const expect = chai.expect;

describe('a Traveler', () => {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler(testTravelers[testTravelers.length - 1]);    
  });

  it('should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should be able to import testTravelers', () => {
    expect(testTravelers).to.be.an('Array');
  });

  it('should have an appropriate constructor', () => {
    expect(traveler.name).to.eql('Morey Flanders');
    expect(traveler.id).to.eql(50);
    expect(traveler.type).to.eql('foodie');
  });

  it('should have a place to store various types of trips', () => {
    expect(traveler.pastTrips).to.be.an('Array');
    expect(traveler.currentTrips).to.be.an('Array');
    expect(traveler.upcomingTrips).to.be.an('Array');
    expect(traveler.pendingTrips).to.be.an('Array');
  });
});