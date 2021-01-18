import moment from 'moment';
moment().format();

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

  test() {
    const format = 'YYYY/MM/DD';
    const m1 = moment('2010/10/20', format);
    const m2 = moment('2010/10/19', format);
    const m3 = moment('2010/10/24', format);
    return m1.isBetween(m2, m3);
    // return moment('2010-10-20').isBetween('2010-10-19', '2010-10-25'); // true
  }
};
  