snake
=====

my html5 snake game

Build a "Snake" Game

Goal:
Build an interactive Snake clone in JavaScript. If you have never played Snake, you can read about it here: http://en.wikipedia.org/wiki/Snake_(video_game)

Musts:
* Use JavaScript
* Run on latest versions of Chrome, Safari, and FireFox
* Use Canvas 2D
* Use requestAnimationFrame
* Support different screen pixel ratios (densities)
* Use arrow keys to change direction of the Snake
* Increase the length of the Snake by one block for each block it "eats"
* Increase the speed of the Snake by a small percentage for each block it "eats"
* When the snake "eats" a block, randomly place a new block on the board that is a certain distance from the snake's current position and the walls.
* End the game if the Snake "bites its own tail" or runs into a wall

Shoulds:
* Use underscore
* Keep score
* Pause the game with SPACE key
* Reset the game by clicking on the Canvas
* Design the game using JavaScript objects and inheritance (use _.extend)

Coulds:
* Use jquery for DOM manipulation and event binding (though not really needed for this exercise)
* Use requirejs for dependency injection
* Deploy the game to Heroku using Node.js
* Save highscores in browser localstorage
* Provide different difficulty levels
* Provide different board sizes
* Support the fullscreen API
* Write unit tests using Mocha

To run the tests. From the scripts directory:
```sh
mocha -u tdd test.js
```


* Surprise us with something cool


Sound Credits
http://soundbible.com/407-Biting-Apple.html
