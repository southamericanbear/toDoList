// date stuff
const now = new Date();
const today = document.querySelector("h1");
const da = new Intl.DateTimeFormat("en", { day: "numeric" }).format(now);
const mo = new Intl.DateTimeFormat("en", { month: "long" }).format(now);
const daOfTheWeek = new Intl.DateTimeFormat("en", { weekday: "long" }).format(
  now
);
today.innerHTML = `${da} ${daOfTheWeek} ${mo}`;
// weather stuff

const key = "cYzmTT27MASzU3kEs1eZJQzOdgouEDt7";
const getTheCity = document.querySelector(".gettheweather");
const injectweather = document.querySelector(".weather");
const injectNameCity = document.querySelector(".nameOfCity");

const updateUI = (data) => {
  const cityDets = data.cityDets;
  const weather = data.weather;
  injectNameCity.innerHTML = `<h3 class="nameOfCity">${cityDets.EnglishName}</h3>`;
  injectweather.innerHTML = `<span class="weather">${weather.Temperature.Metric.Value}&deg;C</span>`;
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
};

getTheCity.addEventListener("submit", (e) => {
  e.preventDefault();
  let city = getTheCity.gettheweather.value.trim();
  getTheCity.reset();
  updateCity(city)
    .then((data) => console.log(updateUI(data)))
    .catch((err) => console.log(err));
});

// async and get the calls for the API stuff
const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};
