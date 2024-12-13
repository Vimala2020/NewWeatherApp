import React from 'react';

function Forecast({ title, data }) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-center">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between">
        {data.map((d, index) => (
          <div key={index} className="flex flex-col items-center justify-center w-1/3 sm:w-1/4 md:w-1/5">
            <p className="font-light text-sm">{d.title}</p>
            <img src={d.icon} alt="weather-icon" className="w-8 sm:w-12 my-1" />
            <p className="font-medium">{`${d.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
