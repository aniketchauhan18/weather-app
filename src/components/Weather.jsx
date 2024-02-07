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
    const windSpeed = list.wind.speed;
    const weatherDetails = list.weather[0].description;
    const visibility = list.visibility;

    if (index <=0) {
      return (
        <div className='flex text-4xl mt-10 gap-40 w-full  justify-center' key={index}>
          <div className='flex justify-center items-center flex-col'>
            <div className='flex justify-center items-center text-9xl'>
              {temperature}°C
            </div>
            <div className='flex justify-center items-center text-2xl bg-blue-900 text-white px-6 py-2 rounded-lg'>
              {weatherDetails}
            </div>
          </div>
          <div className='flex flex-col text-gray-900 bg-gray-300 rounded-lg p-10 gap-10 text-6xl'>
            <div className='flex'>
              <div className='flex justify-center items-center gap-2'>
                <div className='text-4xl'>
                  <WiHumidity />
                </div>
                <div>
                  {humidity}
                </div>
              </div>
            </div>
            <div className='flex'>
              <div className='flex justify-center items-center gap-2'>
                <div className='text-4xl'>
                  <FiWind />
                </div>
                <div>
                  {windSpeed} mph
                </div>
              </div>
            </div>
            <div className='flex'>
              <div className='flex justify-center items-center gap-2'>
                <div className='text-4xl'>
                  <MdVisibility/>
                </div>
                <div>
                  {visibility}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }


  })

  return (
    <div className='text-white rounded-sm justify-center items-center flex flex-col w-full'>
      <div className='text-8xl flex justify-center bg-blue-900 rounded-lg mt-10 text-white px-12 py-4'>
          {cityName}
        </div>
      <div className=' flex w-full  justify-center'>
        {mappedListOfData}
      </div>
    </div>
  );
};

export default WeatherComponent;
