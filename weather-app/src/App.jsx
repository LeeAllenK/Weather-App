import {React , useState , useEffect} from 'react';

import {WeatherCard} from './components/WeatherCard'

import './App.css'
export default function App(){
  const [weatherData , setWeatherData] = useState('');
  const [city , setCity] = useState('Milton');
  const [getCity , setGetCity] = useState('');
   

 
  const apiKey = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b8bd1d08aa24f089a65f8c6f4b056564`

  useEffect(() => {
    async function getWeather(){
      try{
        const res = await fetch(apiKey);
        const data = await res.json();
        console.log(data)
        setWeatherData(data)
      }catch(err){
        console.error(err)
     }
    }
      // getWeather()
  },[apiKey])

  const handleCity = ()=>{
    setCity(getCity)
  }
  return(
    <div>
      <input
        type='text'
        placeholder='Search City...'
        value={getCity}
        onChange={e => setGetCity(e.target.value)}
      />
      <button onClick={handleCity}>Search</button>
      <WeatherCard
        name={weatherData.name}
        tempHI={weatherData?.main?.temp_max}
        tempLO={weatherData?.main?.temp_min}
      />
    </div>
  )
}