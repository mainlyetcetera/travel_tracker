import { expect } from 'chai';
import { testTrips } from '../test-data/trip-test-data.js';
import Trip from '../src/data-handling/Traveler.js';
import Traveler from '../src/data-handling/Trip.js';

describe.only('a Trip', () => {
  let trip;
  beforeEach(() => {
    trip = new Trip(testTrips[0]);
  });

  it('should be an instance of Trip', () => {
    expect(trip).to.be.an.instanceof(Trip);
  });

  it('should be able to import trips', () => {
    expect(testTrips).to.be.an('Array');
  });
});