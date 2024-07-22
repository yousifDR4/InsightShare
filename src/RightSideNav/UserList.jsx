import React from "react";
import UserItem from "./UserItem";

function UserList({onUserselect:onUserselect,setUser:setUser}) {
    const users=[{name:"yousif"},{name:'noor'}];
  return (
    <div className="w-full h-full flex-col space-y-2 cursor-pointer text-lg font-bold rounded-md fixed overflow-hidden">
    {(users.length>0)? users.map(user=><UserItem name={user.name} onUserselect={onUserselect} setUser={setUser}/>):""}
    
  </div>
  );
}

export default UserList;
