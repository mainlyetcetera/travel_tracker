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
      domUpdates.displayTrips(traveler, destinations);
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
  // const startDate = dateInput.value;
  // const duration = durationInput.value;
  // const travelers = travelersInput.value;
  // const destination = destinationInput.value;

  // find greatest id among trips, get next one higher
  // get traveler's id
  // get id of destination whose destination prop matches value

  const values = {
    id: Date.now(),
    userID: 23,
    destinationID: 24,
    travelers: 2,
    date: '2021/04/12',
    duration: 4,
    status: 'pending',
    suggestedActivities: []
  };

  const sent = postData(values);
  const received = getData('trips');
  const promises = [sent, received];
  console.log(promises);
  Promise.all(promises)    
    .then(data => console.log(data));
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
makeTripButton.addEventListener('click', makeTrip);
