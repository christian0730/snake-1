define(['directionenum'], function(DirectionEnum) {
    console.log("loading Ctrl......");
    return {
	keyhandlers: {}, // map of keycode to functions
        init: function() {
            this.left = false;
            this.right = false;
            this.up = false;
            this.down = false;
            // Browser based events
	    var that = this;
            window.addEventListener('keydown', function(event) {
	        if (event.keyCode in that.keyhandlers) {
                    that.keyhandlers[event.keyCode](); // execute handler
	        }
		event.preventDefault(); // prevent the arrow keys from scrolling page
            }, true);
        },
        addKeyListener: function(code, fn) {
	    this.keyhandlers[code] = fn;
	}
    };
});
