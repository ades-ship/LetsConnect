import React, { useState } from "react";
import { IoMdAttach } from "react-icons/io";
const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: "adesh",
      content: "how are you?",
      timestamp: Date.now(),
    },
    {
      sender: "tanuj",
      content: "I am fine?",
      timestamp: Date.now(),
    },
    {
      sender: "adesh",
      content: "What are you doing right now?",
      timestamp: Date.now(),
    },
    {
      sender: "tanuj",
      content: "I am office",
      timestamp: Date.now(),
    },
    {
      sender: "adesh",
      content: "okay could you please call me when are free?",
      timestamp: Date.now(),
    },
    {
      sender: "tanuj",
      content: "okay i will care of it",
      timestamp: Date.now(),
    },
    {
      sender: "adesh",
      content: "What are you doing right now?",
      timestamp: Date.now(),
    },
    {
      sender: "tanuj",
      content: "I am office",
      timestamp: Date.now(),
    },
    {
      sender: "adesh",
      content: "okay could you please call me when are free?",
      timestamp: Date.now(),
    }, {
      sender: "adesh",
      content: "What are you doing right now?",
      timestamp: Date.now(),
    },
    {
      sender: "tanuj",
      content: "I am office",
      timestamp: Date.now(),
    },
    {
      sender: "adesh",
      content: "okay could you please call me when are free?",
      timestamp: Date.now(),
    }, {
      sender: "adesh",
      content: "What are you doing right now?",
      timestamp: Date.now(),
    },
    {
      sender: "tanuj",
      content: "I am office",
      timestamp: Date.now(),
    },
    {
      sender: "adesh",
      content: "okay could you please call me when are free?",
      timestamp: Date.now(),
    }
  ]);
  return (
    <div className="main-container border border-black-500 h-screen">
    {/* header */}
      <div className="fixed border top-0 mx-auto h-20  bg-neutral-200 dark:bg-gray-900 w-full flex justify-around justify-center items-center block text-sm">
        {/* <div className="text-black dark:text-white font-bold placeholder:italic ">Romm Id</div> */}
        <span className="font-bold text-sm  dark:text-white ">Room Id</span>
        <span className="font-bold text-sm dark:text-white ">UserName</span>
        {/* <div className="text-black dark:text-white font-bold ">UserName</div> */}
        <div>
          <buton
            type="button"
            className="font-medium  border border-red-100 rounded-full bg-red-600/100 dark:bg-red-500 dark:hover:bg-red-400 text-white px-5 py-2.5"
          >
            Leave Room
          </buton>
        </div>
      </div>

      {/* main section */}
      <section className="bg-white dark:bg-gray-900 h-screen overflow-y-auto mt-10 flex-1">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
            {messages.map((message, index) => {
              const isSender = message.sender === "adesh";

              return (
                <div
                  key={index}
                  className={`flex ${
                    isSender ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isSender ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <img
                      src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg?w=768"
                      className="h-10 w-10 rounded-full"
                      alt="avatar"
                    />

                    {/* Message Bubble */}
                    <div className="flex flex-col text-sm">
                      <span className="text-lg text-gray-500">
                        {message.sender}
                      </span>
                      <div
                        className={`px-3 py-2 rounded-lg max-w-xs ${
                          isSender
                            ? "bg-blue-500 text-white"
                            : "bg-neutral-200 text-black"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* input field */}
      <div className=" fixed bottom-0 w-full bg-neutral-100 dark:bg-gray-900 p-3 mt-5  block flex  justify-start justify-center items-center  gap-3  ">
        <input
          type="text"
          className="font-medium text-sm shadow-sm  text-1xl block border  border-gray-300 focus:border-sky-500 dark:border-gray-600 w-full h-fit  p-2.5 rounded-full block dark:text-white  bg-neutral-50 text-black dark:bg-gray-500 
            focus:ring-3 focus:outline-none focus:ring-blue-500 placeholder: italic placeholder:text-slate-400 required
            "
          name="chat"
          placeholder="Type your chat ....."
        />

        <IoMdAttach className="h-fit h-10 w-10 bg-gray-100" />
        <button
          type="button"
          className="text-sm font-medium md:text-lg rounded-full border border-neutral-100 dark:border-gray-200  px-5 py-3 bg-green-600/100 dark:bg-green-500 text-gray-900 focus:ring-3 focus:ring-green-100 dark:focus:ring-green-200 block "
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
