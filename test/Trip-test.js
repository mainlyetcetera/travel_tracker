import { expect } from 'chai';
import { testTrips } from '../test-data/trip-test-data.js';
import { testTravelers } from '../test-data/traveler-test-data.js';
import { testDestinations } from '../test-data/destinations-test-data.js';
import Traveler from '../src/data-handling/Traveler.js';
import Trip from '../src/data-handling/Trip.js';
import moment from 'moment';
moment().format();

describe('a Trip', () => {
  let trip, trip1, trip2, trip3, traveler, destination;

  beforeEach(() => {
    trip = new Trip(testTrips[0]);    
    trip1 = new Trip(testTrips[3]);
    trip2 = new Trip(testTrips[1]);
    trip3 = new Trip(testTrips[2]);
    traveler = new Traveler(testTravelers[testTravelers.length - 1]);    
    destination = {
      "id": 1,
      "destination": "Lima, Peru",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 400,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky"
    };    
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
    const result = trip.findCorrespondingTraveler(listOfTravelers);
    
    expect(result).to.deep.eql(traveler);
  });

  it('should find its corresponding destination', () => {
    const result = trip.findCorrespondingDestination(testDestinations);

    expect(result).to.deep.eql(destination);
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
  });

  it('should return true or false based on approval status', () => {
    trip1 = new Trip(testTrips[3]);    

    expect(trip.approved()).to.eql(true);
    expect(trip1.approved()).to.eql(false);
  });

  it('should set up dates', () => {
    const dates = {
      st: moment(trip.returnBeginning()),
      ed: moment(trip.returnEnd()),
      curr: moment()
    }

    expect(trip.setupDates()).to.deep.eql(dates);
  });

  it('should add itself to the appropriate list of the Traveler', () => {   
    trip.beAssigned(traveler);
    trip1.beAssigned(traveler);
    trip2.beAssigned(traveler);
    trip3.beAssigned(traveler);      
    
    expect(traveler.pastTrips).to.deep.eql([trip]);
    expect(traveler.currentTrips).to.deep.eql([trip2]);
    expect(traveler.upcomingTrips).to.deep.eql([trip3]);    
    expect(traveler.pendingTrips).to.deep.eql([trip1]);
  });

  it('should only add unique trips to a traveler\'s list', () => {
    trip.beAssigned(traveler);
    trip.beAssigned(traveler);
    trip1.beAssigned(traveler);
    trip1.beAssigned(traveler);
    trip2.beAssigned(traveler);
    trip2.beAssigned(traveler);
    trip3.beAssigned(traveler);
    trip3.beAssigned(traveler);

    expect(traveler.pastTrips).to.deep.eql([trip]);
    expect(traveler.currentTrips).to.deep.eql([trip2]);
    expect(traveler.upcomingTrips).to.deep.eql([trip3]);    
    expect(traveler.pendingTrips).to.deep.eql([trip1]);
  });
});