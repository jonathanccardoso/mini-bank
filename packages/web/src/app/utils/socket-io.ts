import { io } from "socket.io-client";

export const socket = io('http://server:3000', {
  autoConnect: false,
  rejectUnauthorized: false,
  transports: ['websocket']
})

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});