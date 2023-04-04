import React from 'react';
import './SearchBar.css';
const SearchBar = ({ setLat, setLon, getWeather }) => {
  const searchBycity = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=00ce3cbe5164b0438313a3f261362d8a`,
      );
      const cityInfo = await res.json();

      // console.log(cityInfo[0].lat, cityInfo[0].lon);
      // setLat(cityInfo[0].lat);
      // setLon(cityInfo[0].lon);
      getWeather(cityInfo[0]?.lat, cityInfo[0]?.lon);
    } catch (error) {
      console.log(error);
    }
  };
  const handleForm = (e) => {
    e.preventDefault();
    console.log(e.target.cityName.value);
    searchBycity(e.target.cityName.value);
  };
  return (
    <form className="form-control w-full max-w-xs mx-auto" onSubmit={handleForm}>
      <label className="label">
        <span className="label-text">Search by city</span>
      </label>
      <input
        id="cityName"
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
      />
      <button className="mt-5 bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Get info</button>
    </form>
  );
};

export default SearchBar;
