window.onload = function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var canvasW = canvas.width;
    var canvasH = canvas.height;

    var snakeW = 20;
    var snakeH = 20;

    //khai báo mảng rắn rỗng
    var snake = [];

    //add 3 ô vào thân rắn ban đầu, bắt đầu tử đuôi lên đến đầu
    var baseLength = 3;
    for (var i = baseLength-1; i>=0; i--) {
         snake.push(
             {x:i, y:0}
         );
    }

    //vẽ rắn, gồm các ô vuông được tô màu trắng và viền đen
    function drawSnake(x,y) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(x*snakeW, y*snakeH, snakeW, snakeH);
/*        ctx.fillStyle = "black";
        ctx.strokeRect(x*snakeW, y*snakeH, snakeW, snakeH);*/
    }

    //kiểm tra điều kiện đầu rắn đâm vào người rắn
    function checkCollision(x, y, array){
        for (var i = 1; i < array.length; i++){
            if (x == array[i].x && y == array[i].y) {
                return true;
            }
        }
        return false;
    }

    //khai báo thức ăn là 1 ô vuông có tọa độ x, y được random
    food = {
        x : Math.floor(Math.random()*(canvasW/snakeW)),
        y : Math.floor(Math.random()*(canvasH/snakeH))
    }

    //vẽ thức ăn, được tô màu vàng và viền màu đỏ
    function drawFood(x,y) {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.fillRect(x*snakeW, y*snakeH, snakeW, snakeH);
/*        ctx.fillStyle = "black";
        ctx.strokeRect(x*snakeW, y*snakeH, snakeW, snakeH);*/
    }

    //khai báo và hiển thị điểm ở dưới khung canvas
    var score = 0;
    function drawScore(x) {
        ctx.fillStyle = "green";
        ctx.font = "30px Verdana"
        ctx.fillText("score: "+x,5, canvasH-5);

    }

    //lấy sự kiện phím
    document.addEventListener("keydown", getDirection);

    //hàm lấy sự kiện phím để chọn hướng đi của rắn
    var direction = "right";
    function getDirection(num) {
        if (num.keyCode == 37 && direction != "right") {
            direction = "left";
        } else if (num.keyCode == 38 && direction != "down") {
            direction = "up";
        } else if (num.keyCode == 39 && direction != "left") {
            direction = "right";
        } else if (num.keyCode == 40 && direction != "up") {
            direction = "down";
        }
    }


    //function để chạy game
    function gameLaunch() {

        //vẽ rắn, thức ăn ban đầu
        ctx.beginPath();
        ctx.clearRect(0, 0, canvasW, canvasH);
        for (var i = 0; i < snake.length; i++) {
            var x = snake[i].x;
            var y = snake[i].y;
            drawSnake(x, y);
        }
        drawFood(food.x, food.y);

        //lấy tọa độ của phần tử 0 làm tọa độ của đầu rắn
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        //lấy tọa độ của đầu rắn mới theo hướng đi của rắn
        if (direction == "left") snakeX--;
        else if (direction == "up") snakeY--;
        else if (direction == "right") snakeX++;
        else if (direction == "down") snakeY++;

        //thêm 01 ô mới làm đầu rắn và gỡ 01 ô cuối đuôi rắn, nếu ăn thức ăn thì ko gỡ đuôi rắn
        if(snakeX == food.x && snakeY == food.y) {
            food = {
                x : Math.floor(Math.random()*(canvasW/snakeW)),
                y : Math.floor(Math.random()*(canvasH/snakeH))
            }
            var newHead = {
                x: snakeX,
                y: snakeY
            };
            score++;
        } else {
            snake.pop();
            var newHead = {
                x: snakeX,
                y: snakeY
            };
        }
        snake.unshift(newHead);

        //check nếu rắn đâm vào tường, đâm vào người thì chạy lại game
        if (snakeX < 0 || snakeY < 0 || snakeX >= canvasW/snakeW || snakeY >= canvasH/snakeH || checkCollision(snakeX,snakeY,snake)){
            location.reload();
        }

        //hiển thị điểm
        drawScore(score);
    }

    // chạy game bằng cách chạy fundion gameLaunch 10 lần 1s
    setInterval(gameLaunch,100);

}
