import './css/base.scss';
import './images/turing-logo.png'

import Traveler from './data-handling/Traveler.js';
import Trip from './data-handling/Trip.js';

import { getData, postData } from '../utils/api/apiCalls.js';
import { domUpdates } from './domUpdates.js';

const dateInput = document.querySelector('.date-input');
const durationInput = document.querySelector('.duration-input');
const travelersInput = document.querySelector('.travelers-input');
const destinationInput = document.querySelector('.destinations-drop-down');
const makeTripButton = document.querySelector('.make-trip');
const body = document.querySelector('body');

let traveler;
let travelers;
let trips;
let destinations;

const initiateData = () => {
  const travelersPromise = getData('travelers');
  const tripsPromise = getData('trips');
  const destinationsPromise = getData('destinations');
  const promises = [travelersPromise, tripsPromise, destinationsPromise];
  Promise.all(promises)
    .then(data => {
      travelers = data[0].travelers.map(dataPiece => new Traveler(dataPiece));      
      const index = getRandomIndex(data[0].travelers);      
      traveler = travelers[index];      
      trips = data[1].trips.map(trip => new Trip(trip));      
      destinations = data[2].destinations;      
      domUpdates.displayDestinationOptions(destinations);     
      domUpdates.displayTravelerName(traveler);      
      populateTrips();            
      generateTravelerGrandTotal(traveler, destinations);    
      domUpdates.displayTrips(traveler, destinations, travelers);
    })
    .catch(err => console.log(err));
}

const getRandomIndex = list => Math.floor(Math.random() * list.length);

const populateTrips = () => {  
  trips.forEach(trip => {    
    const id = trip.findCorrespondingTraveler(travelers).id;
    id === traveler.id ? trip.beAssigned(traveler) : id;
  });  
}

const generateTravelerGrandTotal = (traveler, destinations) => {  
  const total = traveler.spentInTotal(destinations);
  const totalDisplay = document.querySelector('.price-display');
  totalDisplay.innerText = `You have spent $${total} on trips this year!`;
}

const makeTrip = event => {
  event.preventDefault();  
  const dateValue = dateInput.value;
  const durValue = durationInput.value;
  const travValue = travelersInput.value;
  const destValue = destinationInput.value;
  const dest = destinations.find(destination => 
    destination.destination === destValue);

  const destId = dest.id;
  const values = {
    id: Date.now(),
    userID: traveler.id,
    destinationID: destId,
    travelers: travValue,
    date: dateValue,
    duration: durValue,
    status: 'pending',
    suggestedActivities: []
  };

  const sent = postData(values);
  const received = getData('trips');
  const promises = [sent, received];  
  Promise.all(promises)    
    .then(data => {            
      const newTrip = new Trip(data[0].newTrip);      
      trips.push(newTrip);      
      populateTrips();      
      domUpdates.displayTrips(traveler, destinations, travelers);
    });
}

const enableButton = () => {
  if (!domUpdates.checkDateInput() || !domUpdates.checkNumInput('travelers-input') || !domUpdates.checkNumInput('duration-input')) {
    return;
  }
  domUpdates.enableMakeTripButton();
}

const disableButton = () => {  
  domUpdates.disableMakeTripButton();
}

const checkNumberInputs = () => {  
  domUpdates.checkNumInput('date-input');
  domUpdates.checkNumInput('duration-input');
}

const resetMakeTripButton = () => {
  domUpdates.clearInputs();
  domUpdates.setDisabled();
}

/*
pattern to send
{
  id: <number>, 
  userID: <number>, 
  destinationID: <number>, 
  travelers: <number>, 
  date: <string 'YYYY/MM/DD'>, 
  duration: <number>, 
  status: <string 'approved' or 'pending'>, 
  suggestedActivities: <array of strings>
}
*/

window.onload = initiateData;
body.addEventListener('click', disableButton);
body.addEventListener('keyup', disableButton);
dateInput.addEventListener('keyup', disableButton);
durationInput.addEventListener('keyup', disableButton);
travelersInput.addEventListener('keyup', disableButton);
makeTripButton.addEventListener('click', disableButton);
makeTripButton.addEventListener('click', makeTrip);
makeTripButton.addEventListener('click', resetMakeTripButton);
dateInput.addEventListener('keyup', enableButton);
durationInput.addEventListener('keyup', enableButton);
travelersInput.addEventListener('keyup', enableButton);
travelersInput.addEventListener('keyup', checkNumberInputs);
durationInput.addEventListener('keyup', checkNumberInputs);
