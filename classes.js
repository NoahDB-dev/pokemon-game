//Creating the BattleArea class
class BattleArea {
    
    //Setting the values for width and height. Since these will never change they are static
    static width = 32;
    static height = 32;

    //Creating the constructor for the boundary class
    constructor({position}) {
        this.position = position;
        this.width = 32
        this.height = 32;
    }

    //Setting the draw function. This is technically uneccesary, however, it makes it easier to trouble shoot.
    draw() {
        ctx.fillStyle = 'rgba(255,0,0,0.5)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}


//Creating the boundary class
class Boundary {

    //Setting the values for width and height. Since these will never change they are static
    static width = 32;
    static height = 32;
    
    //Creating the constructor for the boundary class
    constructor({position}) {
        this.position = position;
        this.width = 32;
        this.height = 32;
    }

    //Setting the draw function. This is technically uneccesary, however, it makes it easier to trouble shoot.
    draw() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

//Creating the Sprite class
class Sprite {

    //Creating the constructor for the Sprite class. It takes 7 objects as input, however, some have default values so they don't need to be specified
    constructor({position, velocity, image, frames = {xMax: 1, yMax: 1}, sizeAdjust = {width: 0, height: 0}, scale = {scaleX: 1, scaleY: 1}, animate = false}) {
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, y: 0};
        this.sizeAdjust = sizeAdjust;
        this.scale = scale;
        this.animate = animate;

        this.frameElapsed = 0;
        this.frameHold = 10;
    
        this.image.onload = () => {
            this.width = (this.image.width - this.sizeAdjust.width/2) / this.frames.xMax * this.scale.scaleX;
            this.height = (this.image.height - this.sizeAdjust.height/2) / this.frames.yMax * this.scale.scaleY;
        }
    }  

    //Creating the draw function for all the sprites
    draw() {

        //Checking if the Sprite has an animation
        if (!this.animate) this.frames.val = 0;
        
        //Actually drawing the image on the canvas
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
    
        //Incrementing the frame counter
        this.frameElapsed++;

        //If the frameElapsed has reached a threshold of frameHold and the sprite has an animation, then change the animation frame
        if (this.frameElapsed % this.frameHold === 0 && this.animate) {
            if (this.frames.val < this.frames.xMax - 1) {
                this.frames.val++;
            } else {
                this.frames.val = 0;
            }
        }
    }
}
