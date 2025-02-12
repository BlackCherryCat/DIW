class Segment {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d');

        this.size = 10;
        this.snake = [new Segment(3000, 240, this.size, '#00ff00')];
        this.direction = 'RIGHT';
        this.food = this.generateFood();
        this.obstacles = [];
        this.foodCount = 0;

        document.addEventListener('keydown', this.changeDirection.bind(this));
        this.gameLoop();
    }

    changeDirection(event) {
        const key = event.key;
        if (key === 'ArrowUp' && this.direction !== 'DOWN') this.direction = 'UP';
        else if (key === 'ArrowDown' && this.direction !== 'UP') this.direction = 'DOWN';
        else if (key === 'ArrowLeft' && this.direction !== 'RIGHT') this.direction = 'LEFT';
        else if (key === 'ArrowRight' && this.direction !== 'LEFT') this.direction = 'RIGHT';
    }

    generateFood() {
        return new Segment(
            this.getRandomCoord(this.canvas.width),
            this.getRandomCoord(this.canvas.height),
            this.size, '#ff0000'
        );
    }

    generateObstacles(n) {
        for (let i = 0; i < n; i++) {
            this.obstacles.push(new Segment(
                this.getRandomCoord(this.canvas.width),
                this.getRandomCoord(this.canvas.height),
                this.size, '#61dafb'
            ));
        }
    }

    getRandomCoord(max) {
        return Math.floor(Math.random() * (max / this.size)) * this.size;
    }

    moveSnake() {
        let head = this.snake[0];
        let newHead;
        if (this.direction === 'UP') newHead = new Segment(head.x, head.y - this.size, this.size, '#00ff00');
        else if (this.direction === 'DOWN') newHead = new Segment(head.x, head.y + this.size, this.size, '#00ff00');
        else if (this.direction === 'LEFT') newHead = new Segment(head.x - this.size, head.y, this.size, '#00ff00');
        else if (this.direction === 'RIGHT') newHead = new Segment(head.x + this.size, head.y, this.size, '#00ff00');

        this.snake.unshift(newHead);
        if (this.collidesWith(this.food)) {
            this.food = this.generateFood();
            this.generateObstacles(++this.foodCount);
        } else {
            this.snake.pop();
        }
    }

    collidesWith(obj) {
        return this.snake[0].x === obj.x && this.snake[0].y === obj.y;
    }

    checkCollisions() {
        let head = this.snake[0];
        if (head.x < 0 || head.x >= this.canvas.width || head.y < 0 || head.y >= this.canvas.height) {
            alert('Has perdido :(');
            this.resetGame();
        }

        for (let obs of this.obstacles) {
            if (this.collidesWith(obs)) {
                alert('Has perdido :(');
                this.resetGame();
            }
        }

        if (this.foodCount >= 10) {
            alert('You are a winner!! :)');
            this.resetGame();
        }
    }

    resetGame() {
        this.snake = [new Segment(300, 240, this.size, '#00ff00')];
        this.direction = 'RIGHT';
        this.food = this.generateFood();
        this.obstacles = [];
        this.foodCount = 0;
    }

    gameLoop() {
        setTimeout(() => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.moveSnake();
            this.checkCollisions();
            this.snake.forEach(segment => segment.draw(this.context));
            this.food.draw(this.context);
            this.obstacles.forEach(obstacle => obstacle.draw(this.context));
            this.gameLoop();
        }, 100);
    }
}

new Game();