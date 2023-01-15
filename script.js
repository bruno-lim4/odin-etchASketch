const DEFAULT_SIZE = 800;

let colorValue, size, mode = 0;

// mode: 0 - normal
// mode: 1 - darken
// mode: 2 - lighten

const board = document.querySelector('.board');

const colorPicker = document.querySelector('input[type="color"]')
const sizeRange = document.querySelector('input[type="range"]')

const labelRange = document.querySelector('.pixel label')

const darkenMode = document.querySelector('.darken')
const lightenMode = document.querySelector('.lighten')
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
        div.style.height = `${(DEFAULT_SIZE)/rows}px`;
        board.appendChild(div);
    }
}

function paintDiv(e) {
    if (!e.target.classList.contains('unit')) return;
    e.target.style.background = colorValue;
}

function handleButtons(e) {
    if (e.target.classList.contains('darken')) {
        mode = 1;
        e.target.classList.add('active');
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

sizeRange.addEventListener('input', () => {
    size = +sizeRange.value;
    labelRange.textContent = `${size} x ${size}`

    updateBoard(size,size);
})

document.querySelectorAll('.option-button').forEach((btn) => {
    btn.addEventListener('click', handleButtons)
})