import React from 'react'
import { FiWind } from "react-icons/fi";

function CurrentWeather({name, latitude, longitude, temperature, windspeed, mainInsideWeather}) {
  return (
    <div className='flex flex-col justify-center items-center max-w-full p-10 m-5 rounded-lg text-white'>
      <div className='text-left'>
        <div className='text-8xl mb-20'>
          Current Weather
        </div>
      </div>
      <div className='flex gap-20 justify-center items-center'>
        <div className='text-8xl'>
          {name}
        </div>
        {/* <div>Latitude: {latitude}</div>
        <div>Longitude: {longitude}</div> */}
        <div className='text-2xl gap-4 flex flex-col'>
          <div>{Math.round(temperature - 273)} ° C</div>
          <div className='flex items-center gap-2 text-4xl'><FiWind />{windspeed} mph</div>
          <div>{mainInsideWeather}</div>
        </div>
        
      </div>
      

    </div>
  )
}

export default CurrentWeather