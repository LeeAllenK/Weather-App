import {React , useState , useEffect} from 'react';
import moment from 'moment';
import {WeatherCard} from './components/WeatherCard'
import {DefaultCard} from './components/DefaultCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';

import Home from './components/home'
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
      sunset: '',
      sunriseGeo: '',
      sunsetGeo: ''
    }
    )
  const [forecastGeo , setForecastGeo] = useState([]);
  const [forecastCity , setForecastCity] = useState([]);

  const apiKeyCity = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b8bd1d08aa24f089a65f8c6f4b056564`
  const apiKey = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=b8bd1d08aa24f089a65f8c6f4b056564`
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    async function getLocation(){
      try{
        const res = await fetch(apiKey);
        const data = await res.json();

        const fiveDay = data.list.filter((d , i) => i % 8 === 0 )
        const sunRise = new Date(data?.city?.sunrise * 1000).toLocaleTimeString('en-US')
        const sunSet = new Date(data?.city?.sunset * 1000).toLocaleTimeString('en-US')
      setGeoData(data);
      setForecastGeo(fiveDay)
      setInfo({
      sunriseGeo: sunRise,
      sunsetGeo: sunSet
      })
      }catch(err){
        return err;
     }
    }
      getLocation()
  },[apiKey , lat, long])
  useEffect(() => {
    const getWeather = async () => {
      try{
        const res = await fetch(apiKeyCity);
        const data = await res.json();
        const sunRise = new Date(data?.city?.sunrise * 1000).toLocaleTimeString('en-US')
        const sunSet = new Date(data?.city?.sunset * 1000).toLocaleTimeString('en-US')
        const fiveDay = data?.list?.filter((d, i) => i % 8 === 0)
    
        if(!data || !Array.isArray(fiveDay)) {
           console.error("Data is missing or not an array"); 
            return null; 
        }
        setWeatherData(data);
        setInfo({
          sunrise: sunRise,
          sunset: sunSet
        })
        setForecastCity(fiveDay)
        console.log(fiveDay)
        console.log(data)
      }catch(err){
        return err;  
      }
    }
      getWeather()
  },[apiKeyCity])

 function handleCity(){
   setCity(getCity);
  }
  const changeToFah = (k) => {
    if(k > 0){
    return Math.floor(((k - 273.15)* 9/5) + 32);
    }
  }
  return(
    <div className='App'>
      <Home>
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}  
        />
      </Home>
      <div className='sectionSidebar'>
      <div className='inputBorder'>
       <input
        className='input'
         type='text'
         placeholder='Search City...'
         value={getCity}
         onChange={(e) => setGetCity(e.target.value)}
       />
      {getCity.length > 0 && 
        <FontAwesomeIcon
          icon={faLocationArrow}
          className='fontIcon'
          style={{cursor: 'pointer'}}
            onClick={(e) => {
              e.preventDefault();
              handleCity();
            }}
        />
      }
      </div>
      <br/>
        {city.length > 0 ? (
          <div className='sidebarContents'>
              <img className='sideImg' alt='No image' src={`http://openweathermap.org/img/w/${weatherData ? weatherData?.list[0]?.weather[0]?.icon : ''}.png`} />
            <div >{changeToFah(weatherData ? weatherData?.list[0]?.main.temp : '')}&deg;</div><br/> 
              <div >{weatherData ? weatherData?.list[0]?.weather[0].description : ''}</div>
          </div>
        ): (
            <div className='sidebarContents'> 
          <img className='sideImg' alt='No image' src={`http://openweathermap.org/img/w/${geoData ? geoData?.list[0]?.weather[0]?.icon : ''}.png`}/>
        <div >{changeToFah(geoData ? geoData?.list[0]?.main.temp : '')}&deg;</div><br/>
        <div >{geoData ? geoData?.list[0]?.weather[0].description : ''}</div>
        </div>
        )}
      </div>
      <section className='sectionMain'>
            {city.length > 0 ? (
              <>
              {weatherData  && weatherData.city && weatherData.list && weatherData.list.length > 0 ? (
                <WeatherCard
                  name={weatherData?.city?.name}
                  description={weatherData ? weatherData?.list[0]?.weather[0].description: ''}
                  temp={changeToFah(weatherData ? weatherData?.list[0]?.main?.temp : '')}
                  tempHi={changeToFah(weatherData ? weatherData?.list[0]?.main?.temp_max : '')}
                  tempLo={changeToFah(weatherData ? weatherData?.list[0]?.main?.temp_min : '')}
                  sunrise={info.sunrise}
                  sunset={info.sunset}
                  day={moment().format('dddd')}
                  date={moment().format('LL')}
                  icon={`http://openweathermap.org/img/w/${weatherData ? weatherData?.list[0]?.weather[0]?.icon : ''}.png`}
                />
              ): (
                  <div></div>      
                )}
            <section className='defSec'>
              {forecastCity.map((f, i) => (
                <DefaultCard
                  key={i}
                  day={moment(f.dt_txt).format('dddd')}
                description={f.weather[0].description}
                icon={`http://openweathermap.org/img/w/${f ? f.weather[0].icon : ''}.png`}
                temp={changeToFah(f.main.temp)}
                tempHi={changeToFah(f.main.temp_max)}
                tempLo={changeToFah(f.main.temp_min)}
                />
              ))}
            </section>
              </>
            ):(
               <WeatherCard
                name={geoData?.city?.name}
                description={geoData ? geoData?.list[0]?.weather[0].description : ''}
                temp={changeToFah(geoData ? geoData?.list[0]?.main?.temp_max : '')}
                tempHi={changeToFah(geoData ? geoData?.list[0]?.main?.temp_max: '')}
                tempLo={changeToFah(geoData ? geoData?.list[0]?.main?.temp_min : '')}
                sunrise={info.sunriseGeo}
                sunset={info.sunsetGeo}
                day={moment().format('dddd')}
                date={moment().format('LL')}
                icon={`http://openweathermap.org/img/w/${geoData ? geoData?.list[0]?.weather[0]?.icon : ''}.png`}
              /> 
            )}
              <section className='defSec'>
              {forecastGeo && forecastGeo.length > 0 &&  city.length === 0? (
              forecastGeo.map((f, i) => (
                <DefaultCard
                  key={i}
                  day={moment(f.dt_txt).format('dddd')}
                  description={f.weather[0].description}
                  icon={`http://openweathermap.org/img/w/${f ? f.weather[0].icon : ''}.png`} 
                  temp={changeToFah(f.main.temp)}
                  tempHi={changeToFah(f.main.temp_max)}
                  tempLo={changeToFah(f.main.temp_min)}
                />
              ))
              ): (
                <div></div>
            )}
              </section>
      </section>
    </div>
  )
}