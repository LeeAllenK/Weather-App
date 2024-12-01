import {React , useState , useEffect} from 'react';
import moment from 'moment';

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
  const [sunRise, setSunRise] = useState('');
  const [info , setInfo] = useState(
    {
      sunrise: '',
      sunset: '',
      sunriseGeo: '',
      sunsetGeo: ''
    }
    )
  const [forecastGeo , setForecastGeo] = useState([])
  const [forecastCity , setForecastCity] = useState([])
 
  const apiKeyCity = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b8bd1d08aa24f089a65f8c6f4b056564`
  // const apiKey = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b8bd1d08aa24f089a65f8c6f4b056564`
  const apiKey = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=b8bd1d08aa24f089a65f8c6f4b056564`
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
        setGeoData(data);
        setWeatherData(dataCity)
        const sunRise = new Date(dataCity?.sys?.sunrise * 1000).toLocaleTimeString('en-US');
        const sunSet = new Date(dataCity?.sys?.sunset * 1000).toLocaleTimeString('en-US')
        const sunRiseGeo = new Date(data?.city?.sunrise * 1000).toLocaleTimeString('en-US')
        const sunSetGeo = new Date(data?.city?.sunset * 1000).toLocaleTimeString('en-US')
        setInfo({
        sunrise:sunRise,
        sunset: sunSet,
        sunriseGeo: sunRiseGeo,
        sunsetGeo: sunSetGeo
        })
      const Forecast = data.list.filter((d , i) => i %  8 === 0)
      const cityForecast = dataCity.list.filter((d , i) => i % 8 === 0)
  
      setForecastGeo(Forecast)
      setForecastCity(cityForecast)
      console.log(data)
      console.log(dataCity)
        console.log(Array.isArray(forecastGeo))
     
      
      }catch(err){
        return err;
     }
    }
      // getWeather()
  },[apiKey ,apiKeyCity, lat, long])

 function handleCity(){
   setCity(getCity);
   
  }
  const changeToFah = (k) => {
    return Math.floor(((k - 273.15)* 9/5) + 32)
  };

  return(
    <div className='App'>

      <div className='sectionSidebar'>
       <input
        className='input'
         type='text'
         placeholder='Search City...'
         value={getCity}
         onChange={(e) => setGetCity(e.target.value)}
       />
      <button onClick={(e) => {
            e.preventDefault();
            handleCity();
            // console.log(getCity)
          }}>
          Search</button><br/>
        <div className='sidebarContents'>
        <img className='sideImg' alt='No image' src={`http://openweathermap.org/img/w/${geoData ? geoData?.list[0]?.weather[0]?.icon : ''}.png`}/>
        <div >{geoData ? geoData?.list[0]?.weather[0].description : ''}</div>
        </div>
      </div>
      <section className='sectionMain'>

           {geoData ? (
            <>
              <WeatherCard
                name={geoData?.city?.name}
                description={geoData ? geoData?.list[0]?.weather[0].main : ''}
                tempHi={changeToFah(geoData ? geoData?.list[0]?.main?.temp_max : '')}
                tempLo={changeToFah(geoData ? geoData?.list[0]?.main?.temp_min : '')}
                sunrise={info.sunriseGeo}
                sunset={info.sunsetGeo}
                day={moment().format('dddd')}
                date={moment().format('LL')}
                icon={`http://openweathermap.org/img/w/${geoData ? geoData?.list[0]?.weather[0]?.icon : ''}.png`}
              />
            
            <section className='defSec'>
              { Array.isArray(forecastGeo) ? (
                forecastGeo.map((f, i) => (
                  <DefaultCard
                    key={i}
                    day={moment(f.dt_txt).format('dddd')}
                    icon={`http://openweathermap.org/img/w/${f.weather[0].icon}.png`}
                    temp={changeToFah(f.main.temp)}
                    description={f.weather[0].description}
                  />
                ))
              ) : (
                <div>NO DATA</div>
              )}
            </section>

            </>
            ) : (
                <>
              {(typeof weatherData !== 'undefined' && weatherData.list && weatherData.list.length > 0) ? (
              <WeatherCard
                name={weatherData?.city?.name}
                description={ weatherData ? weatherData?.list[0]?.weather[0].description : ''}
                tempHi={changeToFah(weatherData ? weatherData?.list[0]?.main?.temp_max : '')}
                tempLo={changeToFah(weatherData ? weatherData?.list[0]?.main?.temp_min : '')}
                sunrise={info.sunriseGeo}
                sunset={info.sunsetGeo}
                day={moment().format('dddd')}
                date={moment().format('LL')}
                icon={`http://openweathermap.org/img/w/${weatherData ? weatherData?.list[0]?.weather[0]?.icon : ''}.png`}
              />
              ) : (
                <div>no data</div>    
              )}
              <section className='citySec'>
                {forecastCity.map((f, i) => (
                  <DefaultCard
                    key={i}
                    day={moment(f.dt_txt).format('dddd')}
                    icon={`http://openweathermap.org/img/w/${f.weather[0].icon}.png`}
                    temp={changeToFah(f.main.temp)}
                    description={f.weather[0].description}
                  />
                ))}
              </section>
                </>  
            )}
      </section>
    </div>
  )
}