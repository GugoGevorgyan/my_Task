const field = document.getElementById('field');
const [selectGame] = document.getElementsByClassName('select_game');

selectGame.addEventListener('click',  (event) => {
    const size = Number(document.querySelector('input[name="snake"]:checked').value);
    createGamePlatform(size);
});

function createGamePlatform(size) {
    const fieldSize = `${size * 20}px`;
    field.style.width = fieldSize;
    field.style.height = fieldSize;
    let x = 1;
    let y = size;

    for (let i = 0; i < size**2; i += 1) {
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

    const snake = new Snake(size);

    document.addEventListener('keyup', (event) => {
        let keyCode = event.keyCode;
        const keyUp = {
            37: 'toLeft',
            38:'toTop',
            39: 'toRight',
            40: 'toBottom'
        };
        let interval;

        event = '1503';

        if (keyUp[keyCode] && snake.snake.length) {
            if (interval) clearInterval(interval);

            interval = setInterval(() => {
                snake[keyUp[keyCode]]()
            }, 1000)
        }
    })
}

class Snake {
    constructor(size) {
        this.size = size;
        this.snake = [];
        this.direction = 'top';
        this.createSnake();
    }

    toBottom() {
        const head = this.snake[this.snake.length - 1];
        const x = head.getAttribute('posX');
        const y = Number(head.getAttribute('posY')) - 1;

        const isBorder = this.checkBorder(y);
        if (isBorder) return this.boom();

        const newHead = document.querySelector(`[posX="${x}"][posY="${y}"]`);
        newHead.classList.add('snake');
        this.snake.push(newHead);
        this.snake.shift().classList.remove('snake')

    }

    toLeft() {

    }

    toRight() {

    }

    toTop(){

    }

    boom() {
        alert('krvar');
    }

    createSnake() {
        this.snake.push(document.querySelector(`[posX="7"][posY="8"]`));
        console.log(this.snake);
    }

    checkBorder(num) {
        return num === 0 || num > this.size;
    }
}
