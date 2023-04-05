import React, { useContext, useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import { Form } from '../common/form';
import '../../node_modules/react-slideshow-image/dist/styles.css';
import roomFeature from '../roomFeature';
import { BsInfoCircle } from 'react-icons/bs';
import { GrServices } from 'react-icons/gr';
import { BsShieldLock } from 'react-icons/bs';
import { MdHomeRepairService } from 'react-icons/md'
import { useParams } from 'react-router-dom';
import { getRoomDetailsByName, getRoomDetails } from '../auth';
import { validateBooking,bookRoom } from '../auth';
import { Auth } from "../App";
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'


export const Booking = () => {
    const navigate = useNavigate()

    const context = useContext(Auth)
    const param = useParams()
    //for get data for book room
    const [data, setData] = useState({ room: "normal", userId: "", endDate: new Date(), startDate: new Date(), no_of_rooms: "" })
    const [roomDetail, setRoomDetails] = useState([])
    const [bookDetails,setBookDetails] = useState([])
    const [confirm,setConfirm] = useState(false)
    const [select, setSelect] = useState(false)
    const [disable,setDisable] = useState(false) 
    const [params,setParams] = useState(false)
    const [room] = roomFeature.filter(room => room.type === data.room)
    const slideImages = room.images;
    useEffect(() => {
        async function fetch() {
            if (param.room) {
                setData({ ...data, room: param.room })
                setSelect(true)
                const { data: res } = await getRoomDetails(param.roomId)
                setRoomDetails(res)
                setParams(true)
            } else {
                setSelect(false)
                setData({ ...data, room: "normal" })
                const { data: res } = await getRoomDetailsByName(data.room)
                setRoomDetails(...res)
                setParams(false)
            }
        } fetch()
    }, [param])


    useEffect(()=>{
        async function fetch() {
            const { data: res } = await getRoomDetailsByName(data.room)
            setRoomDetails(...res)
        }fetch()
    },[data.room])

    const validateLogin = async () => {
        if (context.state.login) {
            setData({ ...data, userId: context.state.payload._id })
            const res = await validateBooking(data)
            if (res) {
                const obj = { ...res, userId: context.state.payload._id };
                setBookDetails({...roomDetail,...obj});
                setDisable(true)
                setConfirm(true);
            } else { }
        } else {
            toast("Login first !!!")
            navigate("/login")
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        validateLogin()
    }

    const cancelBooking = ()=>{
        setConfirm(false)
        setDisable(false)
    }


    const confirmBooking = async ()=>{
       const res = await bookRoom(bookDetails)
        if( res && res.data){
            toast.success(`Your ${data.room} room is booked`)
            setConfirm(false);
            setDisable(false)
        }
    }


    const handleOnChange = (e) => {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }


    return (
        <div className=' p-5 gap-x-4 gap-y-4 h-[100%] relative top-0 left-0 right-0'>
            <div className='flex flex-col md:flex-row gap-x-4 gap-y-4 '>
                <Form onSubmit={handleSubmit} onChange={handleOnChange} confirmBooking={confirmBooking} params={params} disable={disable} cancelBooking={cancelBooking} data={data} setData={setData} select={select} bookDetails={bookDetails} confirm={confirm} />
                <div className='flex flex-col gap-y-4 w-[100%] md:w-[60%]'>
                    <img src={room.frontImage} alt="image2" className='w-[100%] h-[15rem] md:h-[20rem] bg-cover' />
                </div>
            </div>

            <div className='flex flex-col md:flex-row mt-4 w-[100%] h-[100%] gap-4'>
                <div className='w-[100%] md:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-4 mr-5 order-2 md:order-1'>

                    <div>
                        <div className='flex items-center text-lg capitalize font-medium bg-yellow-300 rounded-md px-2 gap-x-2'><MdHomeRepairService /><h1 className='text-indigo-600'>Property facility</h1></div>

                        <ul className='px-2 mt-2'>
                            {roomDetail?.property_facility?.map((elm) => (
                                <li key={elm._id} className="capitalize">{elm.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className='flex items-center text-lg capitalize font-medium bg-yellow-300 rounded-md px-2 gap-x-2'><GrServices /><h1 className='text-indigo-600'>Services</h1></div>
                        <ul className='px-2 mt-2'>
                            {roomDetail?.services?.map((elm) => (
                                <li key={elm._id} className="capitalize">{elm.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className='flex items-center text-lg capitalize font-medium bg-yellow-300 rounded-md px-2 gap-x-2'><BsInfoCircle /><h1 className='text-indigo-600'>General</h1></div>
                        <ul className='px-2 mt-2'>
                            {roomDetail?.general?.map((elm) => (
                                <li key={elm._id} className="capitalize">{elm.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className='flex items-center text-lg capitalize font-medium bg-yellow-300 rounded-md px-2 gap-x-2'><BsShieldLock /><h1 className='text-indigo-600'>Saftey & secuity</h1></div>
                        <ul className='px-2 mt-2'>
                            {roomDetail?.saftey_security?.map((elm) => (
                                <li key={elm._id} className="capitalize">{elm.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='bg-slate-200 w-[100%] md:w-[35%] flex flex-col justify-center order-1 md:order-2 '>
                    <div className='flex flex-col justify-center self-center w-[100%] bg-blue-400'>
                        <Slide className="w-[100%] bg-slate-200">
                            {slideImages.map((slideImage, index) => (
                                <div key={index}>
                                    <div style={{ 'backgroundImage': `url(${slideImage})` }} className=" w-[100%] h-[15rem] bg-origin-content bg-no-repeat bg-cover bg-center">
                                    </div>

                                </div>
                            ))}
                        </Slide>
                    </div>
                </div>
            </div>
        </div>
    )
}
