import { io } from "socket.io-client";

export const socket = io('http://server:3000', {
  autoConnect: false,
})