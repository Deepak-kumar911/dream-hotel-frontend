import React, { useEffect, useState } from 'react';
import { getAllDetails } from '../auth';
import { BsFunnel } from 'react-icons/bs';

export const ListCustomer = () => {
  const [name, setName] = useState("")
  const [data, setData] = useState([])
  const [original, SetOriginal] = useState([])
  const [select, SetSelect] = useState("today")

  useEffect(() => {
    async function fetch() {
      const res = await getAllDetails();
      if (res && res.data) {
        SetSelect("today")
        setData(res.data)
      }
    } fetch()
  }, [])
  
  useEffect(()=>{
    if(select==="today"){
      const today = dateFormat(new Date());
      const filter = filterData(today)
      SetOriginal(filter)
    }else if(select==="yesterday"){
      const yesterday = dateFormat(+ new Date(new Date().getTime()- 1000*3600*24));
      const filter = filterData(yesterday)
      SetOriginal(filter)
    }else if(select==="tomorrow"){
      const tomorrow = dateFormat(+ new Date(new Date().getTime() + 1000*3600*24));
      const filter = filterData(tomorrow)
      SetOriginal(filter)
    }
    else if(select==="inMonth"){
      const startDate = dateFormat(new Date());
      const endDate = dateFormat(new Date(new Date().setDate(1)).toLocaleDateString());
      const filter = filterData(startDate,endDate)
      SetOriginal(filter)
    }
  },[data,select])


  //filter data by date
  const filterData = (startDate, endDate) => {
    const roomWithUser = data.map(room => {
      if (endDate) {
        const obj = room.slots.filter(customer => new Date(customer.startDate).getTime() >= new Date(startDate).getTime() ||
        new Date(customer.endDate).getTime() <= new Date(startDate).getTime()
        )
        return  {room, customer: obj}
      } else {
        const obj = room.slots.filter(customer => new Date(customer.startDate).getTime() === new Date(startDate).getTime())
       return  {room, customer: obj} 
      }
    })
    const withCustomer = roomWithUser.filter(value=>value.customer.length!==0);
    const filterData =   withCustomer.map(room=>room.customer.map(user=>{
      return {name:room.room.name,roomId:room.room._id,dailyRentalRate:room.room.dailyRentalRate,...user}
    }))
   return filterData
  }


//date format yyyy/mm/dd
 const dateFormat = (date)=>{
    const date1 = new Date(date).getDate();
    const month = new Date(date).getMonth()+1;
    const year = new Date(date).getFullYear();
    return `${year}/${month}/${date1}`
  }
  
  const handleChange = (e) => {
    setName(e.target.value)
    if(e.target.value.length===0){
      SetSelect("today")
    }
  }
  
  
  const handelSelect = (e) => {
    SetSelect(e.target.value)
  }
  
  const searchByName = (name)=>{
    if(name.length!==0){
      const array = []
      data.map(room=>{
        const user = room.slots.filter(user=>user.userName.includes(name));
        return user.map((value)=>{
          const obj = {name:room.name,roomId:room._id,dailyRentalRate:room.dailyRentalRate,...value}
          array.push([obj])
        })
      })
      SetSelect("")
      SetOriginal(array)
    }else{}
  }

  return (
    <div className='bg-white p-2 rounded-md'>
      <div className='flex justify-between'>
        <h5>List Of Customers</h5>
        <select name="" id="" value={select} onChange={handelSelect} className='outline-none'>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="inMonth">In Month</option>
        </select>
      </div>

      <div className='flex items-center justify-between  p-1 w-[90%] mt-2  md:w-[50%] mx-auto rounded-lg border border-indigo-600 '>
        <input type="text" name="" id="" value={name} onChange={handleChange} placeholder='Search by name' className='w-[80%] px-2 outline-none' />
        <button onClick={()=>searchByName(name)} className='bg-indigo-400 px-2 py-1 text-white rounded-lg'>Search</button>
      </div>

      <div className='flex p-2 mt-4 w-[100%] gap-2'>
         {original.length !==0 ? <div className="relative overflow-x-auto h-[55vh] overflow-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Room
                </th>
                <th scope="col" className="px-6 py-3">
                    Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                    End Date
                </th>
                <th scope="col" className="px-6 py-3">
                    No. of Rooms
                </th>
                <th scope="col" className="px-6 py-3">
                    Total Days
                </th>
                <th scope="col" className="px-6 py-3">
                    Address
                </th>
                <th scope="col" className="px-6 py-3">
                    Contact
                </th>
                <th scope="col" className="px-6 py-3">
                    Remarks
                </th>
                <th scope="col" className="px-6 py-3">
                  Payable Amount
                </th>
            </tr>
        </thead>
        <tbody>
          {original.map(detail=>detail.map((value,ind)=><tr key={value._id} className={`${value.booked ? "bg-white" : "bg-red-500"  }  border-b dark:bg-gray-800 dark:border-gray-700`}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {value.userName}
                </th>
                <td className="px-6 py-4 capitalize">
                {value.name}
                </td>
                <td className="px-6 py-4">
                {new Date(value.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                {new Date(value.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                {value.no_of_rooms}
                </td>
                <td className="px-6 py-4">
                {value.days}
                </td>
                <td className="px-6 py-4">
                {value.userAddress}
                </td>
                <td className="px-6 py-4">
                {value.userContact}
                </td>
                <td className="px-6 py-4">
                {value.booked ? "booked" : "Cancel"}
                </td>
                <td className="px-6 py-4">
                 {value.amount}
                </td>
            </tr>
            ))}
        </tbody>
    </table>
</div>

         :<div className='w-[100%] flex flex-col items-center justify-center h-[58vh]'>
         <div className='flex  items-center justify-items-center justify-center w-[4rem] h-[4rem] rounded-full bg-yellow-200'>
           <BsFunnel className='text-3xl text-red-600' /></div>
         <h3 className='mt-2 text-lg text-indigo-600 font-medium'>No booking activity yet</h3>
       </div>
         }
 
      </div>
    </div>
  )
}
