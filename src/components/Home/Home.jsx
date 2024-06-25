import React, { useState } from 'react'
import '../Home/Home.css';
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
export default function Home() {

    const [city , setCity] = useState('');
    const [weather , setWeather] = useState();
    const [error , setError] = useState('');

    const API_KEY = "1bba1420b17b626c8827c5e5332a5a84";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

   
    async function fetchData() {
      try{
        let response = await fetch(url);
        let output = await response.json();
        
        if(response.ok ){
          setWeather(output);
          setError('');  
        }
        else{
          setError('No data found. please Enter valid city name');
          setWeather('');
        }
      }
      catch (error){
        console.log(error);
       
      }
    }


  return (
    <div className='container'>
        <div className="city">
            <input type='text' value={city} onChange={(e)=>{setCity(e.target.value)}} placeholder='Enter your city name'></input>
            <button onClick={()=>fetchData()}><FaSearch /></button>
        </div>

      {
        error && <p className='error-massage'>{error}</p>
      }

      {
        weather && weather.weather &&
        <div className="content">
          <div className="weather-image">
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <h3 className='desc'>{weather.weather[0].description}</h3>
          </div>

          <div className="weather-temp">
            <h2>{weather.main.temp}<span> °C</span></h2>
          </div>
          <div className="weather-city">
            <div className="lacation">
            <FaLocationDot />
          </div>
            <p>{weather.name}<span>{weather.sys.country}</span></p>
          </div>

          <div className="weather-stats">
            <div className="wind">
                <div className="wind-icon">
                <FaWind />
                </div>
                <h3 className='wind-speed'>{weather.wind.speed}<span>Km/h</span></h3>
                <h3 className='wind-heading'>WIND SPEED</h3>
            </div>

            <div className="humidity">
              <div className="humidity-icon">
              <WiHumidity />
              </div>
              <h3 className='humidity-percent'>{weather.main.humidity}<samp>%</samp></h3>
              <h3 className='humidity-heading'>HUMIDITY</h3>
            </div>
          </div>
        </div>
      }
       
    </div>
  )
}
