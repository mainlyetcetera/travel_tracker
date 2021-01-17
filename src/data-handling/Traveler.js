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
};
  