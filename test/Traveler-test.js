import chai from 'chai';
import { testTravelers } from '../test-data/traveler-test-data.js';
import { testTrips } from '../test-data/trip-test-data.js';
import Traveler from '../src/data-handling/Traveler.js';
import Trip from '../src/data-handling/Trip.js';

const expect = chai.expect;

describe.only('a Traveler', () => {
  let traveler, trip1, trip2, trip3, trip4;

  beforeEach(() => {
    traveler = new Traveler(testTravelers[testTravelers.length - 1]);        
    trip1 = new Trip(testTrips[0]);
    trip2 = new Trip(testTrips[1]);    
    trip3 = new Trip(testTrips[2]);
    trip4 = new Trip(testTrips[3]);    
    
    trip1.beAssigned(traveler);
    trip2.beAssigned(traveler);
    trip3.beAssigned(traveler);
    trip4.beAssigned(traveler);
  });

  it('should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceof(Traveler);
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
    expect(traveler.returnPastTrips()).to.deep.equal([trip1]);
    expect(traveler.returnCurrentTrips()).to.deep.equal([trip2]);
    expect(traveler.returnUpcomingTrips()).to.deep.equal([trip3]);
    expect(traveler.returnPendingTrips()).to.deep.equal([trip4]);
  });

  it('should test whether moment works', () => {
    expect(traveler.test()).to.eql(true);
  });

  it('should be able to say how long a list is', () => {
    expect(traveler.countTrips(traveler.currentTrips)).to.eql(1);
    expect(traveler.countTrips(traveler.pastTrips)).to.eql(1);
  });

  it('should be able to return the traveler\'s first name', () => {
    const otherTraveler = new Traveler(testTravelers[0]);

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
    expect(traveler.returnValidTrips(traveler.pastTrips)).to.deep.eql([]);
    expect(traveler.returnValidTrips(traveler.currentTrips)).to.deep.eql([trip2]);
    expect(traveler.returnValidTrips(traveler.upcomingTrips)).to.deep.eql([trip3]);
    expect(traveler.returnValidTrips(traveler.pendingTrips)).to.deep.eql([]);
  });

  it('should return 10% of a given total', () => {
    expect(traveler.spentOnAgent(100)).to.eql(10);
    expect(traveler.spentOnAgent(50000)).to.eql(5000);
  });

  it('should return costs of all valid trips', () => {
    expect(traveler.spentOnTrips()).to.eql(10680);
  });

  it.only('should return total spent on trips this year', () => {
    // flight cost per person twice to make round-trip
    // lodging cost per day per person per duration

    const spentOnTrips = traveler.spentOnTrips();
    
    expect(spentOnTrips).to.eql(10680);
    expect(traveler.spentOnAgent(spentOnTrips)).to.eql(1068);      
    expect(traveler.spentInTotal()).to.eql(11748);  
  });
});