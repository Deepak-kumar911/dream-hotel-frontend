import React, { useEffect, useState } from 'react';
import { GrServices } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { getAllDetails } from '../auth';
import {Chart} from 'react-google-charts'


export const Dashboard = () => {
    const navigate = useNavigate()
    const [details,setDetails] = useState([]);
    const [data,setData] = useState([])
    const [select,setSelect] = useState("today")
    const [render,setRender] = useState(false)

    useEffect(()=>{
        async function fetch(){
            const res = await getAllDetails();
            if(res && res.data){
              setData(res.data);
              setRender(true)
            }else{
                navigate("/")
            }
        }fetch()
    },[])

    const graphData = [["Date","bookings"]]
   const filterGraphData = (data)=>{
     let date = new Date(new Date().toLocaleDateString()).getTime()- (2*1000*3600*24)
     for(let i=0;i<=9;i++){
       let no_of_rooms=0
       for(let room of data){
         const result = room.slots.filter(slot=>{
          const DateString = new Date(slot.startDate).toLocaleDateString()
        return  new Date(DateString).getTime()===date})
         if(result.length!==0){
           result.map(slot=>{
             no_of_rooms+=slot.no_of_rooms
           })
         }
       }
       graphData.push([new Date(date).toLocaleDateString(),no_of_rooms])
       date= date+(1000*3600*24)
     }
   }
   filterGraphData(data)
    useEffect(()=>{
      function fetchDetails() {
        if(select==="today"){
          const today = dateFormat(new Date());
          const filter = totalRoomBooked(today)
          setDetails(filter)
        }else if(select==="yesterday"){
          const yesterday = dateFormat(+ new Date(new Date().getTime()- 1000*3600*24));
          const filter = totalRoomBooked(yesterday)
          setDetails(filter)
        }else if(select==="tomorrow"){
          const tomorrow = dateFormat(+ new Date(new Date().getTime() + 1000*3600*24));
          const filter = totalRoomBooked(tomorrow)
          setDetails(filter)
        }
        else if(select==="inMonth"){
          const startDate = dateFormat(new Date());
          const endDate = dateFormat(new Date(new Date().setDate(1)).toLocaleDateString());
          const filter = totalRoomBooked(startDate,endDate)
          setDetails(filter)
        }
      }fetchDetails()
    },[select,render])

  //date format yyyy/mm/dd
  const dateFormat = (date)=>{
  const date1 = new Date(date).getDate();
  const month = new Date(date).getMonth()+1;
  const year = new Date(date).getFullYear();
  return `${year}/${month}/${date1}`
}

function totalRoomBooked(startDate,endDate){
  const result = data.map(room=>{
            if(endDate){
              let filterRoom = room.slots.filter(slot=> new Date(slot.startDate).getTime()>=new Date(startDate).getTime()
              || new Date(slot.endDate).getTime()<=new Date(endDate).getTime())
              
              const sumOfRoom = filterRoom.reduce((pre,curr)=>pre+curr.no_of_rooms,0)
              const diff = (new Date(startDate).getTime()- new Date(endDate).getTime())/(1000*3600*24)+1;
              let cancel = 0
              for(let user of filterRoom){
                if(!user.booked){
                  cancel+=1
                }
              }
              return {detail:room,sumOfRoom,diff,cancel}
            }else{
              let filterRoom = room.slots.filter(slot=> {
               const slotDateString = new Date(slot.startDate).toLocaleDateString()
               return  new Date(slotDateString).getTime()===new Date(startDate).getTime()})
              let cancel = 0
              for(let user of filterRoom){
                if(!user.booked){
                  cancel+=1
                }    
              }
              const sumOfRoom = filterRoom.reduce((pre,curr)=>pre+curr.no_of_rooms,0)
              return {detail:room,sumOfRoom,cancel}
            }
        })
        return result
      }  
      
      const handelSelect =(e)=>{
        setSelect(e.target.value)
      }

      return (
        <div className='flex flex-col bg-white p-2 rounded-md'>
      <div className='flex justify-between mb-2'>
        <h4>Dashboard</h4>
        <select name="option" id="option" value={select} onChange={handelSelect} className='outline-none'>
          <option value="today">Today</option>
          <option value="yesterday">yesterday</option>
          <option value="tomorrow">Next Day</option>
          <option value="inMonth">Last Month</option>
        </select>
        </div>

     
          <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
            {
                details.map(room=><div key={room?.detail._id} className='bg-orange-500 p-3 rounded-md text-white'>
                <div className='flex gap-x-2'>
              <div className='flex items-center justify-center justify-self-center w-[2rem] h-[2rem] text-lg rounded-full bg-white'>
                <GrServices/>
              </div>
              <h4 className='text-xl capitalize'>{room?.detail?.name} Room</h4>
                </div>
              <ul>
              <li>Rooms: {room?.detail?.available}</li>
              <li>Booked: {room?.sumOfRoom - room?.cancel}</li>
              <li>Booking: {room?.detail.dailyRentalRate}/day</li>
              {room.diff ? <li>Day diffence: {room.diff}</li>:""}
              <li>Cancel: {room?.cancel}</li>
              <li>Unbooked: {room.diff ? (room?.detail?.available * room.diff)-room?.sumOfRoom+room?.cancel :room?.detail?.available - room?.sumOfRoom+room?.cancel}</li>
              </ul>
            </div>
        )}

    </div>
    <div className='mt-7 p-2'>
      <Chart
      chartType='Line'
      data={graphData}
      width="100%"
      options={{curveType:"function",legend:{position:"bottom"}}}
      height="300px"
      legendToggle
      />
    </div>
    </div>

  )
}
