//Gathering the canvas and the context of the canvas from the html file
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//Setting the dimensions of the canvas
canvas.width = 1050;
canvas.height = 700;

//Creating the array that will store the collisions data
const collisionsMap = [];

//Getting the values from the collissions array (Stored in collisions.js) and adding them to the collisions map array
for(let i = 0; i < collisions.length; i += 60) {
    collisionsMap.push(collisions.slice(i, i + 60));
}

//Creating the offset needed to center the background in the correct position.
const offset = {
    x: -203,
    y: -2120
}

//Creating the array that will store the boundary objects based off the information in the collisions array
const boundaries = [];

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 29764)
            boundaries.push(new Boundary({ position: {x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y}, symbol}));
    })
})

//Creating the background image (AKA the town background)
const image = new Image();
image.src = './images/map/starterTown.png';

//Creating the player image (AKA the character)
const playerImage = new Image();
playerImage.src = './images/character/characterSprites.png';

//Creating the foreground image (AKA the things that should always be rendered on top)
const foregroundImage = new Image();
foregroundImage.src = './images/map/Foreground.png';

//Creating the player object that will store information about the player (The class is Sprite)
const player = new Sprite({
    position: {
        x: (canvas.width/2) - (347) / 2 + 110, 
        y: (canvas.height/2) - (347/2)}, 
    image: playerImage, 
    frames: {xMax: 4, yMax: 4},
    sizeAdjust: {width: 173, height: 101},
    scale: {scaleX: 1.25, scaleY: 1.25}
});

//Changes the movement speed of the player (technically changes the speed that the background moves)
const velocity = 2;

//Creating the background object that will store information about the background (The class is Sprite)
const background = new Sprite({ 
    position: {
        x: offset.x, 
        y: offset.y}, 
    image: image
})

//Creating the foreground object that will store information about the foreground (The class is Sprite)
const foreground = new Sprite({ 
    position: {
        x: offset.x, 
        y: offset.y}, 
    image: foregroundImage
})

//Creating the keys object which will store which keys are being pressed as true or false values
const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
}

//Creating an array that will store all the objects that move
const movables = [background, ...boundaries, foreground];

//Creating a function that checks if two rectangles with x and y values are colliding. (This really only works for the player since it is using arbitrary values for the calculation)
function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x + 30 <= (rectangle2.position.x) + rectangle2.width&&
        rectangle1.position.y  + 60 <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height + 13 >= rectangle2.position.y
    )
}

//Creating the function that will actually draw the game on the canvas
function animate() {
    //By calling this we create an infinite loop while still only having to call the animate function once
    window.requestAnimationFrame(animate);

    //Drawing the objects on the screen in the order that they should be drawn (background -> player -> foreground)
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    });
    player.draw();
    foreground.draw();
   
    //Defining the "moving" variable and setting the default value to true
    let moving = true;

    //Setting the actions that should happen if W is pressed and is the most recent key to be pressed
    if (keys.w.pressed && lastKey === 'w') {
        //Telling the sprite's draw function that this sprite has an animation as well as where it is in the y direction
        player.frames.y = 3;
        player.animate = true;
       
        //Checking the collisions of the player and boundaries
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x, y: boundary.position.y + 2}}})) {
                moving = false;
                console.log("colliding");
                break;
            }
        }

        //If the player isn't colliding with anything then setting the position of all movables to be adjusted by the velocity
        if (moving) {
            movables.forEach(movable => {
                movable.position.y += velocity;
            })
        }
    }

    //Setting the actions that should happen if A is pressed and is the most recent key to be pressed
    else if (keys.a.pressed && lastKey === 'a') {

        //Telling the sprite's draw function that this sprite has an animation as well as where it is in the y direction
        player.frames.y = 1;
        player.animate = true;
        
        //Checking the collisions of the player and boundaries
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x + 2, y: boundary.position.y}}})) {
                moving = false;
                console.log("colliding");
                break;
            }
        }

        //If the player isn't colliding with anything then setting the position of all movables to be adjusted by the velocity
        if (moving) {
        movables.forEach(movable => {
            movable.position.x += velocity;
        })
        }
    }

    //Setting the actions that should happen if S is pressed and is the most recent key to be pressed
    else if (keys.s.pressed && lastKey === 's') {

        //Telling the sprite's draw function that this sprite has an animation as well as where it is in the y direction
        player.frames.y = 0;
        player.animate = true;

        //Checking the collisions of the player and boundaries
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x, y: boundary.position.y - 2}}})) {
                moving = false;
                console.log("colliding");
                break;
            }
        }

        //If the player isn't colliding with anything then setting the position of all movables to be adjusted by the velocity
        if (moving) {
            movables.forEach(movable => {
                movable.position.y -= velocity;
            })
        }
    }

    //Setting the actions that should happen if D is pressed and is the most recent key to be pressed
    else if (keys.d.pressed && lastKey === 'd') {
        
        //Telling the sprite's draw function that this sprite has an animation as well as where it is in the y direction
        player.frames.y = 2;
        player.animate = true; 

        //Checking the collisions of the player and boundaries
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x - 2, y: boundary.position.y}}})) {
                moving = false;
                console.log("colliding");
                break;
            }
        }

        //If the player isn't colliding with anything then setting the position of all movables to be adjusted by the velocity
        if (moving) {
            movables.forEach(movable => {
                movable.position.x -= velocity;
            })
        }
    }
    
}

//Calling the animate function to start the animation loop
animate();

//Creating the lastKey variable and setting the default value to be empty
let lastKey = '';

//Creating an event listener that listens for key presses. 
//e stands for event
window.addEventListener('keydown', (e) => {
    
    //Checking which key is pressed and executing the code for that key
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            player.frames.y = 3; // up
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            player.frames.y = 1; // left
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            player.frames.y = 0; // down
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            player.frames.y = 2; // right
            break;
    }
});

//Creating an event listener that listens for when a key is released
//e stands for event
window.addEventListener('keyup', (e) => {

    //Checking which key was released and executing the code for that key
    switch (e.key) {
        case 'w':
            player.animate = false;
            keys.w.pressed = false;
            break
        case 'a':
            player.animate = false;
            keys.a.pressed = false;
            break
        case 's':
            player.animate = false;
            keys.s.pressed = false;
            break
        case 'd':
            player.animate = false;
            keys.d.pressed = false;
            break
    }
})


