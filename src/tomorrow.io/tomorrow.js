import React, { useState } from 'react';
import '../tomorrow.io/tomorrow.css';
/* using icons  */
import { IoSearchSharp } from "react-icons/io5";
/* images */
import sunny from "../images/sunny.png"; /*01d*/
import night from "../images/night.png";/*01n*/
import cloudy from "../images/cloudy.png"/*02d*/
import cloudy1 from "../images/cloudynight.png" /*04d*/
import rainy from "../images/rainy-l.png"; /*09d*/
import rain from "../images/rainy.png"; /*10d*/
import stormy from "../images/stormy.png"; /*11d*/ 
import snowy from "../images/snowy.png";/*13d*/

const WeatherDetails =({icon ,temp ,city, lat,log})=>{
  return(
    <div>
        <div className='image'>
          <img src={icon} alt='sunny'/>
        </div>
        <div className='temp'>{temp}°C</div>
        <div className='location'>{city}</div>
        <div className='cord'>
          <div>
            <span className='lat'>Latitude</span>
            <span>{lat}</span>
          </div>
          <div>
            <span className='log'>Longitude</span>
            <span>{log}</span>
          </div>
        </div>
    </div>
  )
}

function Tomorrow() {
  const [icon,setIcon]=useState(sunny);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("");
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);

  const [text,setText]=useState("chennai");

  const [cityNotFound,setCityNotFound]=useState(false);
  const [loading,setLoading]=useState(false);

  const weatherIconMap ={
    "01d":sunny,
    "01n":night,
    "02d": cloudy,
    "04d": cloudy1,
    "04n":cloudy1,
    "09d":rainy,
    "10d":rain,
    "11d":stormy,
    "13d":snowy,
  }

  const handleCity =(e)=>{
    setText(e.target.value);
  };
  const handleKeyDown=(e)=>{
     if (e.key === "Enter"){
      search();
     }
  };
  const search=async () =>{
    setLoading(true);
    
    let APIkey= "4c0abcb2c3ce14325cb7a1fc7edf5307"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${APIkey}&units=Metric`;
    
    try{
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if (data.cod === "404"){
        console.log("city Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setLat(data.coord.lat);
      setLog(data.coord.lon);  
      const weatherIconCode = data.weather[0].icon;  
      setIcon(weatherIconMap[weatherIconCode] || sunny);
      cityNotFound(false);
    }
    catch(error){
        console.error("An error occurred:",error.message);
    }
    finally{
      setLoading(false);

    }
  }

  return (
    <div className='Container'>
        <div className='inputContainer'>
              <input type='text' placeholder='Enter Your City' className='cityInput' onChange={handleCity} onKeyDown={handleKeyDown} value={text}></input>
              <div className='searchIcon' onClick={()=>search()}><IoSearchSharp /></div>
        </div>  
        <WeatherDetails icon={icon} temp={temp} city={city} lat={lat} log={log}/>    
    </div>
  )
}

export default Tomorrow;