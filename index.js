var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sample = require('./sample.json');
var sample2 = require('./sample2.json');

http.listen(3000, function(){
    console.log('listening on *:3000');
});
app.use(express.static(__dirname));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket){
    setTimeout(tmt2, 3000);
    function tmt2() {
        io.emit('refresh', sample2);
        setTimeout(tmt, 3000);
    }
    socket.on('refresh', function(msg){
        tmt2();
        //io.emit('refresh', sample2);
    });
    function tmt() {
        io.emit('refresh', sample);
        //setTimeout(tmt2, 3000);
    }
    console.log('a user connected');
});