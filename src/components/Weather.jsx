import React, { useEffect, useState } from 'react';
import { FiWind } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";


const WeatherComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [cityName, setCityName] = useState("");
  const [listOfData, setListOfData] = useState([]);
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

  //https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6f107e28eeb53db8a37505d739e48e47

  useEffect(() => {
    const fetchData = async () => {
      if (latitude !== null && longitude !== null){
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=6f107e28eeb53db8a37505d739e48e47`);
          const data = await response.json();
          console.log(data);
          setGeoData(data);
          setCityName(data.city.name)
          setListOfData(data.list)
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
    };

    fetchData();
  }, [latitude, longitude]);

  const mappedListOfData = listOfData.map((list, index) => {
    let date = list.dt_txt;
    date = date.slice(0,10)
    let time = list.dt_txt.slice(10,);
    const temperature = Math.round(list.main.temp - 273.16);
    const humidity = list.main.humidity;
    const windSpeed = list.wind.speed
    const weatherDetails = list.weather[0].description
    const visibility = list.visibility;


    if (index <=0) {
      return (
        <div key={index} className='flex flex-col justify-center bg-white p-4 rounded-lg m-10 w-full  text-2xl'>
          {/* <div className='flex gap-3 p-3'>
            <div className='text-sm'>
              {date}
            </div>
            <div className='text-sm'>
              {time}
            </div>
          </div> */}
          <div className='flex gap-3 justify-center items-center flex-col'>
            <div className='text-9xl'>
              {temperature} °C
            </div>
            <div className='text-4xl'>
              {weatherDetails}
            </div>
          </div>

          <div className='shadow mt-24 p-8 flex  text-4xl gap-10'>
            <div className='flex justify-center items-center'>
              <div className='text-4xl'>
                <WiHumidity />
              </div>
              <div>
                {humidity}
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='text-4xl'>
                <FiWind />
              </div>
              <div>
                {windSpeed}
              </div>
            </div>
            <div className='flex justify-center items-center ga-'>
              <div className='text-4xl'>
                <MdVisibility/>
              </div>
              <div>
                {visibility}
              </div>
            </div>
          </div>
        </div>
      )
    }
    
  })





  return (
    <div className='text-zinc-600 rounded-sm justify-center items-center flex flex-col'>
      <div className='text-8xl flex justify-center p-4'>
          {cityName}
        </div>
      <div className=' flex justify-center items-center'>
        <div className='flex'>
          {mappedListOfData}  
        </div>
      </div>
      
      
    </div>
  );
};

export default WeatherComponent;
