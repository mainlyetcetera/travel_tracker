import { expect } from 'chai';
import { testTrips } from '../test-data/trip-test-data.js';
import { testTravelers } from '../test-data/traveler-test-data.js';
import Trip from '../src/data-handling/Traveler.js';
import Traveler from '../src/data-handling/Trip.js';

describe('a Trip', () => {
  let trip, traveler;

  beforeEach(() => {
    trip = new Trip(testTrips[0]);
    traveler = new Traveler(testTravelers[testTravelers.length - 1]);
  });

  it('should be an instance of Trip', () => {
    expect(trip).to.be.an.instanceof(Trip);
  });

  it('should be able to import trips', () => {
    expect(testTrips).to.be.an('Array');
    expect(testTravelers).to.be.an('Array');
  });

  it('should return its start date', () => {
    expect(trip.returnBeginning()).to.eql('2018/03/26');
  });

  it('should return its end date', () => {
    // the beginning date is included in the duration
    expect(trip.returnEnd()).to.eql('2018/04/13');
  });

  it('should add itself to the appropriate list of the Traveler', () => {
    // this method shouldn't need a user id to be passed as the traveler id is already present
    trip.beAssigned();

    expect(traveler.pastTrips).to.deep.eql([trip]);
    expect(traveler.currentTrips).to.deep.eql([]);
    expect(traveler.upcomingTrips).to.deep.eql([]);
    expect(traveler.pendingTrips).to.deep.eql([]);
  });
});