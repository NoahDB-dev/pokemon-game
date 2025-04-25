class Boundary {
    static width = 32;
    static height = 32;

    constructor({position}) {
        this.position = position;
        this.width = 32;
        this.height = 32;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Sprite {
    constructor({position, velocity, image, frames = {xMax: 1, yMax: 1}, sizeAdjust = {width: 0, height: 0}, scale = {scaleX: 1, scaleY: 1}, animate = false}) {
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, y: 0};
        this.sizeAdjust = sizeAdjust;
        this.scale = scale;
        this.animate = animate;

        this.frameElapsed = 0;
        this.frameHold = 50;
    
        this.image.onload = () => {
            this.width = (this.image.width - this.sizeAdjust.width/2) / this.frames.xMax * this.scale.scaleX;
            this.height = (this.image.height - this.sizeAdjust.height/2) / this.frames.yMax * this.scale.scaleY;
        }
    }  

    draw() {

        if (!this.animate) this.frames.val = 0;
        
        ctx.drawImage(
            this.image,
            this.frames.val * (this.image.width / this.frames.xMax),
            this.frames.y * (this.image.height / this.frames.yMax),
            this.image.width / this.frames.xMax,
            this.image.height / this.frames.yMax,
            this.position.x,
            this.position.y,
            (this.image.width / this.frames.xMax) * this.scale.scaleX,
            (this.image.height / this.frames.yMax) * this.scale.scaleY
        );
    
        this.frameElapsed++;
        if (this.frameElapsed % this.frameHold === 0 && this.animate) {
            if (this.frames.val < this.frames.xMax - 1) {
                this.frames.val++;
            } else {
                this.frames.val = 0;
            }
        }
    }
}
