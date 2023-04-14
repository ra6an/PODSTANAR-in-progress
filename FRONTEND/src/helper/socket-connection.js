import { io } from "socket.io-client";

import { SERVER_URL } from "../config";

export let socket;

const socketCon = (userData) => {
  socket = io(`${SERVER_URL}`);

  socket.on("connection", (socket) => {});

  socket.on("message notification");

  socket.on("connect", (data) => {
    socket.emit("storeClientInfo", { id: userData.id });
  });

  socket.on("message", (msgData) => console.log(msgData));
};

export default socketCon;
