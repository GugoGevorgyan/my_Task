const field = document.getElementById('field');
const [selectGame] = document.getElementsByClassName('select_game');
const check = document.getElementById('check');
const signboard = document.getElementById('signboard');
const record = document.createElement('div');
const recordContent = document.createElement('p');
const count = document.createElement('div');
const level = document.createElement('div');
const levelContent = document.createElement('p');
const countContent = document.createElement('p');
record.classList.add('size');
record.innerText = 'record';
recordContent.innerText = localStorage.getItem("gameSnakeRecord") || 1;
record.appendChild(recordContent);
count.classList.add('size');
count.innerText = 'count';
countContent.innerText = '1';
count.appendChild(countContent);
level.classList.add('size');
level.innerText = 'level';
levelContent.innerText = '1';
level.appendChild(levelContent);
let mySnake = null;
let myMouse = null;

selectGame.addEventListener('click', (event) => {
    const size = Number(document.querySelector('input[name="snake"]:checked').value);
    createGamePlatform(size);
});


function createGamePlatform(size = 15) {
    const pauseContainer = document.getElementById('pause')
    const pause = document.createElement('div');
    pause.innerText = 'PAUSE';
    pause.classList.add('pause');
    pauseContainer.appendChild(pause);
    pause.addEventListener('click', () => {
        mySnake.pause();
        // snake.pause();
    })
    signboard.appendChild(level);
    signboard.appendChild(count);
    signboard.appendChild(record);
    const fieldSize = `${size * 20}px`;
    field.style.width = fieldSize;
    field.style.height = fieldSize;
    let x = 1;
    let y = size;

    for (let i = 0; i < size ** 2; i += 1) {
        const excel = document.createElement('div');

        if (x > size) {
            x = 1;
            y -= 1
        }

        excel.setAttribute('posX', x);
        excel.setAttribute('posY', y);
        excel.classList.add('excel');
        field.appendChild(excel);
        x += 1;
    }
    check.classList.add('display_none');
    // const snake = new Snake(size);
    // const mouse = new Mouse(size);
    mySnake = new Snake(size);
    myMouse = new Mouse(size);

    document.addEventListener('keyup', directed, false);
    // => {
    //     // snake.keyEvent = event.keyCode;
    //     // snake.start();
    //     mySnake.keyEvent = event.keyCode;
    //     mySnake.start();
    // })

}
function directed(event) {
    mySnake.keyEvent = event.keyCode;
    mySnake.start();
}
class Snake {
    constructor(size) {
        this.snakeRecord = localStorage.getItem("gameSnakeRecord");
        this.increment = 1;
        this.size = size;
        this.snake = [];
        this.interval = null;
        this.direction = null;
        this.keyEvent = null;
        this.speed = 300;
        this.createSnake();
        // this.start();
    }

    static keyUp = {
        37: 'toLeft',
        38: 'toTop',
        39: 'toRight',
        40: 'toBottom'
    };

    checkValidEvent(keyCode) {
        let action = false;
        if (!keyCode) return null;

        switch (this.direction) {
            case 'toLeft':
                if (keyCode === 37 || keyCode === 39) {
                    action = true;
                }
                break;
            case 'toTop':
                if (keyCode === 40 || keyCode === 38) {
                    action = true;
                }
                break;
            case 'toRight':
                if (keyCode === 37 || keyCode === 39) {
                    action = true;
                }
                break;
            case 'toBottom':
                if (keyCode === 40 || keyCode === 38) {
                    action = true;
                }
                break;
        }
        return action || keyCode;
    }

    toBottom() {
        const headBottom = this.snake[this.snake.length - 1];
        const x = headBottom.getAttribute('posX');
        const y = Number(headBottom.getAttribute('posY')) - 1;
        this.achtionSnake(x, y);
    }

    toLeft() {
        const headLeft = this.snake[this.snake.length - 1];
        const x = Number(headLeft.getAttribute('posX')) - 1;
        const y = Number(headLeft.getAttribute('posY'));
        this.achtionSnake(x, y);
    }

    toRight() {
        const headRight = this.snake[this.snake.length - 1];
        const x = Number(headRight.getAttribute('posX')) + 1;
        const y = Number(headRight.getAttribute('posY'));
        this.achtionSnake(x, y);
    }

    toTop() {
        const headTop = this.snake[this.snake.length - 1];
        const x = Number(headTop.getAttribute('posX'));
        const y = Number(headTop.getAttribute('posY')) + 1;
        this.achtionSnake(x, y);
    }

    achtionSnake(x, y) {
        const mouse = document.querySelector('.mouse');
        const isBorder = this.checkBorder(x, y);
        if (isBorder) return this.boom();
        const newHead = document.querySelector(`[posX="${x}"][posY="${y}"]`);
        const isYourself = this.checkSnakeBorder(newHead);
        if (isYourself) return this.boom();
        if (newHead === mouse) {
            const newMouse = this.mouseEat(newHead);
            if (newMouse) {
                return new Mouse(this.size);
            }
        }
        newHead.classList.add('snake');
        this.snake.push(newHead);
        this.snake.shift().classList.remove('snake');
    }

    boom() {
        clearInterval(this.interval);
        myMouse = null;
        mySnake = null;
        alert('GAME OVER');
        this.snake.forEach(element => element.classList.remove('snake'));
        let [mouse] = document.getElementsByClassName('mouse');
        const excel = document.querySelectorAll('.excel');
        let signboards = document.querySelectorAll('.size');
        const check = document.getElementById('check');
        const pause = document.querySelector('.pause');
        pause.remove();
        mouse.classList.remove('mouse');
        excel.forEach(element => element.remove());
        signboards.forEach(element => element.remove());
        check.classList.remove('display_none');
        this.snakeRecord = localStorage.getItem("gameSnakeRecord");
        this.snake = [];
        this.interval = null;
        this.direction = null;
        this.keyEvent = null;
        countContent.innerText = '1';
        levelContent.innerText = '1';
        document.removeEventListener('keyup', directed, false);
        myMouse = null;
        mySnake = null;
    }

    createSnake() {
        const x = Math.ceil(this.size / 2);
        this.snake.push(document.querySelector(`[posX="${x}"][posY="${x}"]`));
        this.snake[0].classList.add('snake');
    }

    checkBorder(x, y) {
        return (x === 0 || x > this.size) || (y === 0 || y > this.size);
    }

    checkSnakeBorder(snake) {
        return snake.classList.contains('snake');
    }

    mouseEat(nextExcel) {
        if (nextExcel.classList.contains('mouse')) {
            nextExcel.classList.remove('mouse');
            nextExcel.classList.add('snake');
            this.snake.push(nextExcel);
            this.count();
            return nextExcel;
        }
    }

    start() {
        const action = this.checkValidEvent(this.keyEvent);
        // if (typeof action !== "number") return;
        if (!Snake.keyUp[action]) return;
        const event = Snake.keyUp[action];
        if (event) this.direction = event;
        this.keyEvent = null;
        if (this.direction) {
            if (this.interval && this.direction === event) clearInterval(this.interval);
            this.interval = setInterval(() => {
                this[this.direction]();
            }, this.speed)
        }

    }

    pause() {
        clearInterval(this.interval);
    }

    count() {
        this.increment++;
        let snakeLength = this.snake.length;
        countContent.innerText = snakeLength;
        if (this.increment === 5) {
            this.increment = 0;
            this.level();
        }
        this.records();

    }

    level() {
        let level = Number(levelContent.innerText);
        levelContent.innerText = level + 1;
        this.speed -= 50;
    }

    records() {
        let snakeLength = this.snake.length;
        if (!this.snakeRecord) this.snakeRecord = snakeLength;
        if (this.snakeRecord < snakeLength) {
            this.snakeRecord = snakeLength;
            recordContent.innerText = this.snakeRecord;
            localStorage.setItem('gameSnakeRecord', snakeLength);
        }
    }
}

class Mouse {
    constructor(size) {
        this.size = size;
        this.mouse = '';
        this.X = '';
        this.Y = '';
        this.generateMouseCoordinates();
    }

    generateMouseCoordinates() {
        this.X = Math.round(Math.random() * (this.size - 1) + 1);
        this.Y = Math.round(Math.random() * (this.size - 1) + 1);
        this.createMouse();
    }

    createMouse() {
        this.mouse = document.querySelector(`[posX="${this.X}"][posY="${this.Y}`);
        while (this.mouse.classList.contains('snake')) {
            this.generateMouseCoordinates();
        }
        this.mouse.classList.add('mouse');

    }


}
