const injectWeather = document.querySelector(".injectWeather");

const getWeather = () => {
  let injectCity = document.querySelector(".nameOfCity");
  let injectWeather = document.querySelector(".weather");
  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "0fd94cd813d08a17339fcf01cac3d7c6";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    let latitud = position.coords.latitude;
    let longitude = position.coords.longitude;

    let url = `${api}?lat=${latitud}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let temp = data.main.temp;
        let town = data.name;
        injectCity.innerHTML = `<h3 class="nameOfCity">${town}</h3>`;
        injectWeather.innerHTML = `<span class="weather">${temp}&deg;C</span>`;
      })
      .catch((err) => console.log(err, "error"));
  }

  function error() {
    console.log("error");
  }
};

getWeather();

asfsafasfasfasfasfasf;
