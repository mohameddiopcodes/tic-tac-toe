/*----- constants -----*/
const chipLookup = {
    '0': '',
    '1': 'X',
    '-1': 'O'

}
/*----- app's state (variables) -----*/
const board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];
let turn = 1;
let winner = null;
let totalCellPlayed = 0;

/*----- cached element references -----*/
const cells = [...document.querySelectorAll('.row > div')];
const message = document.querySelector('h1');
const btn = document.querySelector('#btn')

/*----- event listeners -----*/
cells.forEach(cell => {
    cell.addEventListener('click', updateBoard)
})

btn.addEventListener('click', replay)
/*----- functions -----*/
init();

function init() {
    render()
}

function render() {
    renderCells();
}

function renderCells() {
    cells.forEach((cell, id) => {
        if(id >= 6) {
            cell.textContent = chipLookup[board[0][id%3]];
        } else if (id >= 3) {
            cell.textContent = chipLookup[board[1][id%3]];
        } else {
            cell.textContent = chipLookup[board[2][id%3]];
        }
    })
}

function updateBoard(e) {
    if(!e.target.textContent) {
        e.target.textContent = chipLookup[turn];
        turn *= -1;
        totalCellPlayed += 1;
        if(totalCellPlayed >= 9) {
            endGame();
        }
    }
}

function endGame() {
    message.textContent = 'END !';
    btn.style.visibility = 'visible';
    totalCellPlayed = 0;
}

function replay(e) {
    cells.forEach(cell => {
        cell.textContent = ''
    })
    btn.style.visibility = 'hidden'
    message. textContent = 'Make your moves'
}