const io = require('socket.io');
const server = io.listen(8000); //8000 port

server.on('connection', (socket) => {
  console.log("TCL: socket.io start");
  console.info(`connect ${socket.id}`);

  // a action named sayhi
  socket.on('sayhi', (msg) => {
    console.info(msg)
  })

  socket.on('getMessage', message => {
    console.info(message)
    //回傳 message 給發送訊息的 Client
    socket.emit('getMessage', `socket server say ${message}`);
  })

  // when socket disconnect
  socket.on('disconnect', () => {
    console.info(`disconnect ${socket.id}`);
  });
});
