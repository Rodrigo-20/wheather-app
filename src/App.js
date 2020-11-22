import React, { useEffect, useState } from 'react';
import SearchForm from "./components/search.js";
import Info from "./components/showInfo.js";
import Error from "./components/error.js"
import Loading from "./components/loading.js"
import { getName } from 'country-list';
import './App.scss'
import costumizeByTime from './costum.js';
import Header from "./components/header.js"

const apiKey = "7c7c763a7d23599ffb843b57a2459fa7";



const date = new Date();
const hour = date.getHours();
const min = date.getMinutes();

const localTimeZone = -3

const addZeroToMin = (m) => {

  const min = m.toString().length >= 2
    ? m
    : "0".concat(m);
  return min;
}

const App = () => {


  const [input, setInput] = useState("");
  const [search, setSearch] = useState(false);
  const [sucsess, setSucsess] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temp, setTemp] = useState(0);
  const [hours, setHours] = useState(hour);
  const [minutes, setMinutes] = useState(addZeroToMin(min));
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");


  const getInfo = async (city) => {

    setSearch(true);
    try {
      const info = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, {
        mode: "cors",

      });
      const parseInf = await info.json();
      console.log(parseInf);
      setStatus(parseInf.cod);
      updateInfo(parseInf);
      setSearch(false);


    }
    catch (error) {

      setSearch(false);
    }
  }



  const updateInfo = (data) => {
    let first = "";
    setTemp(absTorel(data.main.feels_like));
    setCity(data.name);
    setCountry(getName(data.sys.country));
    setHours((hour - localTimeZone + (data.timezone / 3600) + 24) % 24);
    getIcon(data.weather[0].icon);
    first = data.weather[0].description.split("")[0].toUpperCase();
    setDescription(first.concat(data.weather[0].description.substr(1)));
    console.log(data);

  }

  const getIcon = async (icon) => {
    const sourc = await fetch(`http://openweathermap.org/img/wn/${icon}@2x.png`, {
      mode: "cors"
    });
    if (sourc.ok) {
      setSource(sourc.url);
    }
  }

  const absTorel = (temp) => {
    return Math.round(temp - 273.15);
  }

  const handleChange = (event) => {
    setInput(event.target.value);
    console.log(event.target.value);
  }

  const handleError = (code) => {

    if (code !== 200) {
      setSucsess(false);
      switch (code) {
        case "404":
          setError("city not found")
          break;
        default:
          setError("Unknown error, code : " + code);
      }
    }
    else {
      setSucsess(true);
    }

  }

  useEffect(() => {

    handleError(status);
    console.log(error);
    costumizeByTime(hours);
  }, [status, error, hours]);



  return (
    <div className="App">
      <Header ></Header>
      <SearchForm input={input} handleSearch={getInfo} handleChange={handleChange} />
      {search ?
        <Loading />
        : sucsess ?
          <Info temp={temp} city={city} country={country} hours={hours} minutes={minutes} source={source} desc={description}></Info>
          : status == "0" ?
            null
            : <Error error={error} />
      }
    </div>
  );

}
export default App;
