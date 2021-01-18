export const getData = dataset => {
  return fetch(`http://localhost:3001/api/v1/${dataset}`)
    .then(response => response.ok ? response.json() 
      : console.log(`Uh oh, something went wrong loading ${dataset}! Error: ${response.status}, ${response.statusText}`));
}