
import React, { useEffect, useState } from 'react';
import SearchForm from "./components/search.js";
import Info from "./components/showInfo.js";


const apiKey = "7c7c763a7d23599ffb843b57a2459fa7";




const App = () => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(false);
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(0);

  const getInfo = async (city) => {
    const info = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, {
      mode: "cors",

    });
    const parseInf = await info.json();
    console.log(parseInf);
    getCiy(parseInf);
  }



  const getCiy = (data) => {
    console.log(absTorel(data.main.feels_like));
    setCity(input);
  }

  const absTorel = (temp) => {
    setTemp(Math.round(temp - 273.15));
  }

  const handleChange = (event) => {
    setInput(event.target.value);
    console.log(event.target.value);
  }

  useEffect(() => {

  }, [temp, city])

  return (
    <div className="App">
      <SearchForm input={input} handleSearch={getInfo} handleChange={handleChange} />
      <Info temp={temp} city={city}></Info>
    </div>
  );
}

export default App;
