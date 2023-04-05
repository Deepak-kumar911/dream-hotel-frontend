import {AiOutlineInstagram} from 'react-icons/ai';
import {BsFacebook} from 'react-icons/bs';
import {ImLinkedin} from 'react-icons/im';
import {AiFillTwitterCircle} from 'react-icons/ai';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { doSuscribe } from '../auth';
import { Link } from 'react-router-dom';

export const Footer = () => {
   const ref = useRef()
  
  const handleSubmit = async (e)=>{
        e.preventDefault()
        const res = await doSuscribe(ref.current.value)
        ref.current.value ="";
       if(res && res.data){
            toast.success(res.data)

       }
  }

  return (
    <footer className='grid grid-cols-1 md:grid-cols-3 gap-x-2 gap-y-2 bg-black p-5 '>
    <div>
      <h1 className='text-white text-2xl'>Dream Hotel</h1>
      <form onSubmit={handleSubmit} className='flex justify-between w-[100%] bg-white border rounded-md mt-5'>
        <input type="email" name="email" id="email" ref={ref} placeholder='email@.com' className='w-[70%] outline-none  mx-auto'/>
        <button type='submit' className="px-4 py-1 text-lg hover:bg-gradient-to-l text-white bg-red-600 rounded-md hover:bg-indigo-700">Suscribe</button>
        </form>
    </div>
    <div className='flex flex-col items-center justify-center  text-white order-2 md:order-1 '>
      <h3 className='capitalize'>Add: jihu beach Goa Maharastra,India</h3>
      <h4>
      All Rights are Reserved for Dream Hotel
      </h4>
    </div>
    <div className='flex flex-col items-center md:items-start justify-center text-white order-1 md:order-2'>
      <h5 className='text-xl mb-2'>Social Links</h5>
    <div className='flex text-2xl gap-x-2 '>
    <Link to="https://www.linkedin.com/in/deepak-kumar-20a007269" target={'_blank'}>
      <BsFacebook className='hover:text-blue-500'/>
      </Link>
      <Link to="https://www.linkedin.com/in/deepak-kumar-20a007269" target={'_blank'}>
      <AiOutlineInstagram className='hover:text-red-500'/>
      </Link>
      <Link to="https://www.linkedin.com/in/deepak-kumar-20a007269" target={'_blank'}>
      <ImLinkedin className='hover:text-blue-600'/>
      </Link>
      <Link to="https://www.linkedin.com/in/deepak-kumar-20a007269" target={'_blank'}>
      <AiFillTwitterCircle className='hover:text-blue-700'/>
      </Link>
    </div>
    </div>
   </footer>
  )
}
