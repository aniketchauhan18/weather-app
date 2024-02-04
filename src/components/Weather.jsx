import React, { useEffect, useState } from 'react';
import CurrentWeather from './CurrentWeather';

const WeatherComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [geoData, setGeoData] = useState({});

  useEffect(() => {
    const fetchLocation = async () => {
      try {
          await navigator.geolocation.getCurrentPosition((response) => {
          const latitude = response.coords.latitude;
          const longitude = response.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);
        });
      } catch(error) {
        console.error('Error fetching the location: ', error)
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (latitude !== null && longitude !== null){
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6f107e28eeb53db8a37505d739e48e47`);
          const data = await response.json();
          console.log(data);
          setGeoData(data);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
    };

    fetchData();
  }, [latitude, longitude]);

  console.log(latitude, longitude)

  console.log(geoData)
  const mainInsideWeather = geoData.weather?.[0]?.main

  return (
    <div className='text-gray-300 rounded-sm flex justify-center items-center'>
      <CurrentWeather name={geoData.name} latitude={latitude} longitude={longitude} temperature={geoData.main?.temp || '0'} windspeed={geoData.wind?.speed|| '0'} mainInsideWeather={mainInsideWeather}/>
    </div>
  );
};

export default WeatherComponent;
