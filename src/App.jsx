import {Route, Routes} from 'react-router-dom';

import { Navbar } from './common/navbar';
import Home from './pages/home';
import { Booking } from './pages/booking';
import { Activity } from './pages/activity';
import { Login } from './pages/login';
import { Logout } from './pages/logout';
import { Register } from './pages/register';
import { Footer } from './common/footer';
import { redirect } from 'react-router-dom';
import './App.css'
import { Admin } from './pages/admin';
import { createContext, useEffect,useReducer } from 'react';
import { getAuth } from './auth';
import { ProtectedRoute } from './components/protectedRoute';
import { reducer,initialState } from './reducer';
const Auth =  createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    async function fetch() {
     const res =  getAuth();
     if(res){
      dispatch({type:"login",payload:res})
     }else{}
    }fetch()
  },[])
  return (
    <div className='app'>
  <Auth.Provider value={{state,dispatch}}>  
   <Navbar/>
   <div className='relative top-0 left-0 right-0'>
   <Routes >
    <Route path='/' element={<Home/>}/>
    <Route path='/booking/:roomId/:room' element={<Booking/>}/>
    <Route path='/booking' element={<Booking/>}/>
    <Route path='/activity' element={<Activity/>}/>
    <Route path='/logout' element={<Logout/>}/>
    <Route path='/admin panel/*' element={<ProtectedRoute state={state} Children={<Admin/>} />}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    {/* <Route path='*' element={<Home/>}/> */}
   </Routes> 
   <div className=''>
   <Footer/>
    </div> 
   </div>
   </Auth.Provider>
  </div>
  )
}

export default App
export {Auth}
