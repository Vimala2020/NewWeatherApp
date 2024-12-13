import React from 'react'

function TopBox({setQuery}) {
    const cities =[
        {
            id: 1,
            name:'London'
        },
        {
            id: 2,
            name:'Austin'
        },
        {
            id: 3,
            name:'Chennai'
        },
        {
            id: 4,
            name:'Paris'
        },
        {
            id: 5,
            name:'Toronto'
        }
    ]
  return (
    <div className=' flex items-center justify-around gap-2 sm:gap-4 my-4'>
        {
            cities.map((city) =>(
                <button key={city.id} className='text-sm sm:text-lg font-medium hover:bg-gray-700 px-3 py-2 rounded-md transition ease-in'
                onClick={()=>setQuery({q:city.name})}>
                    {city.name}</button>

            ))
        }
       
       
    </div>
  )
}

export default TopBox