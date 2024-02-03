import React, { useEffect, useState } from 'react';

const WeatherComponent = () => {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [geoData, setGeoData] = useState([]);

  

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((response) => {
      setLatitude(response.coords.latitude)
      setLongitude(response.coords.longitude)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=hamirpur&limit=5&appid=6f107e28eeb53db8a37505d739e48e47');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setGeoData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    
    fetchData();
    console.log(geoData)
  }, []); // The empty dependency array means this effect runs once on mount

  // Render your component with geoData

  const matchingLocation = geoData.filter(location => Math.round(location.lat) === Math.round(latitude))
  console.log(matchingLocation)
  
  const locationWeather = matchingLocation.map((data) => {
    return (
      <h1>
        {data.name}
      </h1>
    )
  })
  return (
    <div>
      hi there
      {locationWeather}
    </div>
  );
};

export default WeatherComponent;
