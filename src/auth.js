import axios from 'axios';
import joi from 'joi';
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'
const endPoint = "https://dream-hotel-backend-l86e.vercel.app";
const key = "token"


setheader()

function setheader(){
  if(getToken()){
    axios.defaults.headers.common["x-auth-token"] = getToken();
  }
  }
  
  function getToken(){
  return localStorage.getItem(key)
}

const singUp = async (details) => {
  try {
    const res = await axios.post(`${endPoint}/api/user/register`, details);
    localStorage.setItem(key, res.headers["x-auth-token"]);
    toast.success("Successfull register !");
    setheader()
    return jwtDecode(localStorage.getItem(key))
  } catch (err) {
    if(err && err.response){
      toast.error(err.response.data)
      console.log(err.response.data);
    }else{
      toast.error(err)
    }
  }
}

const login = async (details) => {
  try {
    const res = await axios.post(`${endPoint}/api/user/login`, details);
    localStorage.setItem(key, res.headers["x-auth-token"]);
    toast.success("Successfull login !");
    setheader()
    return jwtDecode(localStorage.getItem(key))
  } catch (err) {
    console.log(err.response.data);
    toast.error(err.response.data)
  }
}

const validate_signUp = (data) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email({ tlds: { allow: false } }).required(),
    contact: joi.string().min(10).max(10).required(),
    address: joi.string().required(),
    password: joi.string().min(6).required()
  })
  return schema.validate(data)
}

const validate_login = (data) => {
  const schema = joi.object({
    email: joi.string().email({ tlds: { allow: false } }).required(),
    password: joi.string().required()
  })
  return schema.validate(data)
}

const getAuth = () => {
  const token = getToken()
  if (token) {
    return jwtDecode(token);
  } else { }
}

const getAllRoom = async () => {
  try {
    return await axios.get(`${endPoint}/api/roombooking/allrooms`)

  } catch (err) {
    if(err && err.response){
    toast.error(err.response.data)
  }else{
    toast.error(err)
  }
}}

const getRoomDetails = async (_id) => {
  try {
    return await axios.get(`${endPoint}/api/roombooking/sortById/${_id}`)
  } catch (err) {
    if(err && err.response){
    toast.error(err.response.data)
  }else{
    toast.error(err)
  }
}
}

const getRoomDetailsByName = async (name) => {
  try {
    return await axios.get(`${endPoint}/api/roombooking/sortByName/${name}`)
  } catch (err) {
    if(err && err.response){
    toast.error(err.response.data)
  }else{
    toast.error(err)
  }
}}

const validateBooking = ({ room, startDate, endDate, no_of_rooms }) => {
  const obj = { name: room, startDate, endDate, no_of_rooms }
  let date1 = new Date(new Date(startDate).toLocaleDateString()).getTime()
  let date2 = new Date(new Date(endDate).toLocaleDateString()).getTime()
  let difference_in_time = date2 - date1;
  const days = difference_in_time / (1000 * 3600 * 24) + 1;
  obj.startDate = dateFormat(startDate);
  obj.endDate = dateFormat(endDate);

  const { error } = validateForm(obj);
  if (error) {
    toast.error(error.details[0].message)
  } else {
    const localDate1 = new Date(obj.endDate).toLocaleDateString();
    const localDate2 = new Date(obj.startDate).toLocaleDateString();
    if (new Date(localDate1).getTime() < new Date(localDate2).getTime()) {
      toast.error("endDate must be greater than startDate")
    } else {
      return { ...obj, days }
    }
  }

}

function dateFormat(date){
  const date1 = new Date(date).getDate();
  const month = new Date(date).getMonth()+1;
  const year = new Date(date).getFullYear();
  return `${year}/${month}/${date1}`

}

const validateForm = (obj) => {
  const schema = joi.object({
    name: joi.string().required(),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
    no_of_rooms: joi.number().min(1).required(),
  })
  return schema.validate(obj)
} 

const bookRoom = async ({startDate,endDate,userId,_id,no_of_rooms})=>{
   const data = {startDate,endDate,userId,no_of_rooms}
   try {
      const res = await axios.patch(`${endPoint}/api/roombooking/book/${_id}`,data)
      return res
   } catch (err) {
    if(err && err.response){
    toast.error(err.response.data)
  }else{
    toast.error(err)
  }
}
}

const allbooking = async (_id)=>{
  try {
    const res = await axios.get(`${endPoint}/api/user/allbooking/${_id}`)
    return res
  } catch (err) {
    if(err && err.response){
      toast.error(err.response.data)
    }else{
      toast.error(err)
    }
  }
}

const doSuscribe = async (email)=>{
  const data={email:email};
  try {
    const res = await axios.post(`${endPoint}/api/suscribe`,data)
    return res
  } catch (err) {
    if(err && err.response){
      toast.error(err.response.data)
    }else{
      toast.error(err)
    }
  }
}

const getAllDetails = async ()=>{
  try {
    const res = await axios.get(`${endPoint}/api/roombooking/rooms`)
    return res
  } catch (err) {
    if(err && err.response){
      toast.error(err.response.data)
    }else{
      toast.error(err)
    }
  }
}


const updateRoom = async (data,_id)=>{
  try {
    const res = await axios.patch(`${endPoint}/api/roombooking/room/${_id}`,data)
    return res
  } catch (err) {
    if(err && err.response){
      toast.error(err.response.data)
    }else{
      toast.error(err)
    }
  }
}

const cancelRoom =async (id)=>{
  try {
    const res = await axios.patch(`${endPoint}/api/user/cancelRoom/${id}`)
    return res
  } catch (err) {
    if(err && err.response){
      toast.error(err.response.data)
    }else{
      toast.error(err)
    }
  }
}

export {
  validate_signUp, singUp,
  validate_login, login,
  getAuth, getAllRoom,
  getRoomDetailsByName,
  getRoomDetails,
  validateBooking,
  bookRoom,
  allbooking,
  doSuscribe,
  getAllDetails,
  updateRoom,
  cancelRoom
}