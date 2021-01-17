import chai from 'chai';
import { testTravelers } from '../test-data/traveler-test-data.js';
import { testTrips } from '../test-data/trip-test-data.js';
import Traveler from '../src/data-handling/Traveler.js';
import Trip from '../src/data-handling/Trip.js';

const expect = chai.expect;

describe('a Traveler', () => {
  let traveler, trip1, trip2, trip3, trip4, id;

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

  beforeEach(() => {
    id = traveler.id;

    trip1.beAssigned(id, traveler.pastTrips);
    trip2.beAssigned(id, traveler.currentTrips);
    trip3.beAssigned(id, traveler.upcomingTrips);
    trip4.beAssigned(id, traveler.pendingTrips);
  });

  it('should be able to return the trips', () => {
    expect(traveler.returnPastTrips()).to.deep.equal([trip1]);
    expect(traveler.returnPresentTrips()).to.deep.equal([trip2]);
    expect(traveler.returnUpcomingTrips()).to.deep.equal([trip3]);
    expect(traveler.returnPendingTrips()).to.deep.equal([trip4]);
  });

  it('should be able to say how long a list is', () => {
    expect(traveler.countTrips(traveler.presentTrips)).to.eql(1);
    expect(traveler.countTrips(traveler.pastTrips)).to.eql(1);
  });

  it('should be able to return the traveler\'s first name', () => {
    const otherTraveler = new Traveler(traveler-test-data[0]);

    expect(traveler.returnFirstName()).to.eql('Morey');
    expect(otherTraveler.returnFirstName()).to.eql('Ham');
  });

  it('should return traveler type', () => {
    expect(traveler.returnType()).to.eql('foodie');
  });

  it('should be able to tell which trips it took in the last year', () => {
    expect(traveler.tookThisYear(trip1)).to.eql(false);
    expect(traveler.tookThisYear(trip2)).to.eql(true);
  });

  it('should return trips not yet a year old AND approved', () => {
    expect(traveler.isValid(traveler.pastTrips)).to.deep.eql([]);
    expect(traveler.isValid(traveler.currentTrips)).to.deep.eql([trip2]);
    expect(traveler.isValid(traveler.upcomingTrips)).to.deep.eql([trip3]);
    expect(traveler.isValid(traveler.pendingTrips)).to.deep.eql([]);
  });

  it('should return total spent on trips this year', () => {
    // flight cost per person twice to make round-trip
    // lodging cost per day per person per duration

    // first assignment is too old
    // last assignment is pending
    
    expect(traveler.spentOnTrips()).to.eql(10680);
    expect(traveler.spentOnAgent()).to.eql(1068);      
    expect(traveler.spentThis()).to.eql(11728);  
  });
});