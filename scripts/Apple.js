define(['drawingentity'], function (DrawingEntity) {
    return _.extend({}, DrawingEntity, {
        x: 0,
        y: 0,
        init: function(cell_length, min_x, max_x, min_y, max_y) {
	    this.cell_length = cell_length;
	    this.min_x = min_x;
	    this.min_y = min_y;
	    this.max_x = max_x;
	    this.max_y = max_y;
        },
        generate_position: function(snake_cells) { // Generate a position of apple that is not inside the snake
	    var x = _.random(this.min_x, this.max_y);
	    var y = _.random(this.min_y, this.max_y);
	    for(var i=0; i < snake_cells.length; ++i) {
                if (snake_cells[i].x === x && snake_cells[i].y === y)
                    return this.generate_position();
	    }
	    return [x,y];
        },
        generate_new_apple: function(snake_cells) {
	    var xy = this.generate_position(snake_cells);
	    this.x = xy[0];
	    this.y = xy[1];
        },
        is_apple_position: function(x,y) {
	    return x === this.x && y === this.y;
        },
        draw: function(ctx) {
	    ctx.fillStyle = 'green';
            ctx.fillRect(this.x * this.cell_length, this.y * this.cell_length, this.cell_length, this.cell_length);
        },
    });
});
