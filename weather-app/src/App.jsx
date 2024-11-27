import {React , useState , useEffect} from 'react';

import {WeatherCard} from './components/WeatherCard'
import {DefaultCard} from './components/DefaultCard'
import './App.css'


export default function App(){
  const [geoData , setGeoData] = useState('');
  const [weatherData , setWeatherData] = useState('');
  const [city , setCity] = useState('');
  const [getCity , setGetCity] = useState('');
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [info , setInfo] = useState(
    {
      sunrise: '',
      sunset: ''

    }
    )

 
  const apiKeyCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b8bd1d08aa24f089a65f8c6f4b056564`
  const apiKey = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b8bd1d08aa24f089a65f8c6f4b056564`
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    async function getWeather(){
      try{
        const res = await fetch(apiKey);
        const data = await res.json();
        const cityRes = await fetch(apiKeyCity);
        const dataCity = await cityRes.json();
        setGeoData(data )
        setWeatherData(dataCity)
        const sunRise = new Date(dataCity?.sys?.sunrise)
        const sunSet = new Date(dataCity?.sys?.sunset)
        setInfo({
        sunrise:sunRise.toString(),
        sunset: sunSet.toString()
          
        })
      }catch(err){
        return err;
     }
    }
      // getWeather()
  },[apiKey ,apiKeyCity, lat, long])

 function handleCity(){
   setCity(getCity);
  }

  return(
    <div className='App'>

      <div className='sectionSidebar'>
       <input
        className='input'
         type='text'
         placeholder='Search City...'
         value={getCity}
         onChange={e => setGetCity(e.target.value)}
       />
      <button onClick={(e) => {
            e.preventDefault();
            handleCity();
          }}>
          Search</button>
        <div>Icon</div>
        <div>Description</div>
      </div>
      <section className='sectionMain'>
      {  city.length > 0 ? (
      
        <WeatherCard
            name={weatherData.name}
            description={weatherData?.weather?.description}
            tempHi={weatherData?.main?.temp_max}
            tempLo={weatherData?.main?.temp_min}
          /> 
      ): (
            <WeatherCard
              name={geoData.name}
              description={weatherData?.weather?.description}
              tempHi={geoData?.main?.temp_max}
              tempLo={geoData?.main?.temp_min}
            /> 
    
      )}
      
    <section className='sectionData'>
      <DefaultCard
      name='Humidity'
      defaultData={weatherData?.main?.humidity}  

      />
      <DefaultCard
      name='Speed'
      defaultData={weatherData?.wind?.speed}  
      />
      <DefaultCard
      name='Gust'
      defaultData={weatherData?.wind?.gust}  
      />
      <DefaultCard
      name='Feels Like'
      defaultData={weatherData?.main?.feels_like}  
      />
      <DefaultCard
      name='Icon'
      defaultData={weatherData?.icon}  
      />
      <DefaultCard
      name='Pressure'
      defaultData={weatherData?.main?.pressure}  
      />
      <DefaultCard
      name='Sunrise'
      defaultData={info.sunrise.toString()}  
      />
      <DefaultCard
      name='Sunset'
            defaultData={info.sunset.toString()}
      />
      </section>
      </section>
    </div>
  )
}