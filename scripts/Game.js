define(['WelcomeScreen', 'GameOverException', 'Background', 'Hud', 'Ctrl', 'Apple', 'Gameoverscreen', 'DirectionEnum', 'underscore', 'Snake'],
       function(WelcomeScreen, GameOverException, Background, Hud, Ctrl, Apple, GameOverScreen, DirectionEnum, _, Snake, DrawingEntity) {
    return _.extend({}, DrawingEntity, {
        // Setup configuration
        canvas: document.getElementById('canvas'),
        setup: function() {
            if (this.canvas.getContext) {
                // Setup variables
                ctx = this.canvas.getContext('2d');

                // Cache width and height of the Canvas to save processing power
                this.width = this.canvas.width;
                this.height = this.canvas.height;
		this.MIN_X = 0;
		this.MIN_Y = 0;
		this.MAX_X = (this.canvas.width / this.LENGTH_CELL) - 1;
		this.MAX_Y = (this.canvas.height / this.LENGTH_CELL) - 1;
		console.log("WIDTH AND HEIGHT");
		console.log(this.width);
		console.log(this.height);
                // Run the game
                WelcomeScreen.show(ctx, this.width, this.height);
                var fn = _.bind(this.runGame, this);
		this.ref_runGame = fn; // bind creates a new fn so i need to cache this for removeEventListener
                this.canvas.addEventListener('click', fn, false);
                Ctrl.init();
		var that = this;
		// Left
		Ctrl.addKeyListener(37, function() { 
		    if (that.is_paused === false) {
                            Ctrl.left = true;
                            Ctrl.right = false;
                            Ctrl.up = false;
                            Ctrl.down = false;
	                    Ctrl.last_direction = DirectionEnum.LEFT;
		    }
		});
                // Right
		Ctrl.addKeyListener(39, function() { 
		    if (that.is_paused === false) {
                            Ctrl.left = false;
                            Ctrl.right = true;
                            Ctrl.up = false;
                            Ctrl.down = false;
	                    Ctrl.last_direction = DirectionEnum.RIGHT;
		    }
		});
                // Up
		Ctrl.addKeyListener(38, function() { 
		    if (that.is_paused === false) {
                            Ctrl.left = false;
                            Ctrl.right = false;
                            Ctrl.up = true;
                            Ctrl.down = false;
	                    Ctrl.last_direction = DirectionEnum.UP;
		    }
		});
		// Down
		Ctrl.addKeyListener(40, function() { 
		    if (that.is_paused === false) {
                            Ctrl.left = false;
                            Ctrl.right = false;
                            Ctrl.up = false;
                            Ctrl.down = true;
	                    Ctrl.last_direction = DirectionEnum.DOWN;
		    }
		});
		Ctrl.addKeyListener(32, function() { 
		    console.log("'SPC' hit!");
		    that.toggle_pause();
		});
		//this.snake = require('Snake');
		this.snake = Snake;
            }
        },
	// INSPIRED FROM http://www.ibm.com/developerworks/library/j-html5-game2/index.html
	// http://creativejs.com/resources/requestanimationframe/
	animate: function(time) { // Animation loop
	    setTimeout(_.bind(function() {
		        try {
                            // Drawing code goes here
		            if (!this.is_paused) {
                                 this.draw(time);
	                    }
                            requestAnimationFrame(_.bind(this.animate, this));
		        } catch (e) {
		            console.log("CAUGHT EXCEPTION");
		            if (e instanceof GameOverException) {
                                console.log("GameOverException found! " + e.toString());
                                GameOverScreen.show(ctx, this.width, this.height);
                                var fn = _.bind(this.restartGame, this);
				this.ref_restartGame = fn; // bind creates a new fn so i need to cache this for removeEventListener
                                this.canvas.addEventListener('click', fn, false);
                            } else {
			        console.log(e.value);
			        console.log(e.message);
                                console.log(e.stack);
		            }
		        }
                    }, this), 1000 / this.FPS);
	},

	runGame: function() {
	    console.log("entered runGame");
            this.canvas.removeEventListener('click', this.ref_runGame, false);
            this.init();

            // Run animation
	    requestAnimationFrame(_.bind(this.animate, this));    // Start the animation
	},

	// Event handler
	restartGame: function() {
            console.log("entered restartGame(...)");
            this.canvas.removeEventListener('click', this.ref_restartGame, false);
	    Ctrl.left = false;
	    Ctrl.right = false;
	    Ctrl.up = false;
	    Ctrl.down = false;
	    this.init();
            this.runGame();
	},

        // Setup initial objects
        init: function() {
	    console.log("Game.init()");
            Background.init(ctx, this.width, this.height);
            Hud.init();
	    Apple.init(this.LENGTH_CELL, this.MIN_X, this.MAX_X, this.MIN_Y, this.MAX_Y);
            Apple.generate_new_apple([]);
            this.snake.init(this.LENGTH_CELL);
	    this.FPS = this.INITIAL_FPS;
	    this.paused = false;
	    console.log("setting FPS to normal");
	    Ctrl.right = true; // start the game my automatically moving snake to the right
	    this.snake.last_direction = DirectionEnum.RIGHT;
        },

	LENGTH_CELL: 10, // Pixels per cell on the game grid
        MAX_X: 0, // Max x position on the game grid
	MAX_Y: 0, // Max y position on the game grid
	MIN_X: 0, // Min x position on the game grid
	MIN_Y: 0, // Min y position on the game grid
	INITIAL_FPS: 8,
	FPS: 8, // Frames Per Second
	count: 0,
        draw: function(time) {
            ctx.clearRect(0, 0, this.width, this.height);
            // Draw objects
            Background.draw();
            Apple.draw(ctx);
	    // Perform all the snake actions in this frame before drawing
	    this.snake.old_snake_cells = this.snake.snake_cells;
            this.snake.move();
	    this.grow_snake();
	    this.edges();
	    this.suicide();
            this.snake.draw();
            Hud.draw(ctx, this.width, this.height);
        },

        // Edge detection
        edges: function() {
	    var head = _.first(this.snake.snake_cells);
            if (head.x < 0 || head.x > this.MAX_X || head.y > this.MAX_Y || head.y < this.MIN_Y) {
	        throw new GameOverException();
            } 
        },

        // Hander to grow the snake if necessary
        grow_snake: function() {
	    var head = _.first(this.snake.snake_cells);
	    if (Apple.is_apple_position(head.x, head.y)) {
                console.log("GROWING SNAKE");
	        var last = _.last(this.snake.snake_cells);
                this.snake.snake_cells.push({x:last.x, y:last.y});
                var snd = new Audio("BitingApple.wav"); // buffers automatically when created
                snd.play();
		Apple.generate_new_apple(this.snake.snake_cells);
		++this.FPS; // Make game faster
                Hud.increment_score(1);
	    }
        },
        // Suicide detection
        suicide: function() {
	    var head = _.first(this.snake.snake_cells);
	    var rest = _.rest(this.snake.snake_cells);
	    var result = _.find(rest, function (cell) { return cell.x === head.x && cell.y === head.y })
	    if (result) {
	        throw new GameOverException("suicide");
            } 
        },

        // Handler to unpause/pause game
        toggle_pause: function() {
	    console.log("Entered toggle_pause(...)");
	    this.is_paused = ! this.is_paused;
        },
        is_paused: false,
    });
});
