import moment from 'moment';
moment().format();

import { format } from '../../utils/format.js';
import { testDestinations } from '../../test-data/destinations-test-data.js';

export default class Traveler {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.type = data.travelerType;
    this.pastTrips = [];
    this.currentTrips = [];
    this.upcomingTrips = [];
    this.pendingTrips = [];
  }

  returnPastTrips() {
    return this.pastTrips;
  }

  returnCurrentTrips() {
    return this.currentTrips;
  }

  returnUpcomingTrips() {
    return this.upcomingTrips;
  }

  returnPendingTrips() {
    return this.pendingTrips;
  }

  countTrips(list) {    
    return list.length;
  }

  returnFirstName() {
    return this.name.split(' ')[0];
  }

  returnType() {
    return this.type;
  }

  tookThisYear(trip) {      
    const yearBefore = moment().subtract(1, 'year');    
    const isWithinYear = moment(trip.returnBeginning(), format)
      .isAfter(yearBefore);

    return trip.approved() && isWithinYear ? true : false;
  }

  returnValidTrips(listOfTrips) {
    return listOfTrips.filter(trip => this.tookThisYear(trip));
  }

  spentOnAgent(total) {
    return total * .1;
  }

  spentOnTrips() {
    const validPast = this.returnValidTrips(this.returnPastTrips());
    const validCurrent = this.returnValidTrips(this.returnCurrentTrips());
    const validUpcoming = this.returnValidTrips(this.returnUpcomingTrips());
    const valid = [...validPast, ...validCurrent, ...validUpcoming];    
    return valid.length > 0 ? valid.reduce((total, trip) => {
      const destination = trip.findCorrespondingDestination(testDestinations);
      const estFlightCost = destination.estimatedFlightCostPerPerson;
      const estLodgingCost = destination.estimatedLodgingCostPerDay;
      total += (estFlightCost * 2 * trip.travelers);
      total += (estLodgingCost * trip.travelers * trip.returnDuration());
      return total;
    }, 0) : 0;
  }

  spentInTotal() {
    const tripsTotal = this.spentOnTrips();
    const agentTotal = this.spentOnAgent(tripsTotal);
    return tripsTotal + agentTotal;
  }

  test() {
    // const format = 'YYYY/MM/DD';
    const m1 = moment('2010/10/20', format);
    const m2 = moment('2010/10/19', format);
    const m3 = moment('2010/10/24', format);
    return m1.isBetween(m2, m3);
    // return moment('2010-10-20').isBetween('2010-10-19', '2010-10-25'); // true
  }
};
  