var io = require('socket.io-client');
var ss = require('socket.io-stream');
var fs = require('fs');

// File to upload
var filename = 'test.jpg';

// Connect to server
var socket = io.connect('http://localhost:3333');

socket.on('connect', function () {
  console.log('socket connected');
});

socket.on('disconnect', function(){
  console.log('disconnected from server');
});

socket.on('error', function (error) {
  console.log(error);
});

socket.on('upload:done', function () {
  console.log('upload complete');
});

socket.on('upload:error', function (msg) {
  console.log('upload error: ', msg);
});

function uploadFile(file) {
  var stream = ss.createStream();
  ss(socket).emit('upload', stream, {name: file});

  fs.createReadStream(file).pipe(stream);
}

uploadFile(filename);
