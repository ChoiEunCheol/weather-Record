document.addEventListener("DOMContentLoaded", () => {
    // OpenWeather API 키
    const apiKey = "f3a8bddda0b8dca4b729e8bebb74a9ef"; // 본인의 OpenWeather API 키로 교체하세요

    // 위치 정보 가져오기
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // 위치 정보를 표시할 HTML 엘리먼트 선택
            const locationInfo = document.getElementById("location-info");

            // 위치 정보를 표시
            locationInfo.textContent = `현재 위치: 위도 ${latitude}, 경도 ${longitude}`;



            // API 엔드포인트 URL
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

            function updateWeatherData() {
                fetch(apiUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        const weatherInfo = document.getElementById("weather-info");
                        const temperature = Math.round(data.main.temp - 273.15); // 온도를 섭씨로 변환
                        const description = data.weather[0].description;
                                    // 현재 시간을 가져오기
            const now = new Date();
            const currentTimeInfo = document.getElementById("current-time");
            currentTimeInfo.textContent = `갱신 시각: ${now.toLocaleString()}`;

                        // 날씨 정보를 업데이트
                        const weatherText = `현재 온도: ${temperature}°C, 날씨: ${description}`;
                        weatherInfo.textContent = weatherText;

                        // 새로운 날씨 정보를 리스트에 추가
                        const weatherList = document.getElementById("weather-list");
                        const li = document.createElement("li");
                        li.textContent = `갱신 시각: ${now.toLocaleString()}, ${weatherText}`;

                        // 기존의 li 태그를 삭제하지 않고 업데이트
                        if (weatherList.children.length === 0) {
                            // 리스트가 비어 있으면 그냥 추가
                            weatherList.appendChild(li);
                        } else {
                            // 첫 번째 li 태그를 업데이트
                            weatherList.replaceChild(li, weatherList.lastChild);
                        }
                    })
                    .catch((error) => {
                        console.error("날씨 정보를 갱신하는 중 오류가 발생했습니다.", error);
                    });
            }

            // 초기 데이터 가져오기
            updateWeatherData();

            // 60초마다 데이터 업데이트
            setInterval(updateWeatherData, 1000); // 60초마다 요청을 갱신 (1000ms = 1초)
        });
    } else {
        console.error("브라우저에서 위치 정보를 가져올 수 없습니다.");
    }
});
