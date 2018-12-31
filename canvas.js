const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 500
canvas.height = 800

//Variables

//kb events
let leftPressed = false
let rightPressed = false
//ball
let moveSpeed = 5
let balls = []
const colors = ['#2185C5', '#7ECEFD', '#FF7F66']
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



//Functions
function collision(balls) {
    if (block.y + block.height < basket.y) { 
        return; 
    } else if (block.x >= basket.x && block.x + block.width <= basket.x + basket.width) { 
    } else { 
    
    } 
}

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
    this.points = points

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
    for (i = 0; i < 40; i++) {
        let x = Math.random() * canvas.width
        let y = Math.random() * canvas.height
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
    score = new Score(x, y, 'Score: ' + points)
}

// Animate
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    for (i = 0; i < balls.length; i++) {
        balls[i].update()
    }

    player.update()

    if (collision(balls, player) == true) {
        points++
    }

    score.update() 

    
}

init()
animate()