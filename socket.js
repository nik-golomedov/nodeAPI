const socketio = require("socket.io");

let io = 0;
const user = [];

module.exports = {
  initialize: (server) => {
    io = socketio(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });
    io.on("connection", (socket) => {
      socket.on("checkUser", (data) => {
        user.push({ id: data.id, socketId: socket.id });
      });

      socket.on("disconnect", () => {
        user.filter((item) => item.socketId !== socket.id);
      });
    });
  },
  getInstance: () => io,
  getUser: () => user,
};
