const DEFAULT_SIZE = 650;

let colorValue, size, mode = 0;

// mode: 0 - normal
// mode: 1 - darken
// mode: 2 - lighten
// mode: 3 - rainbow

const board = document.querySelector('.board');

const colorPicker = document.querySelector('input[type="color"]')
const sizeRange = document.querySelector('input[type="range"]')

const labelRange = document.querySelector('.pixel label')

const darkenMode = document.querySelector('.darken')
const lightenMode = document.querySelector('.lighten')
const rainbowMode = document.querySelector('.rainbow')
const clearButton = document.querySelector('clear')


function updateBoard(rows, cols) {
    //deleate board
    board.innerHTML = '';

    board.style.setProperty('--default-size', DEFAULT_SIZE-1);
    board.style.setProperty('--grid-rows', rows);
    board.style.setProperty('--grid-cols', cols);

    for(let i = 0; i < rows*cols; i++) {
        let div = document.createElement('div');
        div.classList.add('unit');
        // div.style.border = '1px solid black';
        div.style.width = `${(DEFAULT_SIZE)/cols}px`;
        div.style.opacity = '0';
        div.style.height = `${(DEFAULT_SIZE)/rows}px`;
        board.appendChild(div);
    }
}

function paintDiv(e) {
    if (!e.target.classList.contains('unit')) return;

    if (mode == 0) {
        e.target.style.opacity = 1;
        e.target.style.background = colorValue;
    }

    if (mode == 1) {
        if (e.target.style.background != 'black' && +e.target.style.opacity == 1) {
            e.target.style.opacity = 0.5;
            e.target.style.background = 'black';
            return;
        }
        e.target.style.background = 'black';
        e.target.style.opacity = Math.min(1, +e.target.style.opacity+0.25);
    }

    if (mode == 2) {
        e.target.style.opacity = Math.max(0, +e.target.style.opacity-0.25);
    }

    if (mode == 3) {
        e.target.style.opacity = 1;
        e.target.style.background = '#'+Math.floor(Math.random()*16777215).toString(16);
    }
}

function handleButtons(e) {
    if (e.target.classList.contains('darken')) {
        if (mode == 1) {
            mode = 0;
        } else {
            mode = 1;
        }

        //dermarca o outro bot??o
        lightenMode.classList.remove('active')
        rainbowMode.classList.remove('active')

        e.target.classList.toggle('active');
    } else if (e.target.classList.contains('lighten')) {
        if (mode == 2) {
            mode = 0;
        } else {
            mode = 2;
        }

        //dermarca o outro bot??o
        darkenMode.classList.remove('active');
        rainbowMode.classList.remove('active')

        e.target.classList.toggle('active');
    } else if (e.target.classList.contains('rainbow') ) {
        if (mode == 3) {
            mode = 0;
        } else {
            mode = 3;
        }

        lightenMode.classList.remove('active');
        darkenMode.classList.remove('active');

        e.target.classList.toggle('active');
    } else if (e.target.classList.contains('clear')) {
        board.innerHTML = ''
        updateBoard(size, size);
    }
}

window.addEventListener('load', () => {
    colorValue = colorPicker.value;
    
    size = +sizeRange.value;
    labelRange.textContent = `${size} x ${size}`

    updateBoard(size,size);
})

document.addEventListener('mouseover', paintDiv);

colorPicker.addEventListener('input', (e) => {
    colorValue = e.target.value;
})

colorPicker.addEventListener('click', () => {
    mode = 0;
    darkenMode.classList.remove('active');
    lightenMode.classList.remove('active');
    rainbowMode.classList.remove('active')
})

sizeRange.addEventListener('input', () => {
    size = +sizeRange.value;
    labelRange.textContent = `${size} x ${size}`
})

sizeRange.addEventListener('change', () => {
    updateBoard(size,size);
})

document.querySelectorAll('.button').forEach((btn) => {
    btn.addEventListener('click', handleButtons)
})