//How to make a meme server courtesy of RhymBil
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server); // Notice the change here

//setting the required variables

memers = []; //users array
memeConnections = []; //connections array

server.listen(process.env.PORT || 3000);  // It will run on localhost:(any number)
console.log("Waterchat Server Is Up");

app.get("/", function(req, res){
	res.sendFile(__dirname + "/WaterchatServer.html"); //links to html file CHANGE /index.html to you actually html file
	
});
	
io.sockets.on("connection", function(socket){
	//connection stuff
	memeConnections.push(socket);
	console.log("Memers connected: %s", memeConnections.length);
	
	// disconnection stuff
	socket.on("disconnect", function(data){
		
		memers.splice(memers.indexOf(socket.username), 1); //accessing the array memers
		
		
	memeConnections.splice(memeConnections.indexOf(socket),1);
	console.log("Memers disconnected: %s ", memeConnections.length);
	});
	
	//send dem meme messages
	socket.on("send meme message", function(data){ 
		console.log(data);// shows what the memers typed in console
		io.sockets.emit("new meme message", {msg: data});
	});
});
