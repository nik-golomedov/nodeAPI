module.exports = (socket) => {
  socket.on("checkUser", (data) => {
    console.log(data);
  });
};
