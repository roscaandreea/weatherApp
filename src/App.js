import React, {useState,setState} from 'react';

const api={
  key:"b7143a583d6f35bd85f7a501cf82a2bd",
  base:"https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState({});
  const weatherIcons={
    Thunderstorm:"wi-thunderstorm",
    Drizzle:"wi-sleet",
    Rain:"wi-storm-showers",
    Snow:"wi-snow",
    Atmosphere:"wi-fog",
    Clear:"wi-day-sunny",
    Clouds:"wi-day-fog"
};

  const get_weatherIcon = (icon,rangeId) =>{
    switch(true){
      case rangeId >=200 && rangeId <=232:
        setState({icon:weatherIcons.Thunderstorm});
        break;
      case rangeId >=300 && rangeId <=321:
        setState({icon:weatherIcons.Drizzle});
       break;
      case rangeId >=500 && rangeId <=522:
        setState({icon:weatherIcons.Rain});
        break;
      case rangeId >=600 && rangeId <=622:
        setState({icon:weatherIcons.Snow});
        break;
      case rangeId >=701 && rangeId <=781:
        setState({icon:weatherIcons.Atmosphere});
        break;
      case rangeId === 800:
        setState({icon:weatherIcons.Clear});
        break;
      case rangeId >=801 && rangeId <=804:
        setState({icon:weatherIcons.Clouds});
        break;
        default:
        //setState({icon:weatherIcons.Clouds});
  }
  }
 
  const search = env =>{
    if(env.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
         setWeather(result);
         setQuery('');
         console.log(result);
      });

    }
  }

  const dateBuilder = (d) =>{
    let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return [day,' ',date,' ',month,' ',year];
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App cold') : 'App'}>
      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ?(
        <div>
          <div className="location-box">
            <div className="location">{weather.name},{weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
         </div>
        <div className="weather-box">
          <div className="temp">
           {Math.round(weather.main.temp)}°c
          </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        <div className="other-value">
          <div className="humidity-container">
            <div className="humidity-title">Humidity</div>
            <div className="humidity-value">{Math.round(weather.main.humidity)}%</div>
          </div>
          <div className="pressure-container">
            <div className="pressure-title">Pressure</div>
            <div className="pressure-value">{Math.round(weather.main.pressure)}kN/m²</div>
          </div>
          <div className="feel-like-container">
            <div className="feel-like-title">Feels like</div>
            <div className="feel-like-value">{Math.round(weather.main.feels_like)}°c</div>
          </div>
        </div>
      </div>
       ) :('')}
    </main>
    </div>
  );
}

export default App;
