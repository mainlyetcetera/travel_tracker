import './css/base.scss';
import './images/turing-logo.png'

import Traveler from './data-handling/Traveler.js';
import Trip from './data-handling/Trip.js';

import { getData } from '../utils/api/apiCalls.js';
import { domUpdates } from './domUpdates.js';

let traveler;
let trips;
let destinations;

const initiateData = () => {
  const travelersPromise = getData('travelers');
  const tripsPromise = getData('trips');
  const destinationsPromise = getData('destinations');
  const promises = [travelersPromise, tripsPromise, destinationsPromise];
  Promise.all(promises)
    .then(data => {      
      const index = getRandomIndex(data[0].travelers);      
      traveler = new Traveler(data[0].travelers[index]);
      trips = data[1].trips.map(trip => new Trip(trip));
      destinations = data[2].destinations;
      domUpdates.displayUserMsg(traveler);      
    })
    .catch(err => console.log(err));
}

const getRandomIndex = list => Math.floor(Math.random() * list.length);



window.onload = initiateData;
