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

  beAssigned() {};
};