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
	
	 	var jsonData = JSON.parse(evt.data);
	
		if (jsonData.eSense){
			attention = jsonData.eSense.attention || 0 ;
	        meditation = jsonData.eSense.meditation || 0 ;
		} else if (jsonData.blinkStrength){
			blink = jsonData.blinkStrength;
		}    
    }; 

    websocket.onerror = function(evt) { 
        console.log('error: '+evt);
    };

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_attention = function() {
        return attention;
    };

    ext.get_meditation = function() {
        return meditation; 
    };

    ext.get_blink = function() {
        return blink;
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['r', 'attention', 'get_attention'],
            ['r', 'meditation', 'get_meditation'],
            ['r', 'blink', 'get_blink']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Mindwave extension', descriptor, ext);

})({});