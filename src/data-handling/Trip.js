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

  beAssigned(traveler) {    
    const start = moment(this.returnBeginning());
    const end = moment(this.returnEnd());    
    const currentDate = moment();  
    if (this.status === 'pending') {
      traveler.pendingTrips.push(this);
    } else if (this.status === 'approved' && currentDate.isAfter(end)) {
      traveler.pastTrips.push(this);
    } else if (this.status === 'approved' && currentDate.isBetween(start, end)) {
      traveler.currentTrips.push(this);
    } else if (this.status === 'approved' && currentDate.isBefore(start)) {
      traveler.upcomingTrips.push(this);
    }
  }
};