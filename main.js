const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const $sprite = document.querySelector('#sprite')
const $bricks = document.querySelector('#bricks')

canvas.width = 448
canvas.height = 400

// Variables de nuestro juego
let counter = 0

// Variables de la pelota
// Tamaño de la pelota
const ballRadius = 3;
// Posicion inicial de la pelota
let x = canvas.width / 2
let y = canvas.height -30
// Velocidad de la pelota
let dx = -2
let dy = -2

// Ancho y alto de la paleta
const paddleHeight = 10;
const paddleWidth = 50;

// Posicion inicial de la paleta
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

let rightPressed = false;
let leftPressed = false;

function  drawBall(){
    ctx.beginPath()
    ctx.arc(x,y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.closePath()
}

function drawPaddle(){
ctx.drawImage($sprite, 29, 174, paddleWidth, paddleHeight, paddleX, paddleY, paddleWidth, paddleHeight)
}

function drawBricks(){

}

function colisionDetection(){

}

function ballMovement(){
    // Rebotar la pelota
    // Si rebota en los laterales
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx
    }
    // Si rebota arriba
    if(y + dy < ballRadius){
        dy = -dy
    }

    const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWidth;
    const isBallTouchingPaddle = y + dy > paddleY
    
    if(isBallTouchingPaddle && isBallSameXAsPaddle){
        dy = -dy
        // Game over y se reinicia
    }else if(y + dy > canvas.height - ballRadius){
        document.location.reload()
    }
    x += dx
    y += dy
}

function paddleMovement(){
   if(rightPressed && paddleX < canvas.width - paddleWidth){
    paddleX += 7
   }else if(leftPressed && paddleX > 0){
    paddleX -= 7
   }
}

function cleanCanvas(){
 ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function initEvents(){
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyupHandler)

    function keyDownHandler(event){
        const {key} = event
        if(key === 'Right' || key === 'ArrowRight'){
            rightPressed = true
        }else if(key === 'Left' || key === 'ArrowLeft'){
            leftPressed = true
        }
    }

    function keyupHandler(event){
        const {key} = event
        if(key === 'Right' || key === 'ArrowRight'){
            rightPressed = false
        }else if(key === 'Left' || key === 'ArrowLeft'){
            leftPressed = false
        }
    }
}

function draw(){
    // Limpiar lo dibujado
    cleanCanvas()
    // Hay que dibujar los elementos
    drawBall()
    drawPaddle()
    drawBricks()

    // Colisiones y movimientos
    colisionDetection()
    ballMovement()
    paddleMovement()

    // Refresca la pantalla
    window.requestAnimationFrame(draw)
}

draw()
initEvents()