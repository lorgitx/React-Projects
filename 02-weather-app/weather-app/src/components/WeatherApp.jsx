import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Information from "./Information";
import "./WeatherApp.css";

function WeatherApp() {
  //States
  const [noCity, setNoCity] = useState(true);
  const [citySearch, setCitySearch] = useState("");
  const [dataCity, setDataCity] = useState({});

  function handleSearch(city) {
    if (city == "") {
      setNoCity(true);
      return;
    }

    //console.log("handleSearch", city);

    setCitySearch(city);
  }

  // Return a promise
  const fetchWeatherAPI = useCallback(() => {
    return fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${
        import.meta.env.VITE_WEATHER_API
      }&q=${citySearch}&days=1&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error", error);
        throw error;
      });
  }, [citySearch]);

  useEffect(() => {
    if (citySearch != "") {
      fetchWeatherAPI()
        .then((data) => {
          //console.log(data);
          setDataCity(data);          
          setNoCity(false);
        })
        .catch((error) => {
          console.error("error", error);
        });
    }
  }, [citySearch, fetchWeatherAPI]);

  return (
    <div className="weatherApp">
      <div className="appContainer">
        <Header search={handleSearch} />
        {!noCity && <Information data={dataCity} />}
      </div>
    </div>
  );
}

export default WeatherApp;
