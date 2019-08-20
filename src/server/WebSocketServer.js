
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log("TCL: WebSocketServer connected");

  const sendNowTime = setInterval(() => {
    ws.send(String(new Date()))
  }, 1000);

  ws.send('Server send connected msg');

  ws.on('message', function incoming(message) {
    console.log(`WebSocket received: ${message}`);
    //取得所有連接中的 client
    let clients = wss.clients

    //做迴圈，發送訊息至每個 client
    clients.forEach(client => {
      client.send(`Server group send ${message}`);
    })
  });


  ws.on('close', () => {
    clearInterval(sendNowTime)
    console.log('Close connected')
  })
});