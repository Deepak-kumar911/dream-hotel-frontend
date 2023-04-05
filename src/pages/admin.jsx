import React, { useState } from 'react'
import { GrServices } from 'react-icons/gr';
import { Dashboard } from './dashboard';
import { Routes,Route,Link } from 'react-router-dom';
import { UpdateRoom } from '../pages/updateRoom';
import { ListCustomer } from './listCustomer';
import { UpdateRoomForm } from '../components/updateRoomForm';


export const Admin = () => {
   const [click,setClick] =useState(1)

   const handleClick =(id)=>{
    setClick(id)
   }

  return (
    <div className='relative bottom-0 top-0'>
      <div className='grid grid-cols-1 md:grid-cols-12 h-[100%]'>
        <div className='col-span-2 md:col-span-3 border h-[100%] md:h-[75vh] p-2'>
          <ul className='flex flex-col gap-y-2 text-white'>
            <Link to="/admin panel" onClick={()=>handleClick(1)}>
          <li className={`flex px-2 py-2 gap-x-2 items-center ${click===1 ? "bg-orange-600" : "bg-blue-600" } text-xl rounded-md cursor-pointer `}><GrServices />Dashboard</li>
            </Link>
            <Link to="/admin panel/custamize room" onClick={()=>handleClick(2)}>
          <li className={`flex px-2 py-2 gap-x-2 items-center ${click===2 ? "bg-orange-600" : "bg-blue-600" } text-xl rounded-md cursor-pointer `}><GrServices/>View Rooms</li>
            </Link>
            <Link to="/admin panel/customer list" onClick={()=>handleClick(3)}>
          <li className={`flex px-2 py-2 gap-x-2 items-center ${click===3 ? "bg-orange-600" : "bg-blue-600" } text-xl rounded-md cursor-pointer`}><GrServices/>Customer List</li>
            </Link>
          </ul>
        </div>
        <div className='col-span-10 md:col-span-9 border bg-slate-200 p-2 overflow-auto h-[75vh]'>
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/custamize room' element={<UpdateRoom/>} />
            <Route path='/customer list' element={<ListCustomer/>} />
            <Route path='/update room/:id' element={<UpdateRoomForm/>} />
          </Routes>
          
        </div>
      </div>
    </div>
  )
}
