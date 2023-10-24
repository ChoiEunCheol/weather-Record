document.addEventListener("DOMContentLoaded", () => {
    // OpenWeather API 키
    const apiKey = "f3a8bddda0b8dca4b729e8bebb74a9ef";

    // 대전의 위도와 경도
    const latitude = 36.3504;
    const longitude = 127.3845;

    // API 엔드포인트 URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    // API 요청 보내기
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // API 응답 데이터 검사
            if (data.main && data.weather && data.weather.length > 0) {
                const weatherInfo = document.getElementById("weather-info");
                const temperature = Math.round(data.main.temp - 273.15); // 온도를 섭씨로 변환
                const description = data.weather[0].description;

                const weatherText = `현재 온도: ${temperature}°C, 날씨: ${description}`;
                weatherInfo.textContent = weatherText;
            } else {
                console.error("날씨 정보를 파싱하는 중 오류가 발생했습니다.");
            }
        })
        .catch((error) => {
            console.error("날씨 정보를 불러오는 중 오류가 발생했습니다.", error);
        });
});
