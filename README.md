# Weather Wardrobe

This is a weather application that provides current weather conditions and wardrobe recommendations based on the user's zip code. The application uses the Google Geocoding API to convert the zip code into a location, and then uses the OpenWeatherMap API to get the current weather conditions for that location. Based on the weather conditions, the application suggests appropriate clothing to wear.

## Features

- Get current weather conditions including temperature, feels like temperature, and general weather condition (e.g., Rain, Snow, Sunny, etc.)
- Receive wardrobe recommendations based on the current weather conditions
- Images change based on the current weather condition
- Images become translucent when the weather condition is neither rain nor snow
- The application is limited to the United States

## How to Use

1. Enter your zip code in the input field
2. Click the "Submit" button
3. The current weather conditions and wardrobe recommendations for your location will be displayed

## Technologies Used

- Node.js
- Express
- EJS
- Google Geocoding API
- OpenWeatherMap API

## Future Improvements

- Add a 5-day weather forecast feature
- Add a feature to save and display the last searched location's weather

Please note that this application requires API keys from Google and OpenWeatherMap to function. These keys are not included in the repository for security reasons.