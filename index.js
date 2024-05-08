//Game constansts
let inputDir = {x:0, y:0};
const foodSound = new Audio('music/food.mp3');
const gameOver = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
let prevScore = 0;
let score = 0;
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 12, y: 12}


//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if you bump into yourself
    for(let i = 1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x > 18 || snake[0].x <0 || snake[0].y > 18 || snake[0].y <0){
        return true;
    }
    return false;
}
function gameEngine(){
    //Part 1: Updating the snake and food
    if(isCollide(snakeArr)){
        gameOver.play();
        inputDir = {x: 0, y: 0};
        alert("GAME OVER! PRESS ANY KEY TO PLAY AGAIN.")
        snakeArr = [{x: 13, y: 15}];
        score = 0;
        prevScore = 0;
        speed = 10;
        score1.innerHTML = "Score: 0";
    }

    //if you've eaten the food, increment the score and regenerate the food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play()
        score += 1;
        if((score - prevScore)===3){
            speed += 5;
            prevScore += 3;
        }  
        score1.innerHTML = "Score: "+score;
        if(score > hival){
            hival = score;
            localStorage.setItem("hiscore", JSON.stringify(hival));
            hiscore1.innerHTML = "High Score: "+hival;
        }
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a)* Math.random()), y: Math.round(a + (b - a)* Math.random())}
    }

    //moving the snake
    for(let i = snakeArr.length-2; i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part 2: Display the snake and food 
    //snake part
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //food part
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}



//Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hival = 0;
    localStorage.setItem("hiscore", JSON.stringify(hival));
}else{
    hival = JSON.parse(hiscore);
    hiscore1.innerHTML = "High Score: "+hival;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x: 0, y: 1} // start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
        break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
        break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
        break;
    }
});