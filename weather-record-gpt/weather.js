document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "f3a8bddda0b8dca4b729e8bebb74a9ef"; // OpenWeather API 키

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const locationInfo = document.getElementById("location-info");
            locationInfo.textContent = `현재 위치: 위도 ${latitude}, 경도 ${longitude}`;

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

            function updateWeatherData() {
                fetch(apiUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        const weatherInfo = document.getElementById("weather-info");
                        const temperature = Math.round(data.main.temp - 273.15);
                        const description = data.weather[0].description;

                        const now = new Date();
                        const currentTimeInfo = document.getElementById("current-time");
                        currentTimeInfo.textContent = `갱신 시각: ${now.toLocaleString()}`;

                        const weatherText = `현재 온도: ${temperature}°C, 날씨: ${description}`;
                        weatherInfo.textContent = weatherText;

                        const weatherList = document.getElementById("weather-list");

                        // 자식 li 태그가 168개 이상이면 가장 오래된 것 삭제
                        if (weatherList.children.length >= 168) {
                            weatherList.removeChild(weatherList.lastChild);
                        }

                        const li = document.createElement("li");
                        li.textContent = `갱신 시각: ${now.toLocaleString()}, ${weatherText}`;
                        weatherList.insertBefore(li, weatherList.firstChild);
                    })
                    .catch((error) => {
                        console.error("날씨 정보를 갱신하는 중 오류가 발생했습니다.", error);
                    });
            }

            updateWeatherData();

            setInterval(updateWeatherData, 1000); // 10초마다 요청을 갱신 (1000ms = 1초)
        });
    } else {
        console.error("브라우저에서 위치 정보를 가져올 수 없습니다.");
    }
});
