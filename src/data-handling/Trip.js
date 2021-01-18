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

  beAssigned() {
    // need to check if it's not approved
      // add to user's pending
    // need to see, if it's approved, where the dates fall
      // if curr date between start and end date
        // put in current trips of user matching user id
      // otherwise curr date after end date
        // put in past trips of user matching user id

    if (this.returnStatus() !== 'approved') {

    }
  };
};