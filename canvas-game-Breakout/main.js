let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//******
//let btnPlay = document.getElementById("play");
//******

//стартовая позиция мяча
let x = canvas.width / 2;
let y = canvas.height - 30;

//направление мяча
let dx = 2;
let dy = -2;

//переменная содержит радиус рисованного круга
let ballRadius = 10;

//переменные для создания "весла" - удар по мячу
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
//
let rightPressed = false;
let leftPressed = false;

//переменные для рисования кирпеча
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
//счет игры
let score = 0;
//количество жизней
let lives = 3;

//слушатели событий для клавиатуры
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//слушатели событий для мыши
document.addEventListener("mousemove", mouseMoveHandler, false);
//
let bricks = [];
for (let c = 0; c < brickColumnCount; c++ ){
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0, status: 1}; //status - для проверки на удаление кирпича при столкновении
    }
}
//- - - - - - - - - -

//управление веслом
//нажатие клавиши
function keyDownHandler(e){
    if (e.keyCode == 39){         // 39  стрелка вправо
        rightPressed = true;
    } else if (e.keyCode == 37){  // 37 стрелка влево
        leftPressed = true;
    }
}
//отпуск клавиши
function keyUpHandler(e){
    if (e.keyCode == 39){
        rightPressed = false;
    } else if (e.keyCode == 37){
        leftPressed = false;
    }
}
//
function mouseMoveHandler(e){
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth / 2;
    }
}
//- - - - - - - - - -
//
//рисуем кирпичи
function drawBricks(){
    for(let c = 0; c < brickColumnCount; c++){
        for(let r = 0; r < brickRowCount; r++){
          if(bricks[c][r].status == 1){
              //если статус = 1 отображаем кирпич
              let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
              let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
              bricks[c][r].x = brickX;
              bricks[c][r].y = brickY;
              ctx.beginPath();
              ctx.rect(brickX, brickY, brickWidth, brickHeight);
              ctx.fillStyle = "#0095DD";
              ctx.fill();
              ctx.closePath();
          }
        }
    }
}

//- - - - - - - - - -

//функция для отрисовки мяча
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//- - - - - - - - - -
//
//рисуем весло
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//******************************************************
//изменияем направление мяча при сталкновении
function changeDirection(){
    //отскок с лева и справа
    if ((x + dx) > (canvas.width - ballRadius) || (x + dx) < ballRadius) {
        dx = -dx;
    }
    //отскок сверху (отскок от границы мяча, а не от его центра)
    if ((y + dy) < ballRadius) {
        dy = -dy;
    } else if ((y + dy) > (canvas.height - ballRadius)){
        //проверяем, находится ли мячь в середине весла
        //если да, то мячь отскочит
       if(x > paddleX && x < paddleX + paddleWidth){
           if(y = y - paddleHeight){
               dy = -dy;
           }
       } else {
           lives--;
           if(!lives){
               //иначе конец игры
               alert("Game Over");
               document.location.reload();

           } else {
               //обновляем значения
               x = canvas.width / 2;
               y = canvas.height - 30;
               dx = 2;
               dy = -2;
               paddleX = (canvas.width - paddleWidth) / 2;
           }
       }
    }
}

//- - - - - - - - - -
function move(){
    //перемещенин весла при нажатии
    if(rightPressed && paddleX < canvas.width - paddleWidth){
        paddleX += 7;
    } else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }
}

//******************************
//
//функция обнаружения столкновения
function collisionDetection(){
    for(let c = 0; c < brickColumnCount; c++){
        for(let r = 0; r < brickRowCount; r++){
            //координаты кирпичей
            let b = bricks[c][r];
            if(b.status == 1){
                //проверка на совпадение координат мяча и кирпича
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    //меняем направление
                    dy = -dy;
                    //удаляем кирпич
                    b.status = 0;
                    //обновляем счет
                    score++;
                    //при удалении всех киричей надпись о выигрыше и перезапуск игры
                    if(score == brickRowCount * brickColumnCount){
                        alert("You win, congratulations!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}
//- - - - - - - - - -
//отображение счета
function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095dd";
    ctx.fillText("Score: " + score, 8, 20);
}

//отображенине жизней
function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095dd";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

//- - - - - - - - - -
//функция для перемещения мяча
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    changeDirection();
    move();
    //движение мяча
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

//- - - - - - - - - -

draw();
