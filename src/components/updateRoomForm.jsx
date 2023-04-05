import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AddInput } from './addInput';
import { getRoomDetails } from '../auth';
import {toast} from 'react-toastify';
import { updateRoom } from '../auth';

export const UpdateRoomForm = () => {
  const param = useParams();
  const navigate =  useNavigate()
  const [data,setData] = useState([])
  const [disable,SetDisable] = useState(true)
  // console.log(param.id);
  //for general service
  const [generalList, setGeneralList] = useState([]);
  const [general, setGeneral] = useState("")

  //for propetry service
  const [propertyList, setPropertylList] = useState([]);
  const [property, setProperty] = useState("")

  //for services
  const [serviceList, setServiceList] = useState([]);
  const [services, setServices] = useState("")

  // for saftey
  const [safteyList, setSafteyList] = useState([]);
  const [saftey, setSaftey] = useState("")

  useEffect(()=>{
   async function fetch() {
      const res = await getRoomDetails(param.id)
      if(res && res.data){
            setData(res.data)
            setGeneralList(res.data.general)
            setPropertylList(res.data.property_facility);
            setSafteyList(res.data.saftey_security);
            setServiceList(res.data.services)
          }
    }fetch()
  },[param.id])
  

  const handleFieldChange =(e)=>{
    const {name,value} = e.target;
    setData({...data,[name]:value})
  }
 
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const obj = {name:data.name,
    dailyRentalRate:data.dailyRentalRate,
    available:data.available,
    general:generalList,
    property_facility:propertyList,
    services:serviceList,
    saftey_security:safteyList
    }
    if(obj.dailyRentalRate>1 && obj.available>1 && obj.general.length!==0 &&
       obj.property_facility.length!==0 && obj.available.length!==0 &&
        obj.saftey_security.length!==0){
          const res = await updateRoom(obj,data._id)
          console.log(res);
          if(res && res.data){
            toast.success(`${data.name} room updated`)
            navigate("/admin panel/custamize room")
          }
        }else{
          toast.error("All field are required")
        }
  }

  const handleDisable = ()=>{
    SetDisable(false)
  }

  // for general
  const handleChange = (e) => {
    setGeneral(e.target.value)
  }

  //for general add list items
  const handleAdd = () => {
    if (general.length !== 0) {
      const newList = generalList.concat({ name:general, id: new Date().getTime() })
      console.log(newList);
      setGeneralList(newList)
      setGeneral("")
    }
  }

  //for general
  const handleDelete = (id) => {
    const updatedList = generalList.filter(elm => elm.id !== id);
    setGeneralList(updatedList)
  }
    
  // for property
  const handlePropertyChange = (e) => {
    setProperty(e.target.value)
  }
  // for property add list items
  const handlePropertyAdd = () => {
    if (property.length !== 0) {
      const newList = propertyList.concat({ name:property, id: new Date().getTime() })
      setPropertylList(newList)
      setProperty("")
    }
  }
  //for property
   const handlePropertyDelete = (id) => {
     const updatedList = propertyList.filter(elm => elm.id !== id);
     setPropertylList(updatedList)
   }
  //duplicate
   // for service
   const handleServiceChange = (e) => {
     setServices(e.target.value)
   }
  //for general add list items
  const handleServiceAdd = () => {
    if (services.length !== 0) {
      const newList = serviceList.concat({ name:services, id: new Date().getTime() })
      setServiceList(newList)
      setServices("")
    }
  }
  //for general
  const handleServiceDelete = (id) => {
    const updatedList = serviceList.filter(elm => elm.id !== id);
    setServiceList(updatedList)
  }
  
  // for property
  const handleSafteyChange = (e) => {
    setSaftey(e.target.value)
  }
  
  // for property add list items
  const handleSafteyAdd = () => {
    if (saftey.length !== 0) {
      const newList = safteyList.concat({ name:saftey, id: new Date().getTime() })
      setSafteyList(newList)
      setSaftey("")
    }
  }
 //for property
  const handleSafteyDelete = (id) => {
    const updatedList = safteyList.filter(elm => elm.id !== id);
    setSafteyList(updatedList)
  }
  


  return (
    <div className='bg-white rounded-md p-2'>
      <div className='flex flex-col gap-2 '>
        <h1 className='text-xl text-center'>Room Details</h1>
        <form onSubmit={(e)=>e.preventDefault()} className='flex flex-col gap-y-2 px-4 py-2'>
          <input type="text" name="name" id="name" placeholder='Room Type' value={data.name || ""} disabled onChange={handleFieldChange} className='outline-none border border-blue-700 rounded-md  px-2 py-1 w-[100%]' />
          <input type="number" name="dailyRentalRate" id="dailyRentalRate" value={data.dailyRentalRate || ""} disabled={disable} onChange={handleFieldChange} placeholder='Daily Rental Rate' className={`outline-none border   border-blue-700 rounded-md px-2 py-1 w-[100%]`} />
          <input type="number" name="available" id="available" placeholder='Total Rooms' value={data.available || ""} disabled={disable} onChange={handleFieldChange} className={`outline-none border   border-blue-700 rounded-md px-2 py-1 w-[100%]`} />
        <AddInput name="Gereral:" list={generalList} value={general} onChange={handleChange} onClick={handleAdd} handleDelete={handleDelete} disabled={disable}/>
        <AddInput name="Property Facility:" list={propertyList} value={property} onChange={handlePropertyChange} onClick={handlePropertyAdd} handleDelete={handlePropertyDelete} disabled={disable}/>
        <AddInput name="Services:" list={serviceList} value={services} onChange={handleServiceChange} onClick={handleServiceAdd} handleDelete={handleServiceDelete} disabled={disable}/>
        <AddInput name="Saftey & Security:" list={safteyList} value={saftey} onChange={handleSafteyChange} onClick={handleSafteyAdd} handleDelete={handleSafteyDelete} disabled={disable}/>
        <button onClick={handleSubmit} className={disable ? "hidden" : "w-[35%] mx-auto p-2 text-white bg-green-500 rounded-md mt-2"}>Update Room</button>
        <button onClick={handleDisable} className={disable ? ' w-[35%] mx-auto p-2 text-white bg-orange-500 rounded-md mt-2' : "hidden"}>Edit Room</button> 
        </form>
      </div>
    </div>
  )
}
