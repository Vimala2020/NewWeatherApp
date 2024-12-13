import React from 'react'

function TimeAndLocation({weather}) {
  const { name, country, dt, timezone } = weather;
  return (
    <div>
      <div className='flex items-center justify-center my-4 sm:my-6'>
        <p className='text-xl font font-extralight'>
          {dt}
        </p>
      </div>
      <div className='flex items-center justify-center my-3 '> 
        <p className='text-lg sm:text-2xl lg:text-3xl font-medium'>{`${name}, ${country}`}</p>
      </div>
    </div>
  )
}

export default TimeAndLocation