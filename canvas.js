const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 500
canvas.height = 800

//Variables

//keyboard events
let leftPressed = false
let rightPressed = false
//ball
let moveSpeed = 5
let balls = []
//player
let player
let pWidth = 60
let pHeight = 20
let color = 'black'
//score
let score
let x = canvas.width/1.5
let y = 30
let points = 0

//Event listeners

//move
document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

//stop
document.addEventListener("keyup", keyUpHandler, false);

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

//Objects
function Ball(x, y, dy, radius, color) {
    this.x = x
    this.y = y
    this.dy = dy
    this.radius = radius
    this.color = color
    
    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = 'black'
        c.stroke()
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }
    
    this.update = function() {
        this.y += dy
        this.draw()
    }

}

function Player(x, y, pWidth, pHeight, color) {
    this.x = x
    this.y = y
    this.pWidth = pWidth
    this.pHeight = pHeight
    this.color = color

    this.draw = function() {
        c.fillStyle = this.color
        c.fillRect(this.x, this.y, this.pWidth, this.pHeight)
        
    }

    this.update = function() {
        //move player

        if (leftPressed && this.x > 0) {
            this.x -= moveSpeed
        } else if (rightPressed && this.x < canvas.width - pWidth) {
            this.x += moveSpeed
        }

        this.draw()
    }
}

function Score(x, y, points) {
    this.x = x
    this.y = y
    this.points = 0

    this.draw = function() {
        c.font = '30px Helvetica'
        c.fillStyle = '#000'
        c.fillText(points, this.x, this.y)
    }

    this.update = function() {
        this.draw()
    }
}


// Initialize
function init() {
    //Initialize balls
    for (i = 0; i < 10; i++) {
        let x = Math.random() * canvas.width
        let y = Math.random() * canvas.height - canvas.height
        let dy = 3
        let radius = 15
        let color = 'purple'

        balls.push(new Ball(x, y, dy, radius, color))
    }

    //Initialize player
    player = new Player((canvas.width/2) - (pWidth/2), 
                        canvas.height - pHeight, 
                        pWidth, 
                        pHeight, 
                        color)

    //Initialize score
    points = 0
    score = new Score(x, y, 'Score: ' + points)
}

// Animate
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < balls.length; i++) {
      balls[i].update();
      if (detectHit(balls[i], player)) {
        balls.splice([i], 1)
        points++
        score = new Score(x, y, 'Score: ' + points)
      }
    }
    
    player.update();
    score.update(); 

  }
  
  function detectHit(ball, player) {
    const ballRadius = ball.radius;
    const ballCenter = {x: ball.x, y: ball.y};
    
    const playerRadius = Math.min(player.pWidth, player.pHeight);
    const playerCenter = {
      x: player.x + player.pWidth / 2,
      y: player.y + player.pHeight / 2
    };
    
    // distance = sqr((x1 - x2)^2 + (y1 - y2)^2)
    const distanceSqrd = (ballCenter.x - playerCenter.x) ** 2 + (ballCenter.y - playerCenter.y) ** 2;
    const radiusDistanceSqrd = (ballRadius + playerRadius) ** 2;
    
    /*
      Instead of getting the square root, save a complex 
      calculation by comparing the squared distances directly
    */
    return distanceSqrd <= radiusDistanceSqrd;
  }

init()
animate()