const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const { on } = require("./model/userSchema");
const serverApp = require("http").createServer(app);
const io = require("socket.io")(serverApp, { cors: { origin: "*" } });

let DB, password;

if (process.env.NODE_ENV === "development") {
  password = process.env.PASSWORD_DB;
  DB = process.env.MONGO_DB.replace("<PASSWORD>", password);
} else {
  password = process.env.PASSWORD_DB_PROD;
  DB = process.env.MONGO_DB_PROD.replace("<PASSWORD>", password);
}

const PORT = process.env.PORT || 5000;

serverApp.listen(PORT, () => {
  console.log(`Starting server on port: ${PORT}, ENV: ${process.env.NODE_ENV}`);
});

let usersId = [];

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("storeClientInfo", (data) => {
    usersId.push({ socketId: socket.id, id: data.id });
  });

  socket.on("message send", (data) => {
    let forUserId = usersId.filter((user) => user.id === data.userId)[0];
    if (forUserId)
      io.to(forUserId.socketId).emit("message receive", {
        text: data.msg,
        user: data.userId,
        createdAt: data.createdAt,
        conversationId: data.chatId,
      });
  });

  socket.on("notification send", (data) => {
    let forUserId = usersId.filter((user) => user.id === data.userId)[0];
    if (forUserId)
      io.to(forUserId.socketId).emit("notification receive", {
        type: data.type,
      });
  });

  socket.on("notification send", (data) => {
    const forUserId = usersId.filter((user) => user.id === data.userId);
    io.to(forUserId).emit("notification receive", {
      notification: data.notification,
      user: data.user,
    });
  });

  socket.on("disconnect", (data) => {
    usersId = usersId.filter((user) => user.socketId !== socket.id);
  });
});

// console.log(io.sockets.sockets);
// app.listen(PORT, () => {
//   console.log(`Starting server on port: ${PORT}, ENV: ${process.env.NODE_ENV}`);
// });

const server = mongoose
  .connect(DB)
  .then(() => {
    console.log(`MONGODB connection established!!!`);
  })
  .catch((err) => {
    console.log("Something went wrong with DB!");
    console.log(err);
  });
