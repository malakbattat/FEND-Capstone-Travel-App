// Placeholder for travel data
const travelData = {
  city: '',
  date: '',
  country: '',
  latitude: '',
  longitude: '',
  weather: '',
  imageUrl: ''
};

// Function to handle form submission
async function handleSubmit(event) {
  event.preventDefault();

  const city = document.getElementById('city').value;
  const date = document.getElementById('date').value;

  try {
    console.log('Sending request to Geonames API');
    const geoResponse = await fetch('/api/geonames', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city }),
    });

    console.log('Geonames Response:', geoResponse);
    if (!geoResponse.ok) {
      throw new Error('Geonames API request failed');
    }
    const geoData = await geoResponse.json();
    console.log('Geonames Data:', geoData);
    const { lat, lng, countryName } = geoData;

    // Updating travelData with Geonames data
    travelData.city = city;
    travelData.date = date;
    travelData.country = countryName;
    travelData.latitude = lat;
    travelData.longitude = lng;

    // Fetch data from Weatherbit API
    const weatherResponse = await fetch('/api/weatherbit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lon: lng }),
    });
    if (!weatherResponse.ok) {
      throw new Error('Weatherbit API request failed');
    }
    const weatherData = await weatherResponse.json();
    const forecast = weatherData.data[0];

    // Updating travelData with Weatherbit data
    travelData.weather = forecast.weather.description;

    // Fetch image from Pixabay API
    const pixabayResponse = await fetch('/api/pixabay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city }),
    });
    if (!pixabayResponse.ok) {
      throw new Error('Pixabay API request failed');
    }
    const pixabayData = await pixabayResponse.json();
    const imageUrl = pixabayData.webformatURL;

    // Updating travelData with Pixabay data
    travelData.imageUrl = imageUrl;

    // Update the UI with fetched data and show the Remove Trip button
    document.getElementById('results').innerHTML = `
      <h2>Trip to ${city}, ${countryName} on ${date}</h2>
      <p>Latitude: ${lat}, Longitude: ${lng}</p>
      <p>Weather: ${forecast.weather.description}, Temp: ${forecast.temp}°C</p>
      <img src="${imageUrl}" alt="Image of ${city}">
      <button id="remove-trip" class="btn btn-danger">Remove Trip</button>
    `;

    // Ensure the Remove Trip button exists before accessing it
    const removeButton = document.getElementById('remove-trip');
    if (removeButton) {
      removeButton.style.display = 'block';
      removeButton.addEventListener('click', removeTrip);
    }

  } catch (error) {
    console.error('Error:', error);
    document.getElementById('results').innerHTML = `Error: ${error.message}`;
  }
}

// Function to remove the trip
function removeTrip() {
  // Clear the travelData object
  for (let key in travelData) {
    travelData[key] = '';
  }

  // Clear the UI and hide the Remove Trip button
  document.getElementById('results').innerHTML = '';
  const removeButton = document.getElementById('remove-trip');
  if (removeButton) {
    removeButton.style.display = 'none';
  }
}

export { handleSubmit, travelData };
