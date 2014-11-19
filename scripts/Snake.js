define(['ctrl', 'directionenum', 'underscore', 'drawingentity'], function(Ctrl, DirectionEnum, _, DrawingEntity) {
    console.log("Snake loaded....");
    return _.extend({}, DrawingEntity, {
	snake_cells: [],
	last_direction: null,

        init: function(cl) {
	    this.snake_cells = [];
            this.snake_cells.push({x:2, y:0});
            this.snake_cells.push({x:1, y:0});
            this.snake_cells.push({x:0, y:0});
            this.CELL_LENGTH = cl;
        },

        draw: function() { // draws the snake based on the snake cells
	    for(var i=0; i < this.snake_cells.length; ++i) {
                ctx.fillStyle = 'white';
	        ctx.fillRect(this.snake_cells[i].x * this.CELL_LENGTH, this.snake_cells[i].y * this.CELL_LENGTH, this.CELL_LENGTH, this.CELL_LENGTH);
	    }
        },

        moveLeft: function() {
	    var l = this.snake_cells.length;
	    var head = _.first(this.snake_cells);
	    var new_head = {x: head.x, y:head.y};
	    --new_head.x;
            this.snake_cells.unshift(new_head);
	    this.snake_cells = _.first(this.snake_cells, l); // clip the snake length
	    this.last_direction = DirectionEnum.LEFT;
        },
        moveRight: function() {
	    var l = this.snake_cells.length;
	    var head = _.first(this.snake_cells);
	    var new_head = {x: head.x, y:head.y};
	    ++new_head.x;
            this.snake_cells.unshift(new_head);
	    this.snake_cells = _.first(this.snake_cells, l); // clip the snake length
	    this.last_direction = DirectionEnum.RIGHT;
        },
        moveUp: function() {
	    var l = this.snake_cells.length;
	    var head = _.first(this.snake_cells);
	    var new_head = {x: head.x, y:head.y};
	    --new_head.y;
            this.snake_cells.unshift(new_head);
	    this.snake_cells = _.first(this.snake_cells, l); // clip the snake length
	    this.last_direction = DirectionEnum.UP;
        },
        moveDown: function() { 
	    var l = this.snake_cells.length;
	    var head = _.first(this.snake_cells);
	    var new_head = {x: head.x, y:head.y};
	    ++new_head.y;
            this.snake_cells.unshift(new_head);
	    this.snake_cells = _.first(this.snake_cells, l); // clip the snake length
	    this.last_direction = DirectionEnum.DOWN;
        },
        move: function() { // Create snake cells if snake is moving
            // Detect controller input
	    if (this.last_direction === DirectionEnum.LEFT) {
                if (Ctrl.right) {
		    this.moveLeft();
	        } else {
                    if (Ctrl.left) {
		        this.moveLeft();
		    } else if (Ctrl.up) {
                        this.moveUp();
		    } else if (Ctrl.down) {
                        this.moveDown();
		    }
		}
	    } else if (this.last_direction === DirectionEnum.RIGHT) {
                if (Ctrl.left) {
		    this.moveRight();
	        } else {
                    if (Ctrl.right) {
		        this.moveRight();
		    } else if (Ctrl.up) {
                        this.moveUp();
		    } else if (Ctrl.down) {
                        this.moveDown();
		    }
		}
	    } else if (this.last_direction === DirectionEnum.UP) {
                if (Ctrl.down) {
		    this.moveUp();
	        } else {
                    if (Ctrl.right) {
		        this.moveRight();
		    } else if (Ctrl.left) {
                        this.moveLeft();
		    } else if (Ctrl.up) {
                        this.moveUp();
		    }
		}
	    } else if (this.last_direction === DirectionEnum.DOWN) {
                if (Ctrl.up) {
		    this.moveDown();
	        } else {
                    if (Ctrl.right) {
		        this.moveRight();
		    } else if (Ctrl.left) {
                        this.moveLeft();
		    } else if (Ctrl.down) {
                        this.moveDown();
		    }
		}
	    } 
        },
    });
});
