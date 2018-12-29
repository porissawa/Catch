const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 500
canvas.height = 800

const move = {
    left: undefined,
    right: undefined
}

const moveSpeed = 5

//Event listeners
//move
window.addEventListener('keydown', function(e) {
    move.left = e.keyCode
    move.right = e.keyCode
})

//stop
window.addEventListener('keyup', function(e) {
    move.stop = e.keyCode
})

const colors = ['#2185C5', '#7ECEFD', '#FF7F66']

function Ball(x, y, radius, color) {
    this.x = x
    this.y = y
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
        if (move.left == 37) {
            this.x -= moveSpeed
        } else if (move.right == 39) {
            this.x += moveSpeed
        } 

        this.draw()
    }
}

// Initialize
let balls = []
let player

function init() {
    balls = []
    let pWidth = 60
    let pHeight = 20
    let color = 'black'

    //Initialize balls
    for (i = 0; i < 40; i++) {
        let x = Math.random() * canvas.width
        let y = Math.random() * canvas.height
        let radius = 15
        let color = 'purple'

        balls.push(new Ball(x, y, radius, color))
    }

    //Initialize player
    player = new Player((canvas.width/2) - (pWidth/2), canvas.height - pHeight, pWidth, pHeight, color)
}

// Animate
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    for (i = 0; i < balls.length; i++) {
        balls[i].update()
    }

    player.update()
}

init()
animate()