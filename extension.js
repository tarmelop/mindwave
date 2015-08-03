(function(ext) {

    var attention;
    var meditation;
    var blink;

    // WebSocket Test

    var wsUri = "ws://127.0.0.1:1122/"; 
    websocket = new WebSocket(wsUri); 

    websocket.onopen = function(evt) { 
        
    }; 
    websocket.onclose = function(evt) { 
        
    }; 

    websocket.onmessage = function(evt) { 
		attention = JSON.parse(evt.data).eSense.attention;
        meditation = JSON.parse(evt.data).eSense.meditation;
        blink = JSON.parse(evt.data).blinkStrength;
    }; 
    websocket.onerror = function(evt) { 
        
    };

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

	// Reset value when is read

    ext.get_attention = function() {
		var _attention = attention;
		attention = 0;
        return _attention;
    };

    ext.get_meditation = function() {
		var _meditation = meditation;
		meditation = 0;
        return _meditation; 
    };

    ext.get_blink = function() {
		var _blink = blink;
		blink = 0;
        return _blink;
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['r', 'attention', 'get_attention'],
            ['r', 'meditation', 'get_meditation'],
            ['r', 'blink', 'get_blink'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Mindwave extension', descriptor, ext);


})({});