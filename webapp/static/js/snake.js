let canvas = document.getElementById('snake-game-canvas');
let ctx = canvas.getContext('2d');
let btn = document.getElementById('snake-game-start');
let printScore = document.getElementById('snake-game-score')
let tileSize = 10;
let width = 400;
let height = 400;
let score = 0;
var snake;
var food;

var drawModule = (function () {
    var drawSnakeBodyPiece = function (row, col) {
        // Snake piece
        ctx.fillStyle = 'green';
        ctx.fillRect(row * tileSize, col * tileSize, tileSize, tileSize)
        // Border of the body piece
        ctx.strokeStyle = 'darkgreen'
        ctx.strokeRect(row * tileSize, col * tileSize, tileSize, tileSize)
    }

    var drawFood = function (row, col) {
        //Food piece
        ctx.fillStyle = 'yellow'
        ctx.fillRect(row * tileSize, col * tileSize, tileSize, tileSize)

        ctx.fillStyle = 'red'
        ctx.fillRect(row * tileSize + 1, col * tileSize + 1, tileSize - 2, tileSize - 2)
    }

    var scoreText = function () {
        printScore.innerText = 'Score: ' + score;
    }

    var drawSnake = function () {
        var length = 4;
        snake = [];

        for (var i = length; i >= 0; i--) {
            snake.push({x: i, y: 0});
        }
    }

    var createFood = function () {
        food = {
            //Generate random numbers.
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        }

        //Look at the position of the snake's body.
        for (var i = 0; i > snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;

            if (food.x === snakeX || food.y === snakeY || food.y === snakeY && food.x === snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }

    var checkCollision = function (x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x === x && array[i].y === y)
                return true;
        }
        return false;
    }

    var paint = function () {
        //Let's draw the space in which the snake will move.
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, width, height);

        //Give it a border.
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, width, height);

        //Disable the button _start_ while you're playing.
        btn.setAttribute('disabled', true);

        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        /*
        Make the snake move.
        Use a variable ('direction') to control the movement.
        To move the snake, pop out the last element of the array and shift it on the top as first element.
        */
        if (direction == 'right') {
            snakeX++;
        } else if (direction == 'left') {
            snakeX--;
        } else if (direction == 'up') {
            snakeY--;
        } else if (direction == 'down') {
            snakeY++;
        }

        /*
        If the snake touches the canvas path or itself, it will die!
        Therefore if x or y of an element of the snake, don't fit inside the canvas, the game will be stopped.
        If the check_collision is true, it means the the snake has crashed on its body itself, then the game will be stopped again.
        */
        if (snakeX == -1 || snakeX == width / tileSize ||
            snakeY == -1 || snakeY == height / tileSize ||
            checkCollision(snakeX, snakeY, snake)) {
            //Stop the game.

            //Make the start button enabled again.
            btn.removeAttribute('disabled', true);

            //Clean up the canvas.
            ctx.clearRect(0, 0, width, height);
            gameloop = clearInterval(gameloop);
            return;
        }

        //If the snake eats food it becomes longer and this means that, in this case, you shouldn't pop out the last element of the array.
        if (snakeX == food.x && snakeY == food.y) {
            //Create a new square instead of moving the tail.
            var tail = {
                x: snakeX,
                y: snakeY
            };
            score++;

            //Create new food.
            createFood();
        } else {

            //Pop out the last cell.
            var tail = snake.pop();
            tail.x = snakeX;
            tail.y = snakeY;
        }

        //Puts the tail as the first cell.
        snake.unshift(tail);

        //For each element of the array create a square using the bodySnake function we created before.
        for (var i = 0; i < snake.length; i++) {
            drawSnakeBodyPiece(snake[i].x, snake[i].y);
        }

        drawFood(food.x, food.y);

        //Put the score text.
        scoreText();
    }

    var init = function () {
        direction = 'down';

        // Lock arrows scrolling
        window.addEventListener("keydown", function (e) {
            // space and arrow keys
            if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);

        drawSnake();
        createFood();
        gameloop = setInterval(paint, 80);
    }

    return {
        init: init
    };

}());

(function (window, document, drawModule, undefined) {

    //Connect the button in the html with the _init_ function.
    btn.addEventListener("click", function () {
        drawModule.init();
    });

    document.onkeydown = function (event) {

        keyCode = window.event.keyCode;
        keyCode = event.keyCode;

        switch (keyCode) {

            case 37:
                if (direction != 'right') {
                    direction = 'left';
                }
                console.log('left');
                break;

            case 39:
                if (direction != 'left') {
                    direction = 'right';
                    console.log('right');
                }
                break;

            case 38:
                if (direction != 'down') {
                    direction = 'up';
                    console.log('up');
                }
                break;

            case 40:
                if (direction != 'up') {
                    direction = 'down';
                    console.log('down');
                }
                break;
        }
    }
})(window, document, drawModule);