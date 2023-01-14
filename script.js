const DEFAULT_SIZE = 800;

const board = document.querySelector('.board');

function updateBoard(rows, cols) {
    board.style.setProperty('--default-size', DEFAULT_SIZE);
    board.style.setProperty('--grid-rows', rows);
    board.style.setProperty('--grid-cols', cols);

    for(let i = 0; i < rows*cols; i++) {
        let div = document.createElement('div');
        div.classList.add('unit');
        div.style.border = '1px solid black';
        div.style.width = `${(DEFAULT_SIZE-(2+2*(rows-1)))/rows}px`;
        div.style.height = `${(DEFAULT_SIZE-(2+2*(cols-1)))/cols}px`;
        board.appendChild(div);
    }
}

function paintDiv(e) {
    if (!e.target.classList.contains('unit')) return;
    e.target.style.background = 'blue';
}

document.addEventListener('mouseover', paintDiv);

updateBoard(50,50);