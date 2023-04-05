import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Auth } from '../App'

export const Logout = () => {
  const context = useContext(Auth);
  const navigate = useNavigate()
  useEffect(()=>{
    function fetch() {
      localStorage.removeItem("token");
      context.dispatch({type:"logout"})
      navigate("/")
    }fetch()
  },[])
  return (
    <div>Logout</div>
  )
}
