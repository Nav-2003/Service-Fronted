import { MessageCircle, Send, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import socket from "../config/socket";

export default function FloatingChat({userDetail}) {
//  const bookingId=userDetail.bookingId
   let bookingId;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  /* Join room */
  useEffect(() => {
    if (!bookingId) return;
    socket.emit("joinRoom", { roomId: bookingId });
  }, [bookingId]);

  /* Receive messages */
  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("chatMessage", handleMessage);
    return () => socket.off("chatMessage", handleMessage);
  }, []);

  /* Auto scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const payload = {
      roomId: bookingId,
      sender: userType,
      text: message,
    };

    socket.emit("chatMessage", payload);
    setMessages((prev) => [...prev, payload]);
    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700
                   text-white p-4 rounded-full shadow-xl transition"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl
                        flex flex-col z-50 border overflow-hidden">

          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <span className="font-semibold">Live Chat</span>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[75%] px-3 py-2 rounded-xl text-sm
                  ${msg.sender === userType
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-gray-200 text-black mr-auto"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
