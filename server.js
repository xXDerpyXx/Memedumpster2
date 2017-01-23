console.log("BOOTED");
var express = require('express');
var userTotal = 0;
console.log("GOT EXPRESS");
var app = express();
//var fileIO = require('socket.io-file');
console.log("GOT APP");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var allMessage = ""
console.log("GOT SOCKET+HTTP");
app.use(express.static('.'));
console.log("STATIC");
io.on('connection', function(socket){
		userTotal += 1;
  		console.log('a user connected');
  		console.log('user count: '+userTotal)
  		var color = ""
 		io.emit('return message',allMessage,userTotal);
 		socket.on('disconnect', function(){
   			console.log('user disconnected');
   			userTotal -= 1;
   			console.log('user count: '+userTotal)
 	});
});

http.listen(1337);
io.on('connection', function(socket){
    
socket.on('chat message', function(msg,color){
	console.log('message: ' + msg);
	console.log('   color: ' + color);
	msg = msg.trim();
	if(msg.length>1000){
		console.log("TOO LONG");
	}else{
		if(msg.length>1){
			allMessage = '<div style="background-color:#'+color+';padding:3px">'+msg+"</div>" +allMessage;
			io.emit('return message',allMessage,userTotal);
			console.log('   sending back: "'+msg+'", color: '+color);	
		}else{
			console.log('TOO SHORT')
		}
	}
	
	console.log('---------------')
	});
});

console.log("FINISHED");
