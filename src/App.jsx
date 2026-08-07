import { useState } from "react";
import "./App.css";

import {
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiRain,
  WiCloudy,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

import { FiSearch } from "react-icons/fi";


function App() {

  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [weatherType, setWeatherType] = useState("sunny");


  const [weather, setWeather] = useState({

    city: "Lahore",
    temperature: "32°C",
    condition: "Sunny",
    humidity: "65%",
    wind: "12 km/h",
    pressure: "1008 hPa",
    uv: "6",
    icon: <WiDaySunny />

  });



  const getWeatherInfo = (code) => {

    if(code === 0)
      return {
        text:"Sunny",
        icon:<WiDaySunny />,
        type:"sunny"
      };


    if(code >=1 && code <=3)
      return {
        text:"Cloudy",
        icon:<WiCloudy />,
        type:"cloudy"
      };


    if(code >=45 && code <=48)
      return {
        text:"Fog",
        icon:<WiFog />,
        type:"cloudy"
      };


    if(code >=51 && code <=82)
      return {
        text:"Rain",
        icon:<WiRain />,
        type:"rain"
      };


    if(code >=95)
      return {
        text:"Thunderstorm",
        icon:<WiThunderstorm />,
        type:"storm"
      };


    return {
      text:"Sunny",
      icon:<WiDaySunny />,
      type:"sunny"
    };

  };



  const updateWeather = (data,name)=>{

    const current = data.current;

    const info = getWeatherInfo(
      current.weather_code
    );


    setWeatherType(info.type);


    setWeather({

      city:name,

      temperature:
      `${Math.round(current.temperature_2m)}°C`,

      condition:info.text,

      humidity:
      `${current.relative_humidity_2m}%`,

      wind:
      `${current.wind_speed_10m} km/h`,

      pressure:
      `${current.pressure_msl} hPa`,

      uv:
      current.uv_index,

      icon:info.icon

    });



    const daily = data.daily;


    const newForecast =
    daily.time.slice(0,5).map((date,index)=>{


      const info =
      getWeatherInfo(
        daily.weather_code[index]
      );


      return {

        day:new Date(date).toLocaleDateString(
          "en-US",
          {
            weekday:"short"
          }
        ),

        icon:info.icon,

        temp:
        `${Math.round(
          daily.temperature_2m_max[index]
        )}°C`

      };


    });


    setForecast(newForecast);

  };




  const handleSearch = async()=>{


    if(city.trim()===""){

      alert("Please enter a city name");
      return;

    }


    try{


      const geo =
      await fetch(

      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`

      );


      const geoData =
      await geo.json();



      if(!geoData.results){

        alert("City not found");
        return;

      }


      const {

        latitude,
        longitude,
        name

      } = geoData.results[0];



      const response =
      await fetch(

      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,pressure_msl,uv_index,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`

      );



      const data =
      await response.json();


      updateWeather(data,name);



    }

    catch(error){

      console.log(error);
      alert("Something went wrong");

    }


  };





  const getCurrentLocation = ()=>{


    navigator.geolocation.getCurrentPosition(

      async(position)=>{


        try{


          const lat =
          position.coords.latitude;

          const lon =
          position.coords.longitude;



          const response =
          await fetch(

          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,pressure_msl,uv_index,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`

          );



          const data =
          await response.json();



          updateWeather(
            data,
            "Current Location"
          );


        }

        catch(error){

          console.log(error);
          alert("Unable to get weather");

        }


      },


      ()=>{

        alert("Location permission denied");

      }


    );


  };





return (

<div className={`container ${weatherType}`}>


<div className="card">


<h1 className="logo">
Skyntic
</h1>


<p className="tagline">
Know Your Weather Instantly
</p>



<div className="search-box">


<input

type="text"

placeholder="Search a city..."

value={city}

onChange={(e)=>setCity(e.target.value)}

/>


<button
className="search-btn"
onClick={handleSearch}
>

<FiSearch />

</button>


</div>



<button
className="location-btn"
onClick={getCurrentLocation}
>

📍 Current Location

</button>




<div className="weather">


<div className="weather-icon">

{weather.icon}

</div>


<h2 className="temperature">

{weather.temperature}

</h2>


<h3 className="city">

{weather.city}

</h3>


<p className="condition">

{weather.condition}

</p>


</div>




<div className="details">


<div className="detail-card">

<WiHumidity className="detail-icon"/>

<h4>Humidity</h4>

<p>{weather.humidity}</p>

</div>



<div className="detail-card">

<WiStrongWind className="detail-icon"/>

<h4>Wind</h4>

<p>{weather.wind}</p>

</div>



<div className="detail-card">

<WiBarometer className="detail-icon"/>

<h4>Pressure</h4>

<p>{weather.pressure}</p>

</div>



<div className="detail-card">

<WiDaySunny className="detail-icon"/>

<h4>UV Index</h4>

<p>{weather.uv}</p>

</div>


</div>




<h3 className="forecast-title">
5-Day Forecast
</h3>



<div className="forecast">


{
forecast.map((item,index)=>(

<div className="forecast-row" key={index}>


<span>{item.day}</span>

<span>{item.icon}</span>

<span>{item.temp}</span>


</div>

))
}


</div>



</div>

</div>


);


}


export default App;