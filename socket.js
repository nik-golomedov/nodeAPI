// const socketio = require('socket.io');
//  const init =(server)=> {
//     const io = socketio(server);
//     io.on("connection", (socket) => {
//         socket.on("checkUser", (arg) => {
//           socket.join("room");
//           console.log(arg);
//         });
//         socket.join("room");
//         console.log("Someone has connected");
//         const events = require("events");
//         const eventEmitter = new events.EventEmitter();
//         eventEmitter.on("newEvent", (msg) => {
//           io.emit("bookAdded", msg);
//         });
//         const room = io.sockets.adapter.rooms["room"];
//         socket.on("disconnecting", () => {
//           console.log(socket.rooms.length);
//           socket.leave("room");
//         });
    
//         socket.on("disconnect", () => {
//           socket.leave("room");
//         });
//         console.log(io.sockets.adapter.rooms);
//         exports.emitter = eventEmitter;
//       });
//     return io;
// }

// module.exports = init;