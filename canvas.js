// create canvas element
let canvas = document.getElementsByTagName('canvas')[0];
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 1;
canvas.height = window.innerHeight - 1;

// initial values
const numberOfBalls = 500;
let gravity = 0.005;
let friction = 0.98;
let floorCount = 0;
let maxRadius = 20;

let colorArray = [
    '#fa3',
    '#5fb',
    '#f22',
    '#37f',
    '#ff2',
    '#f7d',
    '#bbb',
    '#5f5',
];

// event listeners
window.addEventListener("resize", function () {
    location.reload();
});

window.addEventListener('click', function () {
    location.reload();
});

// utility function
function randomIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// construction function (you can use class instead)
function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    // draw items
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };

    // move items
    this.update = function () {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
            floorCount++;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius > canvas.width || this.x - radius < 0) {
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;

        // increase radius
        if (this.radius < maxRadius && floorCount > 498) {
            this.radius = this.radius * 1.005;
        }

        // change colors
        if (floorCount === numberOfBalls - 1) {
            this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
            canvas.style.background = 'black';
        }

        // last gothic effect
        if (floorCount > 2 * numberOfBalls - 3) {
            this.color = 'black';
            canvas.style.background = 'white';
            maxRadius = 30;

            if (this.y - this.radius + this.dy < 0) {
                this.dy = -this.dy;
                friction = 1;
                gravity = 0;
            }

            if (this.y - this.radius + this.dy < -1) {
                this.y = this.radius + 1;
            }
        }

        this.draw();
    };
}

// declare values of the Ball object
let ballArray, x, y, dx, radius;

function init() {
    ballArray = [];
    for (let i = 0; i < numberOfBalls; i++) {
        x = randomIntRange(radius, canvas.width - radius);
        y = randomIntRange(0, canvas.height - radius);
        dx = randomIntRange(-2, 2);
        radius = randomIntRange(1, 3);

        // push each item to the array to animate them later
        ballArray.push(new Ball(x, y, dx, 2, radius, 'white'))
    }
}

// loop for animation
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}

init();
animate();