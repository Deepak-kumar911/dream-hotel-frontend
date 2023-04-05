import { useContext, useState } from "react";
import {RxHamburgerMenu} from 'react-icons/rx'
import { NavLink } from "react-router-dom";
import { Auth } from "../App";

export const Navbar = () => {
  const context = useContext(Auth);
  const [active,setActive] = useState(0)
  const [toggle,setToggle] = useState(false)
  
const handleClick = (id)=>{
   setToggle(!toggle);
   setActive(id)
}
  return (
    <div className=" bg-slate-800 text-white">
      <div className="md:hidden flex justify-between p-2  ">
      <h1 className="text-lg bg-indigo-600 rounded-lg p-1 hover:text-black hover:bg-yellow-300 cursor-pointer">Dream Hotel</h1>
      <div onClick={()=>setToggle(!toggle)} className="text-white border border-white text-xl p-2"><RxHamburgerMenu/></div>
      </div>
    <div className={`md:flex ${toggle? "visible" : "hidden"} md:visible  justify-center  md:justify-between px-3 h-[20vh] md:h-[6vh] items-center`}>
        <h1 className="hidden md:block text-lg bg-indigo-600 rounded-lg p-1 hover:text-black hover:bg-yellow-300 cursor-pointer">Dream Hotel</h1>
        
        <ul className="flex flex-col  text-center md:flex-row gap-x-2  font-medium">
        <li onClick={()=>handleClick(1)} className={`${active===1 ? "text-yellow-300" : ""} hover:text-yellow-300 cursor-pointer`}><NavLink to="/">Home</NavLink></li>
        <li onClick={()=>handleClick(2)} className={`${active===2 ? "text-yellow-300" : ""} hover:text-yellow-300 cursor-pointer`}><NavLink to="/booking">Booking</NavLink></li>
        <li onClick={()=>handleClick(3)} className={`${active===3 ? "text-yellow-300" : ""} hover:text-yellow-300 cursor-pointer`}><NavLink to="/activity">Activity</NavLink></li>
        {context.state?.login ? <>
          <li onClick={()=>handleClick(4)} className={`${active===4 ? "text-yellow-300" : ""} hover:text-yellow-300 cursor-pointer`}><NavLink to="/logout">Logout</NavLink></li>
            {context.state?.payload?.isAdmin ?
          <li onClick={()=>handleClick(5)} className={`${active===5 ? "text-yellow-300" : ""} hover:text-yellow-300 cursor-pointer`}><NavLink to="/admin panel">Admin</NavLink></li>
          : "" }
        </>:<>
        <li onClick={()=>handleClick(6)} className={`${active===6 ? "text-yellow-300" : ""} hover:text-yellow-300 cursor-pointer`}><NavLink to="/login">Login</NavLink></li>
        <li onClick={()=>handleClick(7)} className={`${active===7 ? "text-yellow-300" : ""} hover:text-yellow-300 cursor-pointer`}><NavLink to="/register">Sign-up</NavLink></li>
        </>}

        </ul>
        </div>
        </div>
  )
}
