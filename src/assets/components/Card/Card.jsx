import React, { useEffect, useState } from 'react';
import './Card.css';
import Button from '../Button/Button';
import Background from '../Background/Background';
import SearchBar from '../SearchBar/SearchBar';

const Card = () => {
  const [position, setPosition] = useState(null);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [temperature, setTemperature] = useState(0);
  const [temperatureChanged, setTemperatureChanged] = useState(false);
  // const [lat, setLat] = useState(null);
  // const [lon, setLon] = useState(null);
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // pos = !position ? setPosition(pos) : setPosition(position);
        if (!position) {
          setPosition(pos);
        } else {
          setPosition(position);
          // setLat(position.coords.latitude);
          // setLat(position.coords.longitude);
          getWeather(position.coords.latitude, position.coords.longitude);
        }
      },
      () => alert('El usuario no ha dado permisos de geolocalización'),
    );
  };

  const getCity = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=00ce3cbe5164b0438313a3f261362d8a`,
    );
    const data = await response.json();
    console.log(data[0]);
    setCity(data[0]);
  };

  const getWeather = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=00ce3cbe5164b0438313a3f261362d8a`,
    );
    let data = await response.json();
    setWeather(data);
    setTemperature(data.current.temp - 273.15);
    getCity(lat, lon);
    console.log('Logo clima: ', data.current.weather[0].main);
  };
  useEffect(() => {
    getLocation();
  }, [position]);
  const date = new Date(weather?.current.dt * 1000).toLocaleDateString();

  return (
    <div className="content w-2/12 flex flex-col min-w-fit border-solid rounded-x5">
      <SearchBar getWeather={getWeather}></SearchBar>
      <div className="card flex  px-10">
        <div className="background"></div>
        <div className="title my-4 relative z-10">
          <h2 className="text-5xl">{`${(temperature || 0).toFixed(2)}°`}</h2>
        </div>
        <div>
          <img
            className="absolute w-4/12 top-12 right-0 z-10"
            src={`http://openweathermap.org/img/wn/${weather?.current.weather[0].icon}@2x.png`}
            // src={getLogo(weather?.current.weather[0].main)}
            alt=""
          />
        </div>
        <div className="body relative z-10">
          <h6>{date || new Date().toLocaleDateString()}</h6>
          <h6>{`Wind speed: ${weather?.current.wind_speed}`}</h6>
          <h6>{`Weather: ${weather?.current.weather[0].main || 'Weather'}`}</h6>
          <h6>{`Pressure: ${weather?.current.pressure}`}</h6>
        </div>
        <div className="bottom flex space-x-2 my-3 relative z-10">
          <span className="font-semibold">
            {city?.name || 'City'}, {city?.country || 'Country'}
          </span>
          <span>{`Cloud: ${weather?.current.clouds}`}</span>
        </div>
      </div>
      <Button
        temperature={temperature}
        setTemperature={setTemperature}
        temperatureChanged={temperatureChanged}
        setTemperatureChanged={setTemperatureChanged}
      ></Button>
    </div>
  );
};

export default Card;
