import { expect } from 'chai';
import { testTrips } from '../test-data/trip-test-data.js';
import { testTravelers } from '../test-data/traveler-test-data.js';
import Traveler from '../src/data-handling/Traveler.js';
import Trip from '../src/data-handling/Trip.js';

describe('a Trip', () => {
  let trip, traveler;

  beforeEach(() => {
    trip = new Trip(testTrips[0]);
    traveler = new Traveler(testTravelers[testTravelers.length - 1]);
  });

  it('should be an instance of Trip', () => {
    expect(trip).to.be.an.instanceof(Trip);
  });

  it('should have an appropriate constructor', () => {
    expect(trip.tripId).to.eql(33);
    expect(trip.userId).to.eql(50);
    expect(trip.destinationId).to.eql(1);
    expect(trip.travelers).to.eql(5);
    expect(trip.startDate).to.eql('2018/03/26');
    expect(trip.endDate).to.eql(undefined);
    expect(trip.duration).to.eql(19);
    expect(trip.status).to.eql('approved');
    expect(trip.suggestedActivities).to.be.an('Array');
  });

  it('should find its corresponding Traveler', () => {    
    const listOfTravelers = testTravelers.map(each => new Traveler(each));
    
    expect(trip.findCorrespondingTraveler(listOfTravelers)).to.deep.eql(traveler);
  });
  
  it('should return its start date', () => {
    expect(trip.returnBeginning()).to.eql('2018/03/26');
  });

  it('should return its end date', () => {
    // the beginning date is included in the duration    
    expect(trip.returnEnd()).to.eql('2018/04/13');
  });

  it('should return its approval status', () => {
    expect(trip.returnStatus()).to.eql('approved');
  })

  it('should add itself to the appropriate list of the Traveler', () => {
    // this method shouldn't need a user id to be passed as the traveler id is already present
    trip.beAssigned();

    expect(traveler.pastTrips).to.deep.eql([trip]);
    expect(traveler.currentTrips).to.deep.eql([]);
    expect(traveler.upcomingTrips).to.deep.eql([]);
    expect(traveler.pendingTrips).to.deep.eql([]);
  });  
});