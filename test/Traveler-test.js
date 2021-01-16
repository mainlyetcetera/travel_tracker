import chai from 'chai';
import { testTravelers } from '../test-data/traveler-test-data.js';
import { testTrips } from '../test-data/trip-test-data.js';
import Traveler from '../src/data-handling/Traveler.js';
import Trip from '../src/data-handling/Trip.js';

const expect = chai.expect;

describe('a Traveler', () => {
  let traveler, trip1, trip2, trip3, trip4;

  beforeEach(() => {
    traveler = new Traveler(testTravelers[testTravelers.length - 1]);        
    trip1 = new Trip(testTrips[0]);
    trip2 = new Trip(testTrips[1]);    
    trip3 = new Trip(testTrips[2]);
    trip4 = new Trip(testTrips[3]);
  });

  it('should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should be able to import data', () => {
    expect(testTravelers).to.be.an('Array');
    expect(testTrips).to.be.an('Array');
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

  it('should be able to return the trips', () => {
    const id = traveler.id;
    
    trip1.beAssigned(id, traveler.pastTrips);
    trip2.beAssigned(id, traveler.currentTrips);
    trip3.beAssigned(id, traveler.upcomingTrips);
    trip4.beAssigned(id, traveler.pendingTrips);

    expect(traveler.returnTrips(traveler.pastTrips)).to.deep.equal([trip1]);
    expect(traveler.returnTrips(traveler.presentTrips)).to.deep.equal([trip2]);
    expect(traveler.returnTrips(traveler.upcomingTrips)).to.deep.equal([trip3]);
    expect(traveler.returnTrips(traveler.pendingTrips)).to.deep.equal([trip4]);
  });
});