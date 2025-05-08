// import React, { useEffect, useState } from "react";
// import { IoMdAttach } from "react-icons/io";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// const ChatPage = ({ setName, setRoomId}) => {
//   const navigate=useNavigate();
//   const location=useLocation();
//   const {roomId,name}=useParams();
//   const [messages, setMessages] = useState([
//     {
//       sender: "adesh",
//       content: "how are you?",
//       timestamp: Date.now(),
//     },
//     {
//       sender: "tanuj",
//       content: "I am fine?",
//       timestamp: Date.now(),
//     }
//   ]);

//   const getChatData=()=>{
//     axios.get(`http://localhost:8080/api/v1/rooms/${roomId}/messages`)
//     .then(res=>{
//       console.log(res.data)
//       setMessages(res.data)
//   })
//     .catch(err=>console.log(err))
//   }
//   useEffect(()=>{
//      getChatData();
//   },[])

//   const handleLeaveRoom=()=>{
//     localStorage.clear();
//     sessionStorage.clear();
//     setName("");
//     setRoomId("");
//     navigate("/");
//   }
//   return (
//     <div className="main-container border border-black-500 h-screen">
//     {/* header */}
//       <div className="fixed border top-0 mx-auto h-20  bg-neutral-200 dark:bg-gray-900 w-full flex justify-around justify-center items-center block text-sm">
//         {/* <div className="text-black dark:text-white font-bold placeholder:italic ">Romm Id</div> */}
//         <span className="font-bold text-sm  dark:text-white ">RoomId:{roomId}</span>
//         <span className="font-bold text-sm dark:text-white ">Name:{name}</span>
//         {/* <div className="text-black dark:text-white font-bold ">UserName</div> */}
//         <div>
//           <buton
//             type="button"
//             className="font-medium  border border-red-100 rounded-full bg-red-600/100 dark:bg-red-500 dark:hover:bg-red-400 text-white px-5 py-2.5"
//             onClick={handleLeaveRoom}
//           >
//             Leave Room
//           </buton>
//         </div>
//       </div>

//       {/* main section */}
//       <section className="bg-white dark:bg-gray-900 h-screen overflow-y-auto mt-10 flex-1">
//         <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
//           <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
//             { messages && messages.map((message, index) => {
//               const isSender = message.sender === "user1";

//               return (
//                 <div
//                   key={index}
//                   className={`flex ${
//                     isSender ? "justify-end" : "justify-start"
//                   } mb-4`}
//                 >
//                   <div
//                     className={`flex items-center gap-2 ${
//                       isSender ? "flex-row-reverse" : ""
//                     }`}
//                   >
//                     {/* Avatar */}
//                     <img
//                       src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg?w=768"
//                       className="h-10 w-10 rounded-full"
//                       alt="avatar"
//                     />

//                     {/* Message Bubble */}
//                     <div className="flex flex-col text-sm">
//                       <span className="text-lg text-gray-500">
//                         {message.sender}
//                       </span>
//                       <div
//                         className={`px-3 py-2 rounded-lg max-w-xs ${
//                           isSender
//                             ? "bg-blue-500 text-white"
//                             : "bg-neutral-200 text-black"
//                         }`}
//                       >
//                         {message.content}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* input field */}
//       <div className=" fixed bottom-0 w-full bg-neutral-100 dark:bg-gray-900 p-3 mt-5  block flex  justify-start justify-center items-center  gap-3  ">
//         <input
//           type="text"
//           className="font-medium text-sm shadow-sm  text-1xl block border  border-gray-300 focus:border-sky-500 dark:border-gray-600 w-full h-fit  p-2.5 rounded-full block dark:text-white  bg-neutral-50 text-black dark:bg-gray-500 
//             focus:ring-3 focus:outline-none focus:ring-blue-500 placeholder: italic placeholder:text-slate-400 required
//             "
//           name="chat"
//           placeholder="Type your chat ....."
//         />

//         <IoMdAttach className="h-fit h-10 w-10 bg-gray-100" />
//         <button
//           type="button"
//           className="text-sm font-medium md:text-lg rounded-full border border-neutral-100 dark:border-gray-200  px-5 py-3 bg-green-600/100 dark:bg-green-500 text-gray-900 focus:ring-3 focus:ring-green-100 dark:focus:ring-green-200 block "
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;



//

import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import { getMessagess } from "../services/RoomServices";
import { timeAgo } from "../config/helper";
const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();
  // console.log(roomId);
  // console.log(currentUser);
  // console.log(connected);

  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  //page init:
  //messages ko load karne honge

  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessagess(roomId);
        // console.log(messages);
        setMessages(messages);
      } catch (error) {}
    }
    if (connected) {
      loadMessages();
    }
  }, []);

  //scroll down

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  //stompClient ko init karne honge
  //subscribe

  useEffect(() => {
    const connectWebSocket = () => {
      ///SockJS
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);

        toast.success("connected");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log(message);

          const newMessage = JSON.parse(message.body);

          setMessages((prev) => [...prev, newMessage]);

          //rest of the work after success receiving the message
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }

    //stomp client
  }, [roomId]);

  //send message handle

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      console.log(input);

      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }

    //
  };

  function handleLogout() {
    stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  }

  return (
    <div className="">
      {/* this is a header */}
      <header className="dark:border-gray-700  fixed w-full dark:bg-gray-500 py-5 shadow flex justify-around items-center">
        {/* room name container */}
        <div>
          <h1 className="text-xl font-semibold">
            Room : <span>{roomId}</span>
          </h1>
        </div>
        {/* username container */}

        <div>
          <h1 className="text-xl font-semibold">
            User : <span>{currentUser}</span>
          </h1>
        </div>
        {/* button: leave room */}
        <div>
          <button
            onClick={handleLogout}
            className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full"
          >
            Leave Room
          </button>
        </div>
      </header>

      <main
        ref={chatBoxRef}
        className="py-20 px-10   w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto "
      >
        { messages && messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            } `}
          >
            <div
              className={`my-2 ${
                message.sender === currentUser ? "bg-green-800" : "bg-gray-500"
              } p-2 max-w-xs rounded`}
            >
              <div className="flex flex-row gap-2">
                <img
                  className="h-10 w-10"
                  src={"https://avatar.iran.liara.run/public/43"}
                  alt="imgage"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">{message.sender}</p>
                  <p>{message.content}</p>
                  <p className="text-xs text-gray-400">
                    {timeAgo(message.timeStamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      {/* input message container */}
      <div className=" fixed bottom-4 w-full h-16 ">
        <div className="h-full  pr-10 gap-4 flex items-center justify-between rounded-full w-1/2 mx-auto dark:bg-gray-900">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            type="text"
            placeholder="Type your message here..."
            className=" w-full  dark:border-gray-600 b dark:bg-gray-800 dark:text-white px-5 py-2 rounded-full h-full focus:outline-none  "
          />

          <div className="flex gap-1">
            <button className="dark:bg-purple-600 h-10 w-10  flex   justify-center items-center rounded-full">
              <MdAttachFile size={20} />
            </button>
            <button
              onClick={sendMessage}
              className="dark:bg-green-600 h-10 w-10  flex   justify-center items-center rounded-full"
            >
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;