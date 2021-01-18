import moment from 'moment';
moment().format();

export default class Trip {
  constructor(data) {
    this.tripId = data.id;
    this.userId = data.userID;
    this.destinationId = data.destinationID;
    this.travelers = data.travelers;
    this.startDate = data.date;
    this.endDate;
    this.duration = data.duration;
    this.status = data.status;
    this.suggestedActivities = data.suggestedActivities;
  };

  findCorrespondingTraveler(list) {    
    return list.find(traveler => traveler.id === this.userId);    
  }

  findCorrespondingDestination(list) {
    return list.find(destination => destination.id === this.destinationId);
  }

  returnBeginning() {    
    return this.startDate;
  }

  returnDuration() {
    return this.duration;
  }

  returnEnd() {
    const format = 'YYYY/MM/DD';    
    const startDate = moment(this.startDate, format);    
    const endDate = startDate.add(this.duration - 1, "day");    
    this.endDate = moment(endDate, format);
    this.endDate = this.endDate.format(format);    
    return this.endDate;    
  }

  returnStatus() {
    return this.status;
  }

  approved() {
    return this.returnStatus() === 'approved' ? true : false;
  }

  setupDates() {
    return {
      st: moment(this.returnBeginning()),
      ed: moment(this.returnEnd()),
      curr: moment()
    }
  }

  beAssigned(traveler) {    
    const dates = this.setupDates();
    if (!this.approved()) {
      traveler.pendingTrips.push(this);
    } else if (this.approved() && dates.curr.isAfter(dates.ed)) {
      traveler.pastTrips.push(this);
    } else if (this.approved() && dates.curr.isBetween(dates.st, dates.ed)) {
      traveler.currentTrips.push(this);
    } else if (this.approved() && dates.curr.isBefore(dates.st)) {
      traveler.upcomingTrips.push(this);
    }
  }
};