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

  returnBeginning() {    
    return this.startDate;
  }

  beAssigned() {};
};