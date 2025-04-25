const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1050;
canvas.height = 700;

const collisionsMap = [];

for(let i = 0; i < collisions.length; i += 60) {
    collisionsMap.push(collisions.slice(i, i + 60));
}

const offset = {
    x: -203,
    y: -2120
}

const boundaries = [];

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 29764)
            boundaries.push(new Boundary({ position: {x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y}, symbol}));
    })
})

const image = new Image();
image.src = './images/map/starterTown.png';

const playerImage = new Image();
playerImage.src = './images/character/characterSprites.png';

const foregroundImage = new Image();
foregroundImage.src = './images/map/Foreground.png';

const player = new Sprite({
    position: {
        x: (canvas.width/2) - (347) / 2 + 110, 
        y: (canvas.height/2) - (347/2)}, 
    image: playerImage, 
    frames: {xMax: 4, yMax: 4},
    sizeAdjust: {width: 173, height: 101},
    scale: {scaleX: 1.25, scaleY: 1.25}});

const background = new Sprite({ 
    position: {
        x: offset.x, 
        y: offset.y}, 
    image: image
})

const foreground = new Sprite({ 
    position: {
        x: offset.x, 
        y: offset.y}, 
    image: foregroundImage
})

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
}

const movables = [background, ...boundaries, foreground];

function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= (rectangle2.position.x) -21 + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y -63 + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function animate() {
    window.requestAnimationFrame(animate);

    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    });
    player.draw();
    foreground.draw();
   
    let moving = true;

    if (keys.w.pressed && lastKey === 'w') {
        player.frames.y = 3;
        player.animate = true;
       // player.frameElapsed = 0;
       
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x, y: boundary.position.y + 0.5}}})) {
                console.log('colliding')
                moving = false;
                break;
            }
        }
        if (moving) {
            movables.forEach(movable => {
                movable.position.y += 0.5;
            })
        }
    }
    else if (keys.a.pressed && lastKey === 'a') {
        player.frames.y = 1;
        player.animate = true;
        //player.frameElapsed = 0;
        
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x + 0.5, y: boundary.position.y}}})) {
                console.log('colliding')
                moving = false;
                break;
            }
        }
        if (moving) {
        movables.forEach(movable => {
            movable.position.x += 0.5;
        })
        }
    }
    else if (keys.s.pressed && lastKey === 's') {
        player.frames.y = 0;
        //player.frameElapsed = 0;
        player.animate = true;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x, y: boundary.position.y - 0.5}}})) {
                console.log('colliding')
                moving = false;
                break;
            }
        }
        if (moving) {
            movables.forEach(movable => {
                movable.position.y -= 0.5;
            })
        }
    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.frames.y = 2;
        //player.frameElapsed = 0;
        player.animate = true; 

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({rectangle1: player, rectangle2: {...boundary, position: {x: boundary.position.x - 0.5, y: boundary.position.y}}})) {
                console.log('colliding')
                moving = false;
                break;
            }
        }
        if (moving) {
            movables.forEach(movable => {
                movable.position.x -= 0.5;
            })
        }
    }
    
}
animate();

//the (e) stands for event
let lastKey = '';
window.addEventListener('keydown', (e) => {
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
window.addEventListener('keyup', (e) => {
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


