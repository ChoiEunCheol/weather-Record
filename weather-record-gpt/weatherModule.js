let weatherData = {
    timestamp: null,
    temperature: null,
    description: null,
    location: null
};

function updateWeatherData(newData) {
    weatherData = { ...newData, timestamp: new Date() };
}

function getWeatherData() {
    return weatherData;
}

module.exports = {
    updateWeatherData,
    getWeatherData
};
