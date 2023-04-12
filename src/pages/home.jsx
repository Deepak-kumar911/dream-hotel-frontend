import { useEffect, useState } from "react";
import { Card } from "../common/card";
import { Faq } from "../components/faq";
import { getAllRoom } from "../auth";
import { useNavigate } from "react-router-dom";

function Home() {
   const [rooms,setRooms] = useState([])
   const navigate = useNavigate();
   useEffect(()=>{
      async function fetch() {
         const res = await getAllRoom()
         if(res && res.data){
            setRooms(res.data)
         }
      }fetch()
   },[])

   const handleClick = ()=>{
  navigate("/booking")
   }

  return (
    <>
    <div className="relative">
    <div className={`app w-[100%]`}>
      <div className="relative">
      <img src="/images/bgImg.jpg" className="bg-center relative z-10  h-[94vh] w-[100%]" alt="backgroundgImage" srcSet="bgimage" />
     <div className='flex flex-col absolute z-20 -mt-[60vh] md:-mt-[60vh] w-[100%] mx-auto items-center justify-center text-center'>
      <h1 className='text-3xl text-white'>Dream Hotel provide clean & comfort Room!</h1>
      <p className='w-[90%] md:w-[40%] text-center text-md md:text-lg text-yellow-300'>If you looking for room for spending times outside from home with less expensive, comfort and with nature friendly enviroment. </p>
     <button onClick={handleClick} className='px-4 py-1 text-lg mt-5  hover:bg-gradient-to-l text-white bg-gradient-to-r from-indigo-600 to-red-600 rounded-md'>Book Now</button>
     </div>
     </div>
    </div>
     
     <div className="flex flex-col w-[100%] my-5 bg-slate-200 h-[20vh] justify-center items-center gap-y-2">
        <h1 className="text-3xl text-red-600">Room Category</h1>
        <p className="text-lg font-normal w-[70%] text-center text-indigo-600">Room category for different comfort & featurs</p>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[100%] p-5">
      {rooms.map(room=><Card key={room._id} room={room} />)}
     </div>
        <Faq/>

    </div> 
    </>
  )
}

export default Home
