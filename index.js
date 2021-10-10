var express = require('express')
const path = require('path');
var cors = require('cors')

const { PeerServer } = require('peer');

const peerServer = PeerServer({ port: 4008, path: '/peerjs' });

var app = express()
var server = require('http').createServer(app);

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// Server public files (client code)
app.get('/client', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/client.html'));
});

app.get('/ping', function (req, res) {
  res.send('pong');
});

var rooms = [];

app.get('/getrandom/:id', function(req, res) {
  if (rooms.length == 0) {
    // There are no rooms so lets "create" one
    rooms.push(req.params.id);
    res.send(JSON.stringify({"id": null}));
  } else {
    res.send(JSON.stringify({"id": rooms.pop()}));
  }
});

server.listen(3000, "127.0.0.1");

console.log("Shitchat running on port 3000");
