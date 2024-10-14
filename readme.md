# Travel App

## Project Description
The Travel App allows users to input a location and receive relevant travel information including weather, local images, and geographic data. Users can add and remove trips, making it a handy tool for planning your next adventure.

## Features
- **Search**: Enter a city to get geographic data.
- **Weather Information**: Get the current weather and forecast for your destination.
- **Local Images**: View images related to the location.
- **Add/Remove Trips**: Easily add and remove trips for better planning.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [API Integration](#api-integration)
- [Development](#development)

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/travel-app.git
    ```
2. Navigate to the project directory:
    ```sh
    cd travel-app
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage
1. Create a `.env` file in the root of the project and add your API keys:
    ```
    GEONAMES_USERNAME=your_geonames_username
    WEATHERBIT_API_KEY=your_weatherbit_api_key
    PIXABAY_API_KEY=your_pixabay_api_key
    ```
2. Start the development server:
    ```sh
    npm run dev
    ```
3. Open `http://localhost:8080` in your browser and enter a city in the provided form.

## Project Structure
Root
├── package.json
├── readme.md
├── src
│   ├── client
│   │   ├── index.js
│   │   ├── js
│   │   │   └── app.js (name will vary)
│   │   ├── styles
│   │   │   └── style.scss (name will vary)
│   │   └── views
│   │       └── index.html 
│   └── server
│       └── server.js (name will vary)
└── webpack.config.js


## Dependencies
### Production Dependencies
- `dotenv`: ^16.4.5
- `express`: ^4.21.0
- `jest-fetch-mock`: ^3.0.3
- `node-fetch`: ^2.6.0
- `supertest`: ^7.0.0
- `webpack`: ^5.95.0
- `webpack-cli`: ^5.1.4

### Development Dependencies
- `@babel/core`: ^7.25.2
- `@babel/plugin-transform-modules-commonjs`: ^7.24.8
- `@babel/preset-env`: ^7.25.8
- `babel-jest`: ^29.7.0
- `babel-loader`: ^9.2.1
- `body-parser`: ^1.20.3
- `clean-webpack-plugin`: ^4.0.0
- `cors`: ^2.8.5
- `css-loader`: ^7.1.2
- `html-webpack-plugin`: ^5.6.0
- `jest`: ^29.7.0
- `sass`: ^1.79.3
- `sass-loader`: ^16.0.2
- `style-loader`: ^4.0.0
- `webpack-dev-server`: ^5.1.0
- `workbox-webpack-plugin`: ^7.1.0
- `supertest`: ^6.1.3

## API Integration
- **Geonames API**
    - Provides geographical data based on city input.
- **Weatherbit API**
    - Delivers weather information for the destination.
- **Pixabay API**
    - Fetches images related to the location.

## Development
### Scripts
- **Start Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Run Tests**: `npm run test`

### Testing
- Jest and Supertest are used for unit and integration tests.
- Ensure your tests cover both client-side and server-side code.

### Webpack Configuration
- Combined setup for development and production modes with dynamic loading.

This README covers your app and dependencies comprehensively. Ready to share or any final touches? Let’s make it stellar!