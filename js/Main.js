/*----- constants -----*/
const chipLookup = {
    '0': '',
    '1': 'X',
    '-1': 'O'

}
/*----- app's state (variables) -----*/
let board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];
let turn = 1;
let winner = null;
// let darkMode = false;
// let lineThrough = false;

/*----- cached element references -----*/
const cells = [...document.querySelectorAll('.row > div')];
const message = document.querySelector('h1');
const btn = document.querySelector('#btn');

/*----- event listeners -----*/
cells.forEach(cell => {
    cell.addEventListener('click', updateBoard);
})

btn.addEventListener('click', replay);

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
        board[e.target.id[0]][e.target.id[1]] = turn;
        checkWin(e);
        turn *= -1;
        if(!board[0].includes(0) && !board[1].includes(0) && !board[2].includes(0)) {
            endGame("It's a tie");
        }
    }
}

function checkWin(e) {
    //checking for horizontal wins
    board.forEach((rowArr, rowId) => {
        if(!rowArr.includes(0) && !rowArr.includes(-1)) {
            endGame('X Wins!')
        } else if(!rowArr.includes(0) && !rowArr.includes(1)) {
            endGame('O Wins!')
        }
    })
    //checking for vertical wins
    if(board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] === 1) {
        endGame('X Wins!')
    } else if(board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] === -1) {
        endGame('O Wins!')
    } else if(board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] === 1) {
        endGame('X Wins!')
    } else if(board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] === -1) {
        endGame('O Wins!')
    } else if(board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] === 1) {
        endGame('X Wins!')
    } else if(board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] === -1) {
        endGame('O Wins!')
    }
    //checking for slanted wins
    if(board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] === 1) {
        endGame('X Wins!')
    } else if(board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] === -1) {
        endGame('O Wins!')
    } else if(board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] === 1) {
        endGame('X Wins!')
    } else if(board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] === -1) {
        endGame('O Wins!')
    }
}

function endGame(text) {
    message.textContent = text;
    btn.style.visibility = 'visible';
    totalCellPlayed = 0;
    board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

}

function replay(e) {
    cells.forEach(cell => {
        cell.textContent = '';
    })
    btn.style.visibility = 'hidden';
    message.textContent = 'Make your moves';
}
