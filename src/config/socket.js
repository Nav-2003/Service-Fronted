import { io } from "socket.io-client";

const Api = import.meta.env.VITE_BACKEND_API;

const socket = io(Api, {
  path: "/socket.io",
  transports: ["polling","websocket"]  
});

export default socket;
