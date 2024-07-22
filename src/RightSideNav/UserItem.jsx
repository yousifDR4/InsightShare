import React from 'react'
import { useDispatch } from 'react-redux';
import { setChat } from '../store/selectedChatSlice';

function UserItem({data}) {
 const DispatchRedux= useDispatch()
 console.log(data,"user");
  return (
    <div className=' hover:bg-gray-200 pb-4' onClick={()=>{DispatchRedux(setChat(data))}}>
      <span className="text-sm w-full h-10 flex items-center text-right ">
        <img
          src="./photo_2024-05-18_12-08-09.jpg"
          alt=""
          className="rounded-full h-10 w-10 ml-3 mr-3 items-center m-0 mt-5"
        />
        <p className="mt-3">{data.name}</p>
      </span>
      </div>
    
  )
}

export default UserItem