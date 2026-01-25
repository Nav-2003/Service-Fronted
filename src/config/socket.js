import { io } from "socket.io-client";

<<<<<<< HEAD
const socket = io(Api, {
  path: "/socket.io",
  transports: ["websocket","polling"]  
=======
const Api = import.meta.env.VITE_BACKEND_API;

const socket = io(Api, {
  path: "/socket.io",
  transports: ["polling","websocket"]  
>>>>>>> 793cdb4cd8168a4b82fd5fc1dd22707b46da0d83
});

export default socket;
