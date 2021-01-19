import Traveler from './data-handling/Traveler.js';

export const domUpdates = {
  displayUserMsg(traveler) {
    const userMsg = document.querySelector('.welcome-msg');    
    userMsg.innerText = `Welcome ${traveler.returnFirstName()}!`;
  }
};