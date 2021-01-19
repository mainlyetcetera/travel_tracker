export const domUpdates = {
  displayTravelerName(traveler) {
    const userMsg = document.querySelector('.welcome-msg');    
    userMsg.innerText = `Welcome ${traveler.returnFirstName()}!`;
  },

  createTrip(trip, listName) { // curr trip, target list  
    const list = document.querySelector(`.${listName}`);    
    const html = `
      <article class="trip">
        <h2 class="title">${trip.tripId}</h2>
        <h3 class="count">${trip.travelers}</h3>
        <h3 class="start-date">${trip.returnBeginning()}</h3>
        <h3 class="end-date">${trip.returnEnd()}</h3>
      </article>
    `;

    list.innerHTML += html;
  },

  displayTrips(traveler) {
    const past = traveler.returnPastTrips();
    const current = traveler.returnCurrentTrips();
    const upcoming = traveler.returnUpcomingTrips();
    const pending = traveler.returnPendingTrips();

    past.forEach(trip => this.createTrip(trip, 'past'));
    current.forEach(trip => this.createTrip(trip, 'current'));
    upcoming.forEach(trip => this.createTrip(trip, 'upcoming'));
    pending.forEach(trip => this.createTrip(trip, 'pending'));
  },

  displayDestinationOptions(destinations) {
    const dropDown = document.querySelector('.destinations-drop-down');    
    destinations.forEach(destination => {
      const name = destination.destination;      
      const html = `<option value="${name}">${name}</option>`;
      dropDown.innerHTML += html;
    });      
  }
};