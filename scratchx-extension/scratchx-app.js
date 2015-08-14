var net = require('net');
var webSocket = require('ws');


var connected = false;
var receiving = false;
var attention, meditation, blink;

var attentionRegex = /\"attention":([0-9]*)/;
var meditationRegex = /\"meditation":([0-9]*)/;
var blinkRegex = /\"blinkStrength":([0-9]*)/;
var lowSignalRegex = /\"poorSignalLevel":200/;

/* WebSocket Server */

var WebSocketServer = webSocket.Server;
var wss = new WebSocketServer({ port: 1122 });
var _ws;

console.log('websocket server listening on port 1122');

wss.on('connection', function connection(ws) {
  console.log('new websocket client connected');
  _ws=ws;
});

/* Client socket (connects to Thinkgear Connector app) */

var socketClient = net.connect({port:13854, host:'127.0.0.1'}, function() {
    console.log('Thinkgear connected.');
	socketClient.write('{"enableRawOutput":false,"format":"Json"}');
	connected = true;
})

socketClient.on('error', function(err) {
	console.log("error: "+err);
})

socketClient.on('data', function(chunk) {
	
	// Forwarding
	if(_ws){
		_ws.send(''+chunk);
	}
	
	// Logging
	var string = new String(chunk);
	
	var matches = string.match(attentionRegex);
	if(matches){
		attention = matches[1];
		console.log("attention: "+attention);
		receiving = true;
	}
	
	var matches = string.match(meditationRegex);
	if(matches){
		meditation = matches[1];
		console.log("meditation: "+meditation);
		receiving = true;
	}
	
	var matches = string.match(blinkRegex);
	if(matches){
		blink = matches[1];
		console.log("blink: "+blink);
		receiving = true;
	}
	
	var matches = string.match(lowSignalRegex);
	if(matches){
		receiving = false;
	}
})

socketClient.on('disconnect', function(){
	connected = false;
})

