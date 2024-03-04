import React, { useState } from 'react';
import '../tomorrow.io/tomorrow.css';
/* using icons  */
import { IoSearchSharp } from "react-icons/io5";
/* images */
import sunny from "../images/sunny.png";

const WeatherDetails =({icon ,temp ,city, hum,uv})=>{
  return(
    <div>
        <div className='image'>
          <img src={icon} alt='sunny'/>
        </div>
        <div className='temp'>{temp}°C</div>
        <div className='location'>{city}</div>
        <div className='cord'>
          <div>
            <span className='humidity'>humidity</span>
            <span>{hum}</span>
          </div>
          <div>
            <span className='uv'>uvIndex</span>
            <span>{uv}</span>
          </div>
        </div>
    </div>
  )
}

function Tomorrow() {
  const [icon,setIcon]=useState(sunny);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState();
  const [humidity,sethumidity]=useState(0);
  const [uv,setUv]=useState(0);

  const [text,setText]=useState("chennai");

  const [cityNotFound,setCityNotFound]=useState(false);
  const [loading,setLoading]=useState(false);

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

    let url = `https://api.tomorrow.io/v4/weather/forecast?location=${text}&apikey=tBpezqW8cmShZ634b1dt6yrfJw1JMWkD`;
    
    try{
      let res =await fetch(url);
      let data=await res.json();
      if (data.cod === "404"){
        console.log("city Not Found")
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setTemp(data.timelines.minutely.values.temperature);
      setCity();
      
    }
    catch (error){
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
        <WeatherDetails icon={icon} temp={temp} city={city} hum={humidity} uv={uv}/>    
    </div>
  )
}

export default Tomorrow;