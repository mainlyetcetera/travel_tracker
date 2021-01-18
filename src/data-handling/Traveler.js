import moment from 'moment';
moment().format();

import { format } from '../../utils/format.js';

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

  test() {
    // const format = 'YYYY/MM/DD';
    const m1 = moment('2010/10/20', format);
    const m2 = moment('2010/10/19', format);
    const m3 = moment('2010/10/24', format);
    return m1.isBetween(m2, m3);
    // return moment('2010-10-20').isBetween('2010-10-19', '2010-10-25'); // true
  }
};
  