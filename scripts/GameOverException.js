define([], function() {
    return function GameOverException(value) {
        this.value = value;
        this.message = "game over dude!";
        this.toString = function() {
            return this.value + this.message
        };
    }
});
