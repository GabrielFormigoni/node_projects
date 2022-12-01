const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

app.use(router);

io.on("connection", (socket) => {
  console.log("New user connected!!!");

  socket.on("join", ({ name, room }) => {
    console.log(name, room);
  });

  socket.on("disconnect", () => {
    console.log("User left!!!");
  });
});
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
