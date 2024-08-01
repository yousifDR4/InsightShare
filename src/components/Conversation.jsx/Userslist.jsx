import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import unrealtedusers from "../../api/users/unrealtedusers";

function Userslist() {
  const user = useSelector((state) => state.user.user);

  const promise = () => unrealtedusers(user.id);
  const { isLoading, isError, data, refetch } = useQuery({
    queryFn: promise,
    enabled: false,
    initialData: {},
    queryKey: ["users"],
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });

  function handleClick() {
    refetch();
  }
  return (
    <>
      <div
        onClick={refetch}
        className="flex justify-center justify-items-center text-xl text-blue-500 cursor-pointer"
      >
        show all users
      </div>

      {isLoading && (
        <div className="flex justify-center mt-4 text-xl text-gray-500">
          Loading...
        </div>
      )}

      {isError && (
        <div className="flex justify-center mt-4 text-xl text-red-500">
          Error loading users.
        </div>
      )}

      {data && data.length > 0 && (
        <div className="mt-4">
          <ul className="list-disc list-inside">
            {data.map((user) => (
              <li key={user.id} className="text-gray-700">
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Userslist;
