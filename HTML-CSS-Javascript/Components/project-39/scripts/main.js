'use strict';

window.addEventListener('load', function () {

    const c = document.getElementById('canvas').getContext('2d');
    const balls = [];
    const ballsQuantity = 50;

    let width, height, mousePosX, mousePosY;
    let minRadius = 10, maxRadius = 30;


    function Ball(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.minRadius = radius;
        this.maxRadius = radius + 25;
        this.speed = getRandInt(1, 8);
        this.direction = Math.random() * Math.PI * 2;
        this.color = getRandomColor();

        this.checkBallTouch = function () {
            let dx = mousePosX - this.x;
            let dy = mousePosY - this.y;

            return (dx * dx + dy * dy <= this.radius * this.radius);
        }

        this.updatePosition = function () {
            this.x += Math.cos(this.direction) * this.speed;
            this.y += Math.sin(this.direction) * this.speed;

            if (this.x - this.radius < 0) {
                this.x = radius;

                this.direction = Math.atan2(Math.sin(this.direction),
                    Math.cos(this.direction) * -1);
            }
            else if (this.x + this.radius > width) {
                this.x = width - radius;

                this.direction = Math.atan2(Math.sin(this.direction),
                    Math.cos(this.direction) * -1);
            }

            if (this.y - this.radius < 0) {
                this.y = radius;

                this.direction = Math.atan2(Math.sin(this.direction) * -1,
                    Math.cos(this.direction));
            }
            else if (this.y + this.radius > height) {
                this.y = height - radius;

                this.direction = Math.atan2(Math.sin(this.direction) * -1,
                    Math.cos(this.direction));
            }
        };
    }

    function animate() {
        window.requestAnimationFrame(animate);

        c.clearRect(0, 0, width, height);

        for (let ball of balls) {
            if (ball.checkBallTouch()) {
                if (ball.radius < ball.maxRadius)
                    ball.radius += 5;
            } else {
                if (ball.radius > ball.minRadius)
                    ball.radius -= 5;
            }

            c.beginPath();
            c.fillStyle = ball.color;
            c.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            c.fill();

            ball.updatePosition();
        }
    }

    function generateBalls(x, y) {
        for (let i = 0; i < ballsQuantity; i++) {
            balls.push(new Ball(x, y, getRandInt(minRadius, maxRadius)));
        }
    }

    function getRandInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomColor() {
        return `rgba(${getRandInt(0, 255)}, 
		    ${getRandInt(0, 255)}, 
		    ${getRandInt(0, 255)}, 
            ${((Math.random() * 5) + 5) / 10})`;
    }

    function setCanvasWidth() {
        width = window.innerWidth;
        height = window.innerHeight;

        c.canvas.width = width;
        c.canvas.height = height;
    }


    c.canvas.addEventListener('click', function explodeBalls(event) {
        generateBalls(event.clientX, event.clientY);
        animate();

        setInterval(function () {
            let randRadius = getRandInt(minRadius, maxRadius);
            
            balls.shift();
            balls.push(
                new Ball(
                    getRandInt(randRadius, width - randRadius), 
                    getRandInt(randRadius, height - randRadius), 
                    randRadius));
        }, 500);

        c.canvas.removeEventListener('click', explodeBalls);
    });

    c.canvas.addEventListener('mousemove', function(event) {
        mousePosX = event.clientX;
        mousePosY = event.clientY;
    });

    window.addEventListener('resize', function () {
        setCanvasWidth();
        console.log(width);
        console.log(height);
    });

    setCanvasWidth();
});