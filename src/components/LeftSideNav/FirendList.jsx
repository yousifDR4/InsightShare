import React, { useState } from "react";

function FriendList() {
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "Yousif Mazin",
      profilePic: "./photo_2024-05-18_12-08-09.jpg",
    },
    { id: 2, name: "John Doe", profilePic: "./john_doe.jpg" },
    { id: 3, name: "Jane Smith", profilePic: "./jane_smith.jpg" },
  ]);

  const [newFriend, setNewFriend] = useState({ name: "", profilePic: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFriend((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFriend = (e) => {
    e.preventDefault();
    setFriends((prev) => [...prev, { ...newFriend, id: prev.length + 1 }]);
    setNewFriend({ name: "", profilePic: "" });
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 text-center">Friend List</h2>
        <ul className="mb-4">
          {friends.map((friend) => (
            <li key={friend.id} className="flex items-center mb-2">
              <img
                src={friend.profilePic}
                alt={friend.name}
                className="rounded-full h-10 w-10 mr-3"
              />
              <span>{friend.name}</span>
            </li>
          ))}
        </ul>
        <form
          onSubmit={handleAddFriend}
          className="bg-gray-100 p-4 rounded shadow-sm"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={newFriend.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profilePic"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture URL
            </label>
            <input
              type="text"
              name="profilePic"
              value={newFriend.profilePic}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Friend
          </button>
        </form>
      </div>
    </div>
  );
}

export default FriendList;
