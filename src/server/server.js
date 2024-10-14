import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

// Load environment variables from .env file
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize the main project folder
app.use(express.static('dist'));

// Spin up the server
const port = 8081;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Initialize all route with a callback function
// GET route to return project data
app.get('/all', (req, res) => {
  res.send(projectData);
});

// POST route to add data
app.post('/add', (req, res) => {
  projectData = {
    temperature: req.body.temperature,
    date: req.body.date,
    feel: req.body.feel,
    city: req.body.city,
    country: req.body.country,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    weather: req.body.weather,
    imageUrl: req.body.imageUrl
  };
  res.send(projectData);
});

// Geonames API
app.post('/api/geonames', async (req, res) => {
  const { city } = req.body;
  const username = process.env.GEONAMES_USERNAME;
  const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;

  console.log('Request URL:', url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('API Response:', data);
    if (data.geonames && data.geonames.length > 0) {
      res.json(data.geonames[0]);
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch data from Geonames API.' });
  }
});

// Weatherbit API
app.post('/api/weatherbit', async (req, res) => {
  const { lat, lon } = req.body;
  const apiKey = process.env.WEATHERBIT_API_KEY;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch data from Weatherbit API.' });
  }
});

// Pixabay API
app.post('/api/pixabay', async (req, res) => {
  const { city } = req.body;
  const apiKey = process.env.PIXABAY_API_KEY;
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(city)}&image_type=photo`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.hits && data.hits.length > 0) {
      res.json(data.hits[0]);
    } else {
      res.status(404).json({ message: 'No images found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch data from Pixabay API.' });
  }
});

export default app;
