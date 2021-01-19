export const domUpdates = {
  displayTravelerName(traveler) {
    const userMsg = document.querySelector('.welcome-msg');    
    userMsg.innerText = `Welcome ${traveler.returnFirstName()}!`;
  },

  createTrip(trip, listName, destinations) { // curr trip, target list
    const destination = trip.findCorrespondingDestination(destinations);
    const name = destination.destination;
    const list = document.querySelector(`.${listName}`);    
    const html = `
      <article class="trip">
        <h2 class="title">Your trip to: ${name}!</h2>
        <h3 class="count">Number of Travelers: ${trip.travelers}</h3>
        <h3 class="start-date">Start Date: ${trip.returnBeginning()}</h3>
        <h3 class="end-date">End Date: ${trip.returnEnd()}</h3>
      </article>
    `;

    list.innerHTML += html;
  },

  displayTrips(traveler, destinations) {
    const past = traveler.returnPastTrips();
    const current = traveler.returnCurrentTrips();
    const upcoming = traveler.returnUpcomingTrips();
    const pending = traveler.returnPendingTrips();

    past.forEach(trip => this.createTrip(trip, 'past', destinations));
    current.forEach(trip => this.createTrip(trip, 'current', destinations));
    upcoming.forEach(trip => this.createTrip(trip, 'upcoming', destinations));
    pending.forEach(trip => this.createTrip(trip, 'pending', destinations));
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