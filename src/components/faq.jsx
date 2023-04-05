import {MdOutlineAdd} from 'react-icons/md';
import {AiOutlineMinus} from 'react-icons/ai';
import { useState } from "react";

export const Faq = () => {
    const [faq,setFaq] = useState(0);
    const [toogle,setToogle] = useState(false)
    const toggleFaq = (id)=>{
        setFaq(id)
        if(!toogle){
            setToogle(true)
        }else{
            setToogle(false)
        }
    }

  return (
    <div className="flex flex-col p-5 w-[90%] md:w-[50%] mx-auto gap-y-2">
    <h1 className="text-2xl mb-2 text-center">FAQ#</h1>

    <div className="flex flex-col w-[100%] bg-indigo-600 text-white px-4 py-2">
        <div className="flex items-center justify-between w-[100%] text-md"><h1>There is parking availability ?</h1>
        <div className="flex items-center justify-center bg-white rounded-full w-[2rem] h-[2rem] text-red-600" onClick={toogle ? ()=>toggleFaq(0) : ()=>toggleFaq(1) } >{faq===1 ? <AiOutlineMinus/> : <MdOutlineAdd/> }</div>
        </div>
        <p className={faq===1 ? "visible" : "hidden"}>yes, there is availability of parking, if there is free space</p>
    </div>

    <div className="flex flex-col w-[100%] bg-indigo-600 text-white px-4 py-2">
        <div className="flex items-center justify-between w-[100%] text-md"><h1>Local ID accepted or not.. ?</h1>
        <div className="flex items-center justify-center bg-white rounded-full w-[2rem] h-[2rem] text-red-600" onClick={toogle ? ()=>toggleFaq(0) : ()=>toggleFaq(2) } >{faq===2 ?  <AiOutlineMinus/> : <MdOutlineAdd/> }</div>
        </div>
        <p className={faq===2 ? "visible" : "hidden"}>Local ID's are accepted</p>
    </div>

    <div className="flex flex-col w-[100%] bg-indigo-600 text-white px-4 py-2">
        <div className="flex items-center justify-between w-[100%] text-md"><h1>are gust allowed ?</h1>
        <div className="flex items-center justify-center bg-white rounded-full w-[2rem] h-[2rem] text-red-600" onClick={toogle ? ()=>toggleFaq(0) : ()=>toggleFaq(3) } >{faq===3 ?  <AiOutlineMinus/> : <MdOutlineAdd/> }</div>
        </div>
        <p className={faq===3 ? "visible" : "hidden"}>We allow guest in room with vaild id proof and time limit</p>
    </div>

    <div className="flex flex-col w-[100%] bg-indigo-600 text-white px-4 py-2">
        <div className="flex items-center justify-between w-[100%] text-md"><h1>Can 3 person be accommodated?</h1>
        <div className="flex items-center justify-center bg-white rounded-full w-[2rem] h-[2rem] text-red-600" onClick={toogle ? ()=>toggleFaq(0) : ()=>toggleFaq(4) } >{faq===4 ?  <AiOutlineMinus/> : <MdOutlineAdd/> }</div>
        </div>
        <p className={faq===4 ? "visible" : "hidden"}>Dear visitor,Max 2 person is allowed in a room.</p>
    </div>

    <div className="flex flex-col w-[100%] bg-indigo-600 text-white px-4 py-2">
        <div className="flex items-center justify-between w-[100%] text-md"><h1>ID is necessary  during checkIn?</h1>
        <div className="flex items-center justify-center bg-white rounded-full w-[2rem] h-[2rem] text-red-600" onClick={toogle ? ()=>toggleFaq(0) : ()=>toggleFaq(5) } >{faq===5 ?  <AiOutlineMinus/> : <MdOutlineAdd/> }</div>
        </div>
        <p className={faq===5 ? "visible" : "hidden"}>ID is necessary during checkIn as per goverment guidline </p>
    </div>

 </div>
  )
}
