define(['drawingentity'], function (DrawingEntity) {
    return _.extend({}, DrawingEntity, {
	highest_score: 0,

        init: function() {
            this.score = 0;
	    this.restore_highscore();
        },

        restore_highscore: function() {
            if (typeof(localStorage) == 'undefined' ) {
                console.log('Your browser does not support HTML5 localStorage. Try upgrading.');
            } else {
		var temp = localStorage.getItem("highscore");
		if (temp == null) {
		   this.highest_score = 0;
		} else {
		   this.highest_score = temp;
		}
            }
        },

        save_highscore: function(score) {
	    if (typeof(localStorage) == 'undefined' ) {
                console.log('Your browser does not support HTML5 localStorage. Try upgrading.');
            } else {
                try {
                    localStorage.setItem("highscore", score); //saves to the database, “key”, “value”
		    console.log("SET LOCALSTOR");
                } catch (e) {
		    console.log("CAUGHT EXCEPTION!");
                    if (e == QUOTA_EXCEEDED_ERR) {
                        alert("Quota exceeded!"); //data wasn’t successfully saved due to quota exceed so throw an error
                    }
                }
            }
        },

        increment_score: function(score) {
	    this.score = this.score + score; // Add a point to score
	    if (this.score > this.highest_score) { // Update high school
                this.highest_score = this.score;
		this.save_highscore(this.highest_score);
	    }
        },

    draw: function(ctx, width, height) {
            ctx.font = '12px helvetica, arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.fillText('Score: ' + this.score, 5, height - 5);
            ctx.textAlign = 'right';
            ctx.fillText('Highest Score: ' + this.highest_score, width - 5, height - 5);
        }
    });
});
