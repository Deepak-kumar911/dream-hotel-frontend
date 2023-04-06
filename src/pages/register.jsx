import React, { useContext, useState } from 'react';
import { validate_signUp,singUp } from '../auth';
import {toast} from 'react-toastify';
import { Auth } from '../App';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const context = useContext(Auth)
  const navigate = useNavigate()
 const [data,setData] = useState({name:"",email:"",contact:"",address:"",password:""})

 const handleChange =(e)=>{
  let {name,value} = e.target;
  setData({...data,[name]:value})
 }

 const handleSubmit = async (e)=>{
  e.preventDefault()
  const {error} = validate_signUp(data);
  if(error){
    toast.error(error.details[0].message)
  }else{
    const res = await singUp(data)
    if (res) {
      context.dispatch({ type: "login", payload: res })
      navigate("/")
    }
  }
 }

  return (
    <div className=' w-[100%] h-[75vh] flex  items-center justify-center bg-white'>
    <div className='flex flex-col items-center justify-center w-[85%] md:w-[30%] p-3 gap-y-2 bg-gradient-to-r from-red-600 to-indigo-600 rounded-md text-white'>
      <h1 className='text-center text-2xl'>Sign-Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col w-[100%] gap-y-2'>
        <input type="text" name="name" id="name1" onChange={handleChange} value={data.name} placeholder='Your Name' className='bg-gradient-to-r from-red-600 to-indigo-600 border-2 rounded-md outline-none h-[2rem] px-2 placeholder-white  border-white'/>
        <input type="text" name="email" id="email1" onChange={handleChange} value={data.email}  placeholder='Email ID' className='bg-gradient-to-r from-red-600 to-indigo-600 border-2 rounded-md outline-none h-[2rem] px-2 placeholder-white  border-white'/>
        <input type="text" name="contact" id="contact1" onChange={handleChange} value={data.contact}  placeholder='Contact No.' className='bg-gradient-to-r from-red-600 to-indigo-600 border-2 rounded-md outline-none h-[2rem] px-2 placeholder-white  border-white'/>
        <input type="text" name="address" id="address1" onChange={handleChange} value={data.address} placeholder='Your Address' className='bg-gradient-to-r from-red-600 to-indigo-600 border-2 rounded-md outline-none h-[2rem] px-2 placeholder-white  border-white'/>
        <input type="password" name="password" id="password1" onChange={handleChange} value={data.password} placeholder='Password' className='bg-gradient-to-r from-red-600 to-indigo-600 border-2 rounded-md outline-none h-[2rem] px-2 placeholder-white  border-white'/>
        <button className='mt-4 px-2 py-1 text-xl bg-orange-600 rounded-md hover:bg-green-500'>Sign-up</button>
      </form>
      <div className='w-[100%] mt-2'>
          <h6 className='text-green-500 text-center'>Already have a account ?</h6>
          <button onClick={()=>navigate("/login")} className='w-[100%] mt-1 px-2 py-1 text-xl bg-blue-500 rounded-md hover:bg-orange-500'>sign-in</button>
        </div>
    </div>
  </div>
  )
}
