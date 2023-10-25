document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "f3a8bddda0b8dca4b729e8bebb74a9ef"; // OpenWeather API 키

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const locationInfo = document.getElementById("location-info");
            locationInfo.textContent = `현재 위치: 위도 ${latitude}, 경도 ${longitude}`;

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

            // 그래프 요소 선택
            const chartCanvas = document.getElementById("temperature-chart");

            // 데이터 배열 초기화
            const data = [];

            // 그래프 설정
            const ctx = chartCanvas.getContext("2d");
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '온도 (°C)',
                        data: [],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        fill: false,
                    }]
                },
                options: {
                    scales: {
                        x: {
                            beginAtZero: true
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            function updateWeatherData() {
                fetch(apiUrl)
                    .then((response) => response.json())
                    .then((weatherData) => {
                        const temperature = Math.round(weatherData.main.temp - 273.15);

                        const now = new Date();
                        const seconds = now.getSeconds();

                        // 데이터 배열에 시간과 온도 추가
                        data.push({ time: now.toLocaleString(), temperature });

                        // 데이터 배열 길이가 168을 초과하는 경우, 오래된 데이터 삭제
                        if (data.length > 168) {
                            data.shift();
                        }

                        // 그래프 데이터 업데이트
                        chart.data.labels = data.map(entry => entry.time);
                        chart.data.datasets[0].data = data.map(entry => entry.temperature);
                        chart.update();

                        // 나머지 업데이트 코드는 이전 코드와 동일
                        const weatherInfo = document.getElementById("weather-info");
                        const description = weatherData.weather[0].description;
                        const currentTimeInfo = document.getElementById("current-time");
                        currentTimeInfo.textContent = `갱신 시각: ${now.toLocaleString()}`;
                        const weatherText = `현재 온도: ${temperature}°C, 날씨: ${description}`;
                        weatherInfo.textContent = weatherText;

                        const weatherList = document.getElementById("weather-list");

                        // 자식 li 태그가 168개 이상이면 가장 오래된 것 삭제
                        if (weatherList.children.length >= 168) {
                            weatherList.removeChild(weatherList.lastChild);
                        }
                    })
                    .catch((error) => {
                        console.error("날씨 정보를 갱신하는 중 오류가 발생했습니다.", error);
                    });
            }

            // 초기 실행 후 10초마다 갱신, 시작 시간 조절
            const currentSecond = new Date().getSeconds();
            const startDelay = (10 - (currentSecond % 10)) * 1000;
            setTimeout(() => {
                updateWeatherData();
                setInterval(updateWeatherData, 10000); // 10초마다 요청을 갱신
            }, startDelay);
        });
    } else {
        console.error("브라우저에서 위치 정보를 가져올 수 없습니다.");
    }
});