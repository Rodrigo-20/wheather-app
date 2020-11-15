
import React, { useEffect, useState } from 'react';
import SearchForm from "./components/search.js";
import Info from "./components/showInfo.js";


const apiKey = "7c7c763a7d23599ffb843b57a2459fa7";


const App = () => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(false);
  const [sucsess, setSucsess] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(0);
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(0);

  const getInfo = async (city) => {
    setSearch(true);
    try {

      const info = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, {
        mode: "cors",

      });
      const parseInf = await info.json();
      setStatus(parseInf.cod);

      updateInfo(parseInf);
      setSearch(false);

    }
    catch (error) {

      setSearch(false);
    }
  }

  const updateInfo = (data) => {
    setTemp(absTorel(data.main.feels_like));
    setCity(input);
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
  }, [status, error])

  return (
    <div className="App">
      <SearchForm input={input} handleSearch={getInfo} handleChange={handleChange} />
      {search ? <p>loading mate</p> : sucsess ? <Info temp={temp} city={city}></Info> : <p>sorry ! couldn't find the city</p>}
    </div>
  );

}
export default App;
