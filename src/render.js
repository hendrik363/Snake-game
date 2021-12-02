const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakeParts{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 30;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

function drawGame(){
    changeSnakePosition();

    let result = isGameOver();
    if(result)
        return;

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    if(score > 10) {
        speed = 9; 
    }

    if(score > 25) {
        speed = 11;
    }

    if(score > 50) {
        speed = 13;
    }

    if(score > 100) {
        speed = 15;
    }

    setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }

    //walls
    if(headX < 0 || headY < 0 || headY === tileCount -3 || headX === tileCount -3) {
        gameOver = true;
    }

    //body
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if(gameOver) {
        ctx.fillStyle = 'black';
        ctx.font ='100px verdana';
        ctx.fillText('Game over!', canvas.width / 7.5, canvas.height / 2);
    }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = 'black';
    ctx.font = '20px verdana';
    ctx.fillText('score ' + score, canvas.width- 100, 20);
}

function clearScreen(){
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(){

    ctx.fillStyle = 'orange';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakeParts(headX, headY));
    if(snakeParts.length >  tailLength)
        snakeParts.shift();

    ctx.fillStyle = 'blue';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if(appleX === headX && appleY === headY){
        appleX = Math.floor(Math.random() * (tileCount -3));
        appleY = Math.floor(Math.random() * (tileCount - 3));
        tailLength++;
        score++;
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(e){
    //up
    if(e.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //down
    if(e.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if(e.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }

    //right
    if(e.keyCode == 39){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();