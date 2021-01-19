import moment from 'moment';
moment().format();

const dateInput = document.querySelector('.date-input');
const durationInput = document.querySelector('.duration-input');
const travelersInput = document.querySelector('.travelers-input');
const makeTripButton = document.querySelector('.make-trip');
const userInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const loginButton = document.querySelector('.login-button');

export const domUpdates = {
  displayTravelerName(traveler) {
    const userMsg = document.querySelector('.welcome-msg');    
    userMsg.innerText = `Welcome ${traveler.returnFirstName()}!`;
  },

  createTrip(trip, listName, destinations, travelers) { // curr trip, target list
    const traveler = trip.findCorrespondingTraveler(travelers);
    const total = traveler.spentOnTrip(trip, destinations);
    const destination = trip.findCorrespondingDestination(destinations);
    const name = destination.destination;
    const list = document.querySelector(`.${listName}`);    
    const html = `
      <article class="trip" tabindex=0>
        <h2 class="title">Your trip to: ${name}!</h2>
        <h3 class="count">Number of Travelers: ${trip.travelers}</h3>
        <h3 class="start-date">Start Date: ${trip.returnBeginning()}</h3>
        <h3 class="end-date">End Date: ${trip.returnEnd()}</h3>
        <h3 class="price">Trip Cost: ${total}</h3>
      </article>
    `;

    list.innerHTML += html;
  },

  displayTrips(traveler, destinations, travelers) {
    const past = traveler.returnPastTrips();
    const current = traveler.returnCurrentTrips();
    const upcoming = traveler.returnUpcomingTrips();
    const pending = traveler.returnPendingTrips();
    const pastList = document.querySelector('.past');
    const currentList = document.querySelector('.current');
    const upcomingList = document.querySelector('.upcoming');
    const pendingList = document.querySelector('.pending');

    pastList.innerHTML = '<p>Trips you\'ve enjoyed!</p>';
    currentList.innerHTML = '<p>Trips you\'re on right now! Enjoy!</p>'
    upcomingList.innerHTML = '<p>Trips coming up!</p>'
    pendingList.innerHTML = '<p>Trips we\'re checking for you!</p>';

    past.forEach(trip => this.createTrip(trip, 'past', destinations, travelers));
    current.forEach(trip => this.createTrip(trip, 'current', destinations, travelers));
    upcoming.forEach(trip => this.createTrip(trip, 'upcoming', destinations, travelers));
    pending.forEach(trip => this.createTrip(trip, 'pending', destinations, travelers));
  },

  displayDestinationOptions(destinations) {
    const dropDown = document.querySelector('.destinations-drop-down');    
    destinations.forEach(destination => {
      const name = destination.destination;      
      const html = `<option value="${name}">${name}</option>`;
      dropDown.innerHTML += html;
    });      
  },

  enableMakeTripButton() {    
    if (dateInput.value !== '' && durationInput.value !== '' && travelersInput.value !== '') {
      makeTripButton.disabled = false;
    }
  },

  disableMakeTripButton() {
    if (this.checkDateInput() === false || this.checkNumInput('duration-input') === false || this.checkNumInput('date-input') === false) {
      makeTripButton.disabled = true;
    }
  },

  checkDateInput() {
    const input = dateInput.value;     
    if (moment(input).isValid && input.length === 10) {      
      return true;
    } else {      
      return false;
    }
  },

  checkNumInput(input) {
    const field = document.querySelector(`.${input}`);    
    if (isNaN(parseInt(field.value))) {      
      return false;
    } else {      
      return true;
    }
  },

  clearInputs() {
    dateInput.value = '';
    durationInput.value = '';
    travelersInput.value = '';
  },

  setDisabled() {
    makeTripButton.disabled = true;
  },

  declareValidLogin() {
    return userInput.value.includes('traveler') && userInput.value.length >= 9 ?
      true : false;    
  },

  declareValidPassword() {
    return passwordInput.value === 'travel2021' ? true : false;
  },

  enableLoginButton() {
    const login = this.declareValidLogin();    
    const password = this.declareValidPassword();
    console.log('login', login, 'password', password);
    if (login && password) {
      loginButton.disabled = false;
    }
  }
};