import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import './Home.css'
function Home() {
    const isfetch=fetch?true:false
    const [city, setCity] = useState('');
    const [citydata,setcitydata]=useState()
 const [weatherData,setWeatherData]=useState([])
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=c958ac8d5706fa174eae0a805d6e31f2`
      );
      setcitydata(response.data)
      console.log(response.data[0]);
      const lat=response.data[0].lat
      const long=response.data[0].lon
      console.log(lat,long);
      const res=await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c958ac8d5706fa174eae0a805d6e31f2`)
      setWeatherData(res.data);
      console.log(res.data); //You can see all the weather data in console log
      console.log(weatherData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(e);
   const id=document.getElementById('data');
   id.hidden=false;
  };

  return (
    <div className='bgimg'>
        <div className="container">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4 mt-5 pt-5">
                    <div className="row">
                        <div className="col-8">
                        <Form.Control className='bg-light ms-4 mt-5' value={city} onChange={handleInputChange} type="text" placeholder="Search Location.." />
                        </div>
                        <div className="col-4">
                        <button onClick={handleSubmit}  className='btn btn-light mt-5 ms-3 px-4'><i class="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </div>
                
             <div id='data' hidden>
                <h3 className='text-center text-light mt-5'>Location: {weatherData.name},{weatherData?.sys?.country}</h3>
                <h1 className='text-center text-light mt-4 fs-2'>Temp: <span className='fs-1 fw-bolder'>{Math.trunc(weatherData?.main?.temp-273.15)}&deg;C</span></h1>
                <h4 className='text-center text-light'>{weatherData?.weather?.main}</h4>

                <h3 className='text-center text-light mt-4'>Humidity: {weatherData?.main?.humidity}</h3>
           
            </div>
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    </div>
  )
}

export default Home