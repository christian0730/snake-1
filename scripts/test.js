'use strict';
var requirejs = require("requirejs");
requirejs.config({
    baseUrl: '.',
    nodeRequire: require
});

// NOTES: cannot test Game module because it depends on a real browser
suite('y2rayk Snake', function(){
    var WelcomeScreen, GameOverScreen, Apple, Background, Ctrl, DirectionEnum, GameOverException, Hud, Screen, Snake;

    setup(function (done){
        // This saves the module foo for use in tests. You have to use
        // the done callback because this is asynchronous.
        requirejs(['welcomescreen', 'gameoverscreen', 'apple', 'background', 'ctrl', 'directionenum', 'gameoverexception', 'hud', 'screen', 'snake'], function(mod, mod2, mod3, mod4, mod5, mod6, mod7, mod8, mod9, mod10) {
            //console.log("fired!");
            WelcomeScreen = mod;
            GameOverScreen = mod2;
	    Apple = mod3;
	    Background= mod4;
	    Ctrl = mod5;
	    DirectionEnum = mod6;
	    GameOverException = mod7;
	    Hud = mod8;
	    Screen = mod9;
	    Snake = mod10;
            done();
        });
    });

    suite('Apple', function(){
        test('x property', function(){
            if (!('x' in Apple))
                throw new Error("failed!");
        });
        test('y property', function(){
            if (!('y' in Apple))
                throw new Error("failed!");
        });
        test('init fn', function(){
            if (!('init' in Apple))
                throw new Error("failed!");
        });
        test('generate_position fn', function(){
            if (!('generate_position' in Apple))
                throw new Error("failed!");
        });
        test('generate_new_apple fn', function(){
            if (!('generate_new_apple' in Apple))
                throw new Error("failed!");
        });
        test('is_apple_position fn', function(){
            if (!('is_apple_position' in Apple))
                throw new Error("failed!");
        });
        test('is_apple_position fn2', function(){
	    Apple.x = 10;
	    Apple.y = 10;
            if (Apple.is_apple_position(2,2) !== false)
                throw new Error("failed!");
            if (Apple.is_apple_position(10,10) !== true)
                throw new Error("failed!");
        });
        test('draw fn', function(){
            if (!('draw' in Apple))
                throw new Error("failed!");
        });
    });

    suite('Background', function(){
        test('init property', function(){
            if (!('init' in Background))
                throw new Error("failed!");
        });
        test('draw property', function(){
            if (!('draw' in Background))
                throw new Error("failed!");
        });
    });

    suite('Ctrl', function(){
        test('keyhandlers property', function(){
            if (!('keyhandlers' in Ctrl))
                throw new Error("failed!");
        });
        test('init fn', function(){
            if (!('init' in Ctrl))
                throw new Error("failed!");
        });
        test('addKeyListener fn', function(){
            if (!('addKeyListener' in Ctrl))
                throw new Error("failed!");
	    Ctrl.addKeyListener(1, function() {});
            if (_.size(Ctrl.keyhandlers) !== 1)
                throw new Error("failed!");
	    Ctrl.addKeyListener(2, function() {});
            if (_.size(Ctrl.keyhandlers) !== 2)
                throw new Error("failed!");
	    Ctrl.addKeyListener(3, function() {});
            if (_.size(Ctrl.keyhandlers) !== 3)
                throw new Error("failed!");
        });
    });

    suite('DirectionEnum', function(){
        test('LEFT property', function(){
            if (!('LEFT' in DirectionEnum))
                throw new Error("failed!");
            if (DirectionEnum.LEFT !== 0)
                throw new Error("failed!");
        });
        test('RIGHT property', function(){
            if (!('RIGHT' in DirectionEnum))
                throw new Error("failed!");
            if (DirectionEnum.RIGHT !== 1)
                throw new Error("failed!");
        });
        test('UP property', function(){
            if (!('UP' in DirectionEnum))
                throw new Error("failed!");
            if (DirectionEnum.UP !== 2)
                throw new Error("failed!");
        });
        test('DOWN property', function(){
            if (!('DOWN' in DirectionEnum))
                throw new Error("failed!");
            if (DirectionEnum.DOWN !== 3)
                throw new Error("failed!");
        });
    });

    suite('Hud', function(){
        test('highest_score property', function(){
            if (!('highest_score' in Hud))
                throw new Error("failed!");
        });
        test('restore_highscore property', function(){
            if (!('restore_highscore' in Hud))
                throw new Error("failed!");
        });
        test('save_highscore property', function(){
            if (!('save_highscore' in Hud))
                throw new Error("failed!");
        });
        test('increment_score property', function(){
            if (!('increment_score' in Hud))
                throw new Error("failed!");
	    Hud.init();
	    Hud.increment_score(1000);
            if (Hud.score !== 1000)
                throw new Error("failed!");
        });
        test('draw property', function(){
            if (!('draw' in Hud))
                throw new Error("failed!");
        });
    });

    suite('Snake', function(){
        test('snake_cells property', function(){
            if (!('snake_cells' in Snake))
                throw new Error("failed!");
        });
        test('init fn', function(){
            if (!('init' in Snake))
                throw new Error("failed!");
        });
        test('draw fn', function(){
            if (!('draw' in Snake))
                throw new Error("failed!");
        });
        test('move fn', function(){
            if (!('move' in Snake))
                throw new Error("failed!");
	    Ctrl.right = true;
	    Snake.init();
	    Snake.last_direction = 1;
	    Snake.move();
	    Snake.move();
	    Snake.move(); // Snake moved right 3 times
            if (!(Snake.snake_cells[0].x === 5 && Snake.snake_cells[0].y === 0))
                throw new Error("failed!");
            if (!(Snake.snake_cells[1].x === 4 && Snake.snake_cells[1].y === 0))
                throw new Error("failed!");
            if (!(Snake.snake_cells[2].x === 3 && Snake.snake_cells[2].y === 0))
                throw new Error("failed!");
        });
        test('move fn2', function(){
	    Ctrl.right = false;
	    Ctrl.down = true;
	    Snake.init();
	    Snake.move();
	    Snake.move();
	    Snake.move(); // Snake moved down 3 times
	    console.log(Snake.snake_cells);
            if (!(Snake.snake_cells[0].x === 2 && Snake.snake_cells[0].y === 3))
                throw new Error("failed!");
            if (!(Snake.snake_cells[1].x === 2 && Snake.snake_cells[1].y === 2))
                throw new Error("failed!");
            if (!(Snake.snake_cells[2].x === 2 && Snake.snake_cells[2].y === 1))
                throw new Error("failed!");
        });
    });

    suite('WelcomeScreen', function(){
        test('text property', function(){
            if (!('text' in WelcomeScreen))
                throw new Error("failed!");
        });
        test('textSub property', function(){
            if (!('textSub' in WelcomeScreen))
                throw new Error("failed!");
        });
        test('textColor property', function(){
            if (!('textColor' in WelcomeScreen))
                throw new Error("failed!");
        });
        test('show property', function(){
            if (!('show' in WelcomeScreen))
                throw new Error("failed!");
        });
    });

    suite('GameOverScreen', function(){
        test('text property', function(){
            if (!('text' in GameOverScreen))
                throw new Error("failed!");
        });
        test('textSub property', function(){
            if (!('textSub' in GameOverScreen))
                throw new Error("failed!");
        });
        test('textColor property', function(){
            if (!('textColor' in GameOverScreen))
                throw new Error("failed!");
        });
        test('show function', function(){
            if (!('show' in GameOverScreen))
                throw new Error("failed!");
        });
    });

    suite('GameOverException', function(){
        test('value property', function(){
            if (!('value' in new GameOverException(null)))
                throw new Error("failed!");
        });
        test('message property', function(){
            if (!('message' in new GameOverException(null)))
                throw new Error("failed!");
        });
        test('message property2', function(){
            var subject = new GameOverException(null).message;
            if ("game over dude!" !== subject)
                throw new Error("failed!");
        });
        test('toString function', function(){
            if (!('toString' in new GameOverException(null)))
                throw new Error("failed!");
        });
    });

    suite('Screen', function(){
        test('show function', function(){
            if (!('show' in Screen))
                throw new Error("failed!");
        });
    });
});
