import React from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
const JoinCreateRoom = () => {
  return (
    <div
      className="flex justify-center items-center h-screen border bg-neutral-200 dark:bg-gray-900
      hover:dark:bg-gray-600 dark:bg-gray-500 "
    >
      <div className="border h-fit bg-neutral-50 dark:bg-gray-100 shadow-sm py-5 px-3 block w-80 h-80 flex flex-col gap-3 items-center">
      <div>
      <IoChatbubbleEllipsesOutline className="h-20 w-20"/>
      </div>
        <div className=" mb-2 p-3">
          <h1 className="text-lg font-bold md:w-32 md:w-48">
            Join/Create Room....
          </h1>
        </div>
        <div>
          <form className=" w-full p-5">

          {/* your name */}
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Your Name
              <input
                type="text"
                className='border focus:border-sky-500 rounded-full w-full rounded-lg p-2.5 block text-gray-900 bg-gray-50 text-sm focus:ring-blue-500 w-full dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-600 dark:text:white dark:focus:border-gray-500 placeholder="Type your name..." required'
                // name=""
                placeholder="Enter the Name......"
              />
            </label>

            {/* room id */}
            <label
              htmlFor="name"
              className="block mb-2 text-sm mt-2 font-medium text-gray-900 dark:text-black"
            >
              Room Id/New Room Id
              <input
                type="text"
                className='border border-gray-300 rounded-full w-full p-2.5 block text-gray-900 bg-gray-50 text-sm focus:ring-blue-500 w-full dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:border-gray-500 placeholder="Type your name..." required'
                // name="roomId"
                placeholder="Enter the roomId......"
              />
            </label>
            {/* buttons */}
            <div className="flex gap-3 justify-center items-center mt-3">
                <button type="button" className="border text-sm  text-white px-5 py-2.5 text-center rounded-xl dark:bg-gray-600/100 dark:hover:bg-gray-600/100 bg-gray-500 focus:outline-none focus:ring-3 focus:ring-gray-300 font-medium rounded-full ">Join Room</button>
                <button type="button" className="border text-sm  text-white px-5 py-2.5 text-center rounded-xl dark:bg-orange-600/100 dark:hover:bg-orange-600/100 bg-orange-500 focus:outline-none focus:ring-3 focus:ring-orange-300 font-medium rounded-full ">Create Room</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateRoom;
