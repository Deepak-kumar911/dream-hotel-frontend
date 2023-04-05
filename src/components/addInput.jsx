import React from 'react'
import { MdOutlineAdd } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

export const AddInput = ({name,value,list,onClick,onChange,handleDelete, disabled}) => {
  return (
    <div className='flex flex-col '>
          <p>{name} </p>
          <ul className={list.length !== 0 ? `flex  flex-col text gap-y-2 h-[10rem] overflow-auto p-2 bg-white gap-x-2 border rounded-md  border-indigo-600` : ""}>
            {list.map((elm) => <li key={elm.id} className="flex w-fit items-center justify-center bg-blue-600 text-white rounded-md px-2 py-1 "><p className=''>{elm.name}</p> <MdDelete className={disabled ? "hidden" :'text-red-600 cursor-pointer text-lg'} onClick={() => handleDelete(elm.id)} /></li>)}
          </ul>
          <div className={disabled ? "hidden" :'flex items-center justify-between w-[100%] px-1 bg-white text-black rounded-md border border-indigo-600 h-10 mt-1'}>
            <input type="text" name="" id="" value={value} onChange={onChange} placeholder='add list items' className='w-[80%] outline-none' />
            <button onClick={onClick} className='bg-orange-300 flex items-center justify-items-center justify-center rounded-md px-3 h-8 cursor-pointer'><MdOutlineAdd /></button>
          </div>
        </div>
  )
}
