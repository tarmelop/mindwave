(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_attention = function() {
        return 1; 
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