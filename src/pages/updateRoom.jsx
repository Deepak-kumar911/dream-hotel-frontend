import React, { useEffect, useState } from 'react';
import { GrServices } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { getAllDetails } from '../auth';


export const UpdateRoom = () => {
    const navigate = useNavigate()
    const [details,setDetails] = useState([]);
    useEffect(()=>{
        async function fetch(){
            const res = await getAllDetails();
            if(res && res.data){
              
              setDetails(res.data)
                // setDetails(res.data)
            }else{
                navigate("/")
            }
        }fetch()
    },[])

 const handleClick = (id)=>{
    navigate(`/admin panel/update room/${id}`);
 }

  return (
    <div>
        <h2 className='text-lg text-indigo-600 font-normal'>Select Room for View Details</h2>
        <div className='flex flex-col md:flex-row gap-4'>

            {details.map(room=> <div key={room._id} onClick={()=>handleClick(room._id)} className='bg-red-500 text-white rounded-md p-2 cursor-pointer'>
                <div className='flex items-center  text-lg gap-x-2 capitalize'><GrServices/><h5>{room.name} Room</h5>
                </div>
                <ul>
                <li>Daily Rental Rate : {room.dailyRentalRate}</li>
                <li>Total Rooms: {room.available}</li></ul>
                </div>
                
                )}
        </div>
    </div>
  )
}
