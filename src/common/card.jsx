import React from 'react'
import {useNavigate} from 'react-router-dom'

export const Card = ({room}) => {
 const navigate = useNavigate();

 const handleClick = ()=>{
  navigate(`/booking/${room._id}/${room.name}`)
 }

  return (
    <div  className="flex flex-col md:flex-row md:justify-between w-[100%] p-2 h-[100%] border-2 bg-red-500 gap-x-4 hover:bg-black hover:text-white rounded-md">
    <div className="flex w-[100%] md:w-[50%] text-center items-center justify-between ">
        <div className="flex flex-col items-center mx-auto w-[80%]">
        <img src={`/images/${room?.name==="normal" ? "img2" : room?.name==="premium" ? "img8" : "img1"}.jpg`} className="w-[100%] h-[20vh] z-20" alt="image"/>
        <div className="bg-indigo-600 w-[100%] h-[20vh] z-10 -mt-[18vh] ml-[5vh]"></div>
        </div>
    </div>
    <div className="w-[100%] md:w-[50%] capitalize px-4 md:px-0">
        <h1 className=" text-3xl text-white">{room?.name}</h1>
        <h3 className='text-lg text-yellow-300'>Freture & availablity</h3>
        <ul className=''>
            <li>Free Cancellation</li>
            <li>24Hrs booking</li>
            <li>Total Rooms {room?.available}</li>
            <li>Rs. {room?.dailyRentalRate}/day</li>
            <li>2 Adults & 0 Child</li>
        </ul>
        <button onClick={handleClick} className="px-4 py-1 text-lg mt-5  hover:bg-gradient-to-l text-white bg-gradient-to-r from-indigo-600 to-red-600 rounded-md">Read more...</button>
    </div>
 </div>
  )
}
