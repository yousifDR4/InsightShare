import React, { useEffect } from "react";
import UserItem from "./UserItem";
import { useWindowSize } from "@uidotdev/usehooks";

function UserList({users}) {
 const{width}=useWindowSize()

  useEffect(()=>{
    console.log(1);
  if (width >= 768)
    console.log("working");
},[width])
  return (
    <>
      {width >= 768 && (
        <div className="w-full h-full flex-col space-y-2 cursor-pointer text-lg font-bold rounded-md fixed overflow-hidden">
          {users.length > 0
            ? users.map((user, index) => (
                <UserItem
                  key={index} // Added a unique key prop
                  data={user}
                />
              ))
            : ""}
        </div>
      )}
    </>
  );
}

export default UserList;
