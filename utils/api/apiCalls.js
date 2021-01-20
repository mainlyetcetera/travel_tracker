export const getData = dataset => {
  return fetch(`http://localhost:3001/api/v1/${dataset}`)
    .then(response => response.ok ? response.json() 
      : console.log(`Uh oh, something went wrong loading ${dataset}! Error: ${response.status}, ${response.statusText}`));
}

export const postData = toSend => {
  const body = {
    id: toSend.id,
    userID: toSend.userID,
    destinationID: toSend.destinationID,
    travelers: toSend.travelers,
    date: toSend.date,
    duration: toSend.duration,
    status: toSend.status,
    suggestedActivities: toSend.suggestedActivities
  }

  return fetch('http://localhost:3001/api/v1/trips', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toSend)
  })
    .then(response => response.json())    
    .catch(err => console.log(err));    
}