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
  const [info , setInfo] = useState(
    {
      sunrise: '',
      sunset: '',
      sunriseGeo: '',
      sunsetGeo: ''
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
        const sunRise = new Date(dataCity?.sys?.sunrise * 1000).toLocaleTimeString('en-US');
        const sunSet = new Date(dataCity?.sys?.sunset * 1000).toLocaleTimeString('en-US')
        const sunRiseGeo = new Date(data?.sys?.sunrise * 1000).toLocaleTimeString('en-US')
        const sunSetGeo = new Date(data?.sys?.sunset * 1000).toLocaleTimeString('en-US')
        setInfo({
        sunrise:sunRise.toString(),
        sunset: sunSet.toString(),
        sunriseGeo: sunRiseGeo.toString(),
        sunsetGeo: sunSetGeo.toString()
        })
      console.log(dataCity)
      console.log(geoData)
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
       <>
        <WeatherCard
            name={weatherData.name}
              description={weatherData?.weather && weatherData?.weather[0]?.description}
            tempHi={changeToFah(weatherData?.main?.temp_max)}
            tempLo={changeToFah(weatherData?.main?.temp_min)}
            sunrise={info.sunrise}
            sunset={info.sunset}
            day={moment().format('dddd')}
            date={moment().format('LL')}
          /> 
            <section className='sectionData'>
              <DefaultCard
                name='Humidity'
                defaultData={weatherData?.main?.humidity}
                addOn='%'
              />
              <DefaultCard
                name='Speed'
                defaultData={weatherData?.wind?.speed}
                addOn={'Mph'}
              />
              <DefaultCard
                name='Gust'
                defaultData={weatherData?.wind?.deg} 
                addOn='&deg;'
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
                defaultData={info.sunrise}
              />
              <DefaultCard
                name='Sunset'
                defaultData={info.sunset}
              />
            </section>
      </>
      ): (
        <>
            <WeatherCard
              name={geoData.name}
              description={geoData? geoData?.weather[0]?.main : ''}
              tempHi={changeToFah(geoData?.main?.temp_max)}
              tempLo={changeToFah(geoData?.main?.temp_min)}
              sunrise={info.sunrise}
              sunset={info.sunset}
              day={moment().format('dddd')}
              date={moment().format('LL')}
            />
              <section className='sectionData'>
                <DefaultCard
                  name='Humidity'
                  defaultData={geoData?.main?.humidity}
                  addOn='%'
                />
                <DefaultCard
                  name='Speed'
                  defaultData={geoData?.wind?.speed}
                  addOn={'Mph'}
                />
                <DefaultCard
                  name='Gust'
                  defaultData={geoData?.wind?.deg}
                  addOn='&deg;'
                />
                <DefaultCard
                  name='Feels Like'
                  defaultData={geoData?.main?.feels_like}
                />
                <DefaultCard
                  name='Icon'
                  defaultData={geoData?.icon}
                />
                <DefaultCard
                  name='Pressure'
                  defaultData={geoData?.main?.pressure}
                />
                <DefaultCard
                  name='Sunrise'
                  defaultData={info.sunriseGeo}
                />
                <DefaultCard
                  name='Sunset'
                  defaultData={info.sunsetGeo}
                />
              </section>
        </>
      )}

      </section>
    </div>
  )
}