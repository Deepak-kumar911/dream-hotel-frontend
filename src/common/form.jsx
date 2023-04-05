import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Form = ({ onSubmit, onChange, data, setData, select,disable,params ,bookDetails, confirm, cancelBooking,confirmBooking }) => {


    // const [value,onChange] = useState(new Date())
    return (
        <div className='rounded-md flex flex-col justify-center w-[100%] md:w-[40%] p-2 border-2 border-yellow-300 bg-gradient-to-r from-yellow-300 to-orange-400'>
            <h1 className='text-center text-xl'>Booking Details</h1>
            <form onSubmit={onSubmit} className='w-[95%] md:w-[80%] flex flex-col items-center justify-center self-center gap-y-2 mt-5'>
                <div className='flex justify-between w-[100%]'>
                    <label htmlFor="room" className='text-left'>Room Type</label>
                    <select name="room" id="room" onChange={onChange} value={data.room} disabled={params ? select : disable} className='w-[60%] outline-none h-[2rem] rounded-md px-2 selection:bg-blue-600'>
                        <option value="normal">Normal</option>
                        <option value="gold">Gold</option>
                        <option value="premium">Premium </option>
                    </select>
                </div>
                <div className='flex justify-between w-[100%]'>
                    <label htmlFor="room" className='text-left'>Number of Room</label>
                    <input type="number" name="no_of_rooms" id="no_of_rooms" disabled={disable} onChange={onChange} value={data.no_of_rooms} className='w-[60%] outline-none h-[2rem] rounded-md px-2' />
                </div>
                <div className='flex justify-between w-[100%]'>
                    <label htmlFor="room" className='text-left w-[40%]'>Starting Date</label>
                    <div className='w-[60%]'>
                        <DatePicker showIcon disabled={disable} onChange={(date) => setData({ ...data, startDate: new Date(date) })} minDate={new Date()} selected={data.startDate} className='w-[100%] rounded-md  outline-none  h-[2rem]' />
                    </div>
                </div>
                <div className='flex justify-between w-[100%]'>
                    <label htmlFor="room" className='text-left'>Ending Date</label>
                    <div className='w-[60%] text-black' >
                        <DatePicker disabled={disable} showIcon onChange={(date) => setData({ ...data, endDate: new Date(date) })} minDate={new Date()} selected={data.endDate} className='w-[100%] rounded-md outline-none  h-[2rem]' />
                    </div>
                </div>
                <button type="submit" hidden={confirm} className='px-2 py-1 bg-indigo-500 border-indigo-500 hover:bg-red-600 border rounded-md text-white w-[80%] mt-4 text-lg'>Book Room</button>
            </form>

            {confirm && <div className='w-[95%] md:w-[80%] mx-auto'>
                <div className='bg-indigo-600 hover:bg-purple-600 text-white rounded-md p-2 mt-2 w-[100%]'>
                    <div className='flex justify-between w-[100%]'>
                        <label htmlFor="room" className='text-left w-[60%]'>No of Days</label>
                        <div className='w-[40%]'><h4>{bookDetails.days}</h4></div>
                    </div>
                    <div className='flex justify-between w-[100%]'>
                        <label htmlFor="room" className='text-left w-[60%]'>Per Day</label>
                        <div className='w-[40%]'><h4>{bookDetails.dailyRentalRate}/day</h4></div>
                    </div>
                    <div className='flex justify-between w-[100%]'>
                        <label htmlFor="room" className='text-left w-[60%]'>Total payable Amount</label>
                        <div className='w-[40%]'><h4>Rs. {bookDetails.days * bookDetails.no_of_rooms * bookDetails.dailyRentalRate}</h4></div>
                    </div>
                </div>
                <div className='flex justify-between w-[100%] gap-x-2'>
                    <button onClick={confirmBooking} hidden={!confirm} className='px-2 py-1 bg-green-500 border-green-500 hover:bg-green-700 border rounded-md text-white w-[80%] mt-4 text-lg'>Conform</button>
                    <button onClick={cancelBooking} hidden={!confirm} className='px-2 py-1 bg-red-500 border-red-500 hover:bg-red-600 border rounded-md text-white w-[80%] mt-4 text-lg'>Cancel</button>
                </div>
            </div>}
        </div>
    )
}
