const messageHandle = (socket, io) => {
  socket.on("message", (data) => {
    data.emit = "from emit";
    socket.to("room-" + data.to).emit("message", data);
    socket.emit("message", data);
  });
};
module.exports = messageHandle;
