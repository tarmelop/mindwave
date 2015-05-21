(function(ext) {

    var attention = -1;
    var meditation;
    var blink;

    // WebSocket Test

    /*var wsUri = "ws://127.0.0.1:1122/"; 
    websocket = new WebSocket(wsUri); 

    websocket.onopen = function(evt) { 
        
    }; 
    websocket.onclose = function(evt) { 
        
    }; 
    websocket.onmessage = function(evt) { 
        attention = evt.data; // test
    }; 
    websocket.onerror = function(evt) { 
        
    }; */

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
        return 1; 
    };

    ext.get_blink = function() {
        return 1; 
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