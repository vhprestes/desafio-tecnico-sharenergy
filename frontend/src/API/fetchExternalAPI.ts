export const fetchDogs = async () => {
  return fetch('https://random.dog/woof.json')
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => data.url)
    .catch((error) => {
      console.log("Woof! Something went terribly wrong: " + error);
    });
}