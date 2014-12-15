/*
Name: y2rayk Snake
Version: 1.0
Author: y2rayk
Publisher:
*/
define(function (require) {
    var Game = require('game');
    var element = document.getElementById("grid_size");
    element.onclick = function() {
        console.log("Changing grid size");
        var element = document.getElementById("canvas");
	element.width = element.width *2;
	element.height = element.height *2;
	// TODO: Should wrap the following lines into a fn
	Game.width = Game.canvas.width;
        Game.height = Game.canvas.height;
	Game.MIN_X = 0;
	Game.MIN_Y = 0;
	Game.MAX_X = (Game.canvas.width / Game.LENGTH_CELL) - 1;
	Game.MAX_Y = (Game.canvas.height / Game.LENGTH_CELL) - 1;
        Game.restartGame();
    };
	
    /***************************
    * Run Game
    ***************************/
    Game.setup();
});
