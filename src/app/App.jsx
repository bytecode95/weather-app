import './App.css'
import Search from '../components/Search'
import CurrentWeather from '../components/currentWeather/CurrentWeather';
import { WEATHER_API_URL } from '../components/FetchData';
import { WEATHER_API_KEY } from '../components/FetchData';
import { useState } from 'react';
import ForcastWeather from '../components/forcastWeather/ForcastWeather';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forcastWeather, setForcastWeather] = useState(null);
  console.log(forcastWeather);

  const handleonSearchChange = (searchData) =>{
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    
    const forcastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forcastWeatherFetch])
    .then(async(response)=>{
      
      const weatherResponse = await response[0].json();
      const forcastResponse = await response[1].json();
      
      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForcastWeather({city: searchData.label, ...forcastResponse});
    })
    .catch((err)=> console.log(err));

    
  }
  
  return (
    <>
      <div className='container'>
        <Search onSearchChange={handleonSearchChange}/>
        {currentWeather && <CurrentWeather data={currentWeather}/>}
        {forcastWeather && <ForcastWeather data={forcastWeather} />}
      </div>

    </>
  )
}

export default App
