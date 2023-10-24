// API 키 설정
const API_KEY = "f3a8bddda0b8dca4b729e8bebb74a9ef";

// 현재 위치 가져오기
const currentLocation = navigator.geolocation.getCurrentPosition();

// 날씨 정보 가져오기
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.coords.latitude}&lon=${currentLocation.coords.longitude}&appid=${API_KEY}`;
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // 현재 시간 가져오기
    const now = new Date();

    // 날씨 정보 출력
    document.querySelector("h1").innerHTML = `현재 날씨: ${data.weather[0].main}`;
    document.querySelector("h2").innerHTML = `현재 온도: ${data.main.temp}°C`;
    document.querySelector("h3").innerHTML = `현재 시간: ${now.toLocaleString()}`;
  });
