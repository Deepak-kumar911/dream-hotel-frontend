import React, { useEffect, useState } from 'react'
import { BsFunnel } from 'react-icons/bs';
import { allbooking } from '../auth';
import { Auth } from '../App';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { cancelRoom } from '../auth';

export const Activity = () => {
  const context = useContext(Auth);
  const [data, setData] = useState([])
  const [update,setUpdate] = useState(false)

  useEffect(() => {
    async function fetch() {
      if (context.state.login) {
        const res = await allbooking(context.state.payload._id)
        if (res && res.data) {
          setData(res.data)
        }
      }else{return}

    } fetch()
  }, [context,update])

    const handleCancel =async (id)=>{
      const res = await cancelRoom(id);
      if(res && res.data){
        toast.success("room cancelled");
        setUpdate(!update)
      }
    }

  return (
    <div className=''> {data.length === 0 ?
      <div className='w-[100%] flex flex-col items-center justify-center h-[75vh]'>
        <div className='flex  items-center justify-items-center justify-center w-[4rem] h-[4rem] rounded-full bg-yellow-200'>
          <BsFunnel className='text-3xl text-red-600' /></div>
        <h3 className='mt-2 text-lg text-indigo-600 font-medium'>No booking activity yet</h3>
      </div>
      :
      <div className='h-[75vh] bg-gradient-to-tr from-red-600 to-yellow-300 overflow-y-auto'>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4  gap-3 '>
          {data.map((room) => 
        <div key={room?.slot?._id} className='hover:bg-black border-yellow-300 border-2 bg-white  hover:text-white rounded-md flex gap-x-3 w-[100%] p-3'>
          <div className='flex flex-col  justify-center w-[100%] '>
            <div className='flex justify-between'>
            <h1 className='text-2xl border-4 border-x-0 border-t-0 rounded-md border-orange-600 capitalize'>{room.name}</h1>
            {room?.slot?.booked ? <>{new Date(room?.slot?.startDate).getTime()<=new Date().getTime() ? <button className='px-2 py-1 text-white bg-red-300 rounded-md cursor-default'>Expired</button> : <button onClick={()=>handleCancel(room.slot._id)} className='px-2 py-1 text-white bg-red-500 rounded-md'>Cancel</button>}
            </> : <h6 className='text-red-600 text-lg'>Cancelled</h6> }
            </div>
            <ul className='mt-2'>
              <li>Started Date: {new Date(room?.slot?.startDate).toLocaleDateString()}</li>
              <li>End Date: {new Date(room?.slot?.endDate).toLocaleDateString()}</li>
              <li>Total Days: {room?.slot?.days}</li>
              <li>Total Amt: Rs. {room?.slot?.amount}</li>
              <li>Book At: {new Date(room?.slot?.bookAt).toLocaleString()}</li>
            </ul>
          </div>
        </div>
          )}


      </div>
      </div>
    }
    </div>
  )
}
