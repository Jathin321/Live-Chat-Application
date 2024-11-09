import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Chatting() {
  const [messages, setMessages] = useState([]);
  const [newMessage,setNewmessage] = useState("");
  let navigate = useNavigate()

  const loadData = async () => {
    let response = await fetch("http://localhost:7777/api/fetchMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setMessages(response);
    console.log(response);
  };

  useEffect(() => {
    loadData();
    const user = localStorage.getItem("userEmail");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail")
    navigate("/signup")
  }

  const handleSendMessage = async() => {
    try {
      const response = await fetch("http://localhost:7777/api/sendMessage", {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender : localStorage.getItem("userEmail"),
          content : newMessage
        })
      });
      const json = await response.json();
      // console.log(json);
      if(json.success == false){
        alert("Insufficient data to send msg (or) technical error")
      }
    } catch (error) {
      console.error("SYJ Error:", error);
    }
  }

  return (
    <>
      <div className="flex h-screen text-gray-800 antialiased">
        <div className="flex h-full w-full flex-row overflow-x-hidden">
          <div className="flex h-full flex-auto flex-col p-6">
            <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100 p-4">
              <div className="mb-4 flex h-full flex-col overflow-x-auto">
                <div className="flex h-full flex-col">
                  <div className="grid grid-cols-12 gap-y-2">
                    {messages.map((msg) => {
                      return msg.sender !== localStorage.getItem("userEmail") ? (
                        <div key={msg._id} className="col-start-1 col-end-8 rounded-lg p-3">
                          <div className="flex flex-row items-center">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                            {msg.sender === "a@gmail.com" ? "A" : msg.sender === "b@gmail.com" ? "B" : msg.sender === "c@gmail.com" ? "C" : "User"}
                            </div>
                            <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
                              <div>{msg.content}</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div key={msg._id} className="col-start-6 col-end-13 rounded-lg p-3">
                          <div className="flex flex-row-reverse items-center justify-start">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                            {msg.sender === "a@gmail.com" ? "A" : msg.sender === "b@gmail.com" ? "B" : msg.sender === "c@gmail.com" ? "C" : "User"}
                            </div>
                            <div className="relative mr-3 rounded-xl bg-indigo-100 px-4 py-2 text-sm shadow">
                              <div>{msg.content}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>


              <div className="flex h-16 w-full flex-row items-center rounded-xl bg-white px-4">
                <div>
                  <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                </div>

                {/* text bar */}
                <div className="ml-4 flex-grow">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewmessage(e.target.value)}
                      className="flex h-10 w-full rounded-xl border pl-4 focus:border-indigo-300 focus:outline-none"
                    />
                    <button className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-400 hover:text-gray-600"></button>
                  </div>
                </div>

                <div className="ml-4">
                  <button onClick={handleSendMessage} className="flex flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500 px-4 py-1 text-white hover:bg-indigo-600">
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="-mt-px h-4 w-4 rotate-45 transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </span>
                  </button>
                </div>

                {/* logout */}
                <div className="ml-4">
                  <button onClick={handleLogout} className="flex flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500 px-4 py-1 text-white hover:bg-indigo-600">
                    <span>Log Out</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatting;
