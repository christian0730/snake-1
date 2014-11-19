 // Abstract Class
define({
    // STUBS to filled by inheritance
    text: "",
    textSub: "",
    textColor: "",
    show: function(ctx,width,height) {
            // Background
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, width, height);

            // Main text
            ctx.fillStyle = this.textColor;
            ctx.textAlign = 'center';
            ctx.font = '40px helvetica, arial';
            ctx.fillText(this.text, width / 2, height / 2);

            // Sub text
            ctx.fillStyle = '#999999';
            ctx.font = '20px helvetica, arial';
            ctx.fillText(this.textSub, width / 2, height / 2 + 30);
    }
});
