'use strict'


// BOARD
const blockSize = 15
const rows = 35
const cols = 75
let board, context

// SNAKE
let snakeX = blockSize * 5
let snakeY = blockSize * 5

let velocitX = 0, velocitY = 0

let snakeBody = []

// FOOD
let foodX, foodY

let gameOver = false

window.onload = ()=>{
    board = document.querySelector('.board')
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext('2d') // use for drowing on the board

    placeFood()
    document.addEventListener('keyup', changeDirection)
    setInterval(update, 100)
}

const GameOver = ()=>{
    gameOverP.classList.remove('hidden')
    gameOver = true

}

const update = ()=>{
    if(gameOver){
        return
    }
    context.fillStyle = '#1b2d4d'
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle = '#F8F8F8'
    context.fillRect(foodX, foodY ,blockSize, blockSize)

    if(snakeX === foodX && snakeY === foodY){
        snakeBody.push([foodX, foodY])
        placeFood()
    }

    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1]
    }
    if(snakeBody.length)
        snakeBody[0] = [snakeX, snakeY] 

    context.fillStyle = '#F037A5'
    snakeX += velocitX * blockSize
    snakeY += velocitY * blockSize
    context.fillRect(snakeX, snakeY ,blockSize, blockSize)
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }
    // GAME OVER
    const gameOverP = document.querySelector('.game-over')

    if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        // GameOver()
        gameOverP.classList.remove('hidden')
        gameOver = true
    }
    snakeBody.forEach(el=>{
        if(snakeX === el[0] && snakeY === el[1]){
        //    GameOver() 
        gameOverP.classList.remove('hidden')
        gameOver = true
        }
    })
}

const changeDirection = e=>{
    if(e.code === 'ArrowUp' && velocitY != 1){
        velocitX = 0
        velocitY = -1
    }else if(e.code === 'ArrowDown' && velocitY != -1){
        velocitX = 0
        velocitY = 1
    }else if(e.code === 'ArrowLeft' && velocitX != 1){
        velocitX = -1
        velocitY = 0
    }else if(e.code === 'ArrowRight' && velocitX != -1){
        velocitX = 1
        velocitY = 0
    }
    const restBtn = document.querySelector('.rest-btn')
    const gameOverP = document.querySelector('.game-over')

    restBtn.addEventListener('click', ()=>{
        gameOverP.classList.add('hidden')
        velocitX = 0
        velocitY = 0
        snakeX = blockSize * 5
        snakeY = blockSize * 5
        snakeBody = []
        gameOver = false
        placeFood()
    })
}

const placeFood = ()=>{
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}
