

//**********Пишеим игру Змейка*****************************************
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

//делим поле на невидимую сетку по 10 x 10p
let blockSize = 10;
let widthInBlocks = width / blockSize;   //40 клеток в ширину
let heightInBlocks = height / blockSize; //40 клеток в высоту

//создаем переменную для счета очков
let score = 0;

//рисуем рамку
let drawBorder = function () {
    //цвет
    ctx.fillStyle = "Gray";
    //верхнияя
    ctx.fillRect(0, 0, width, blockSize);
    //нижняя
    ctx.fillRect(0, height - blockSize, width, blockSize);
    //левая
    ctx.fillRect(0, 0, blockSize, height);
    //правая
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};

//отображение счета
let drawScore = function () {
    ctx.font = "20px Courier";
    ctx.fiilStyle = "Black";
    ctx.textAlign = "left";
    ctx.Baseline = "top";
    ctx.fillText("Счет: " + score, widthInBlocks / 2, heightInBlocks / 2);
};

//конец игры
let gameOver = function () {
    clearInterval(intervalId);
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Конец: ", width / 2, height / 2);
};

//pause
let pause = function () {
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Пауза: ", width / 2, height / 2);
};

//функция circle
let circle = function(x, y, radius, fillCircle){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if(fillCircle){
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

//конструктор Block
let Block = function (col, row) {
    this.col = col;
    this.row = row;
};


//метод для рисования на холсте квадрата
Block.prototype.drawSquare = function (color){
    let x = this.col * blockSize;
    let y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
};


//метод для рисования на холсте окружность
Block.prototype.drawCircle = function (color) {
    let centerX = this.col * blockSize + blockSize / 2;
    let centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
};


//добавляем метод equal стр - 256
Block.prototype.equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
};


//создаем конструктор для змейки
let Snake = function () {
    this.segments = [    //
        new Block(7, 5), //голова
        new Block(6, 5), //тело
        new Block(5, 5)  //хвост
    ];
    this.direction = "right";     //текущее направление движения змейкм
    this.nextDirection = "right"; //направление движения змейки на следующем шаге
};

//рисуем змейку
Snake.prototype.draw = function () {
    for (let i = 0; i < this.segments.length; i++) {
        this.segments[i].drawSquare("Blue");
    }
};

//перемещаем змейку - принцип - добавляем сегмент головы - удаляем сегмент хвоста
Snake.prototype.move = function () {
    //голова змеи
    let head = this.segments[0];
    //новая змеиноя голова
    let newHead;

    //-----условие для отображения змейки с другой стороны при столкновении со стеной
    if(head.col > widthInBlocks){
        head.col = 0;
    } else if (head.col < 0) {
        head.col = widthInBlocks;
    }
    if(head.row > heightInBlocks){
        head.row = 0;
    } else if (head.row < 0) {
        head.row = heightInBlocks;
    }
    //

    this.direction = this.nextDirection;

    //управление
    if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up"){
        newHead = new Block(head.col, head.row - 1);
    } else if (this.direction === "pause") {
        return pause();
    }

    //вызываем метод для проверки на столкновение
    if (this.checkCollision(newHead)) {
        gameOver();
        return;
    }
    //добавляем элемент
    this.segments.unshift(newHead);
    //
    if (newHead.equal(apple.position)) {
        score++;
        apple.move();
    } else {
        this.segments.pop();
    }
};


//создаем метод checkCollision проверка на столкновения
Snake.prototype.checkCollision = function (head) {
    //
    let selfCollision = false;
    //
    for (let i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])){
            selfCollision = true;
        }
    }
    //return wallCollision || selfCollision;
    return selfCollision;
};

//создаем метод setDirection
Snake.prototype.setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "down") {
        return;
    } else if (this.direction === "right" && newDirection === "left") {
        return;
    } else if (this.direction === "down" && newDirection === "up") {
        return;
    } else if (this.direction === "left" && newDirection ==="right") {
        return;
    }
    this.nextDirection = newDirection;
};

//создаем яблоко
//конструктор Apple
let Apple = function () {
    this.position = new Block(10, 10);
};

//создаем метод для отрисовки яблока
Apple.prototype.draw = function () {
    this.position.drawCircle("Green");
    if (score >= 50) {
        this.position.drawCircle("Yellow");
    } else if (score >= 100){
        this.position.drawCircle("Red");
    }
};


//появление яблока в случайном порядке
Apple.prototype.move = function () {
    let randomCol = Math.floor(Math.random() * (widthInBlocks -2)) + 1;
    let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.position = new Block(randomCol, randomRow);
};

//создаем обьект-змейка и обьект-анимация
let snake = new Snake();
let  apple = new Apple();

//запускаем анимацию
let intervalId = setInterval (function () {
    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.draw();
    apple.draw();
    snake.move();
    //drawBorder();
}, 100);

//управление змейкой с клавиатуры
//
let directions = {
    "32" : "pause",
    "37" : "left",
    "38" : "up",
    "39" : "right",
    "40" : "down"
};
//
$("body").keydown(function(event) {
    let newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
});
