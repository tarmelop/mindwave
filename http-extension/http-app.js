var net = require('net')
var express = require('express')

var connected = false
var receiving = false
var attention, meditation, blink

var attentionRegex = /\"attention":([0-9]*)/
var meditationRegex = /\"meditation":([0-9]*)/
var blinkRegex = /\"blinkStrength":([0-9]*)/
var lowSignalRegex = /\"poorSignalLevel":200/

/* HTTP server (communicates with Scratch2Offline)*/

var app = express()
var httpServer = app.listen(3000, function () {

  var host = httpServer.address().address
  var port = httpServer.address().port

  console.log('MindwaveExtension server listening at http://%s:%s', host, port)

})

app.get('/poll', function (req, res) {
	
	if (connected && receiving){
		res.send(
			'attention '+attention+'\n'+
			'meditation '+meditation+'\n'+
			'blink '+blink+'\n'
		)
		/*// reset blink when sent
		if (blink > 0){
			blink = 0
		}*/
	} else if (!connected){
		res.send('_problem ThinkGear not connected')
	} else if (!receiving){
		res.send('_problem Low signal')
	}
})

/* Client socket (connects to Thinkgear Connector app) */

var socketClient = net.connect({port:13854, host:'127.0.0.1'}, function() {
    console.log('Thinkgear connected.')
	socketClient.write('{"enableRawOutput":false,"format":"Json"}')
	connected = true
})

socketClient.on('data', function(chunk) {
	
	var string = new String(chunk)
	//console.log(''+chunk)
	
	var matches = string.match(attentionRegex)
	if(matches){
		attention = matches[1]
		console.log("attention: "+attention)
		receiving = true
	}
	
	var matches = string.match(meditationRegex)
	if(matches){
		meditation = matches[1]
		console.log("meditation: "+meditation)
		receiving = true
	}
	
	var matches = string.match(blinkRegex)
	if(matches){
		blink = matches[1]
		console.log("blink: "+blink)
		receiving = true
	}
	
	var matches = string.match(lowSignalRegex)
	if(matches){
		receiving = false
	}
})

socketClient.on('disconnect', function(){
	connected = false
})

