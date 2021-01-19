import './css/base.scss';
import './images/turing-logo.png'

import Traveler from './data-handling/Traveler.js';
import Trip from './data-handling/Trip.js';

import { getData } from '../utils/api/apiCalls.js';
import { domUpdates } from './domUpdates.js';

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
      domUpdates.displayTrips(traveler);
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

window.onload = initiateData;
