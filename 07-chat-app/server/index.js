const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {
  users,
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./users");

const PORT = process.env.PORT || 5000;

app.use(router);
app.use(cors());

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    console.log(`User ${name} entered`);
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}!`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `User ${user.name} has joined the room!`,
    });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `User ${user.name} has left the room!!!`,
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
