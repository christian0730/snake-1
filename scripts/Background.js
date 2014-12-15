// Background.js
define(['DrawingEntity', 'underscore'], function (DrawingEntity, _) {
    return _.extend({}, DrawingEntity, {
    init: function(ctx, width, height) {
	this.ctx = ctx;
	this.width = width;
	this.height = height;
    },
    draw: function() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    });
});
