import "./App.css";
import Search from "./components/search/Search";
import { weatherApiURL, weatherApiKEY } from "./api";
import { useState } from "react";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";

function App() {
  // Definimos Hooks para manejar estados de weather y forecast
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  //searchDataCities se almaceno en onSearchChange => onSearchChange={handleOnSearchChange}. Ver componente Search
  const handleOnSearchChange = (searchData) => {
    // console.log(searchData);

    // Almacenamos datos de langitude y lotitude
    const [lat, lon] = searchData.value.split(" ");

    // Realizamos call a Api de weather
    const currentWeatherFetch = fetch(
      `${weatherApiURL}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKEY}`
    );

    const forecastWeatherFetch = fetch(
      `${weatherApiURL}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKEY}`
    );

    // Condicionamos a recibir promesa de las calls con Promise.all
    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      // Definimos funcion asincrona
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        // Adicionamos valores de city almacenada antes de la call a geoApi
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  //Log datos de Api
  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="App">
      {/* Prop con funcion para manejar cambio de busqueda  */}
      <Search onSearchChange={handleOnSearchChange} />
      {/* <CurrentWeather data={currentWeather} /> */}

      {/* Si no hay datos no se renderiza el componente  */}
      {/* Pasamos data de json a componentes */}

      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
