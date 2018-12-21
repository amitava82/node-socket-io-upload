var io = require('socket.io').listen(3333);
var ss = require('socket.io-stream');
var path = require('path');
var fs = require('fs-extra');

io.on('connection', function(socket) {
  console.log('Connected: ', socket.id);
  ss(socket).on('upload', function(stream, data) {
    try {
      // write to a temp folder
      var filename = path.join(__dirname, 'temp', data.name);
      // Ensure file exists
      fs.ensureFileSync(filename);

      stream.on('end', function () {
        console.log('Done writing file');
        socket.emit('upload:done');
      });
      stream.pipe(fs.createWriteStream(filename));
    } catch (e) {
      socket.emit('upload:error', { error: e.message });
    }
  });
});