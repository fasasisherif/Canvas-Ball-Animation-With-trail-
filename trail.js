let canvas = document.querySelector('canvas')
let innerWidth = window.innerWidth
let innerHeight = window.innerHeight

canvas.width = innerWidth
canvas.height = innerHeight
let c = canvas.getContext('2d')

window.addEventListener('resize', function () {
    canvas.width = innerWidth
    canvas.height = innerHeight
})

function randomColour() {
    let hex = '0123456789ABCDEF'
    let hexCode = '#'

    for (let i = 0; i < 6; i++) {
        hexCode = hexCode + hex[Math.floor(Math.random() * hex.length)]
    }

    return hexCode
}




function allBalls (radius, x, y, opacity, shadowLength, dx, dy) {
    this.radius = radius
    this.x = x
    this.y = y
    this.opacity = opacity
    this.shadowLength = shadowLength
    this.randomRgba_1 = randomColour()
    this.randomRgba_2 = randomColour()    
    this.dx = dx
    this.dy = dy


    this.draw = function () {
        let presentPosition_x = x
        let presentPosition_y = y
        let presentRadius = radius
        
        for (let i = 0; i < shadowLength; i++) {
            c.globalCompositeOperation = 'destination-over'
            c.beginPath()
            c.arc(x, y, radius, 0, Math.PI * 2, false)
            if (i == 0) {
                c.fillStyle = this.randomRgba_1
            } else {
                c.fillStyle = this.randomRgba_2
            }
            c.fill()
            c.strokeStyle = 'transparent'
            c.stroke()
        
            x -= dx
            y -= dy
            
            opacity -= opacity / shadowLength
            radius -= radius / shadowLength
        }

        x = presentPosition_x 
        y = presentPosition_y
        radius = presentRadius
        x += dx
        y += dy
        opacity = .4

    }

    this.update = function () {
        if (x > innerWidth - radius || x < 0 + radius) {
            dx = -dx
        }
        if (y > innerHeight - radius || y < 0 + radius) {
            dy = -dy
        }
    }
}



allBallsArray = []
for (let i = 0; i < 50; i++) {
    let radius = Math.random() * 10 + 3
    let x = Math.random() * (innerWidth - 2 * radius) + radius
    let y = Math.random() * (innerHeight - 2 * radius) + radius
    let opacity = .4
    let shadowLength = Math.random() * 8
    let dx = (Math.random() - 0.5) * 25
    let dy = (Math.random() - 0.5) * 25

    ball = new allBalls(radius, x, y, opacity, shadowLength, dx, dy)
    allBallsArray.push(ball)
} 




function animate () {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < allBallsArray.length; i++) {
        allBallsArray[i].draw()
        allBallsArray[i].update()
    }
}
animate()























































































































