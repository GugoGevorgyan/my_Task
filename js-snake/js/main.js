const field = document.getElementById('field');
const [selectGame] = document.getElementsByClassName('select_game');
const check = document.getElementById('check');

selectGame.addEventListener('click', (event) => {
    const size = Number(document.querySelector('input[name="snake"]:checked').value);
    createGamePlatform(size);
});


const bin = {
    right: 1,   // 0001
    bottom: 2,  // 0010
    left: 4,    // 0100
    top: 8,     // 1000
};
const variants = {
    toTop: bin.left | bin.right,     // 0101
    toBottom: bin.left | bin.right,  // 0101
    toLeft: bin.top | bin.bottom,    // 1010
    toRight: bin.top | bin.bottom,   // 1010
};
const keyCodes = {
    37: 'left',
    39: 'right',
    38: 'top',
    40: 'bottom',
};

const keyUp = {
    37: 'toLeft',
    38: 'toTop',
    39: 'toRight',
    40: 'toBottom'
};


function createGamePlatform(size = 15) {
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
    const snake = new Snake(size);
    const mouse = new Mouse(size);

    document.addEventListener('keyup', (event) => {
        const validKey = Object.keys(keyCodes).includes(String(event.keyCode));
        if (validKey) {
            snake.keyEvent = event.keyCode;
        }
    })
}

class Snake {
    constructor(size) {
        this.size = size;
        this.snake = [];
        this.interval = null;
        this.direction = null;
        this.keyEvent = null;
        this.createSnake();
        this.start();
    }

    checkValidEvent(keyCode) {
        if (!this.direction) return keyCode;

        return !!(variants[this.direction] & bin[keyCodes[keyCode]]) && keyCode;
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
        alert('DEFEAT');
        this.snake.forEach(element => element.classList.remove('snake'));
        let [mouse] = document.getElementsByClassName('mouse');
        const excel = document.querySelectorAll('.excel');
        const check = document.getElementById('check');
        mouse.classList.remove('mouse');

        excel.forEach(element => element.remove());
        check.classList.remove('display_none');
        this.snake = [];
        this.interval = null;
        this.direction = null;
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
            return nextExcel;
        }
    }

    start() {
        this.interval = setInterval(() => {
            const action = this.checkValidEvent(this.keyEvent) || 6886;
            const event = keyUp[action];
            if (event) this.direction = event;
            this.keyEvent = null;
            if (this.direction) this[this.direction]();
        }, 300)
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
