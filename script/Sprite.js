
class Sprite {
    constructor (w, h, srcs, canvas, ctx, options = {animated: null}) {
        this.w = w;
        this.h = h;
        this.srcs = srcs;
        this.img = new Image();
        this.img.src = this.srcs[0];

        this._activeFrame = 0;
        this.frameCount = this.srcs.length;

        this.canvas = canvas;
        this.ctx = ctx;

        this.animated = options.animated;
    }

    get activeFrame () {
        return this._activeFrame;
    }
    set activeFrame (f) {
        this._activeFrame = f%this.frameCount;
        this.img.src = this.srcs[Math.floor(this.activeFrame)];
    }

    draw (x = 0, y = 0, w = this.width, h = this.height) {
        this.ctx.drawImage(this.img, 0, 0, this.w, this.h, x, y, w, h);
        this.animated && (this.activeFrame+=this.animated);
    }
}