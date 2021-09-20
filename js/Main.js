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

/*----- cached element references -----*/
const cells = [...document.querySelectorAll('.row > div')];
const message = document.querySelector('h1');
const btn = document.querySelector('#btn');
const line = document.querySelector('img')

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
        checkWin();
        turn *= -1;
        if(!board[0].includes(0) && !board[1].includes(0) && !board[2].includes(0)) {
            endGame("It's a tie");
        }
    }
}

function checkWin() {
    //checking for horizontal wins
    board.forEach((rowArr, rowId) => {
        if(!rowArr.includes(0) && !rowArr.includes(-1)) {
            if(rowId === 1) {
                lineThrough('0', '0', '0', '1');
            } else if(rowId === 0) {
                lineThrough('0', '0', '-30%', '1');
            } else if(rowId === 2) {
                lineThrough('0', '0', '32%', '1');
            }
            endGame('X Wins!');
        } else if(!rowArr.includes(0) && !rowArr.includes(1)) {
            if(rowId === 1) {
                lineThrough('0', '0', '0', '1');
            } else if(rowId === 0) {
                lineThrough('0', '0', '-30%', '1');
            } else if(rowId === 2) {
                lineThrough('0', '0', '32%', '1');
            }
            endGame('O Wins!')
        }
    })

    //checking for vertical wins
    if(board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] === 1) {
        lineThrough('90deg', '-1.5%', '39.5%', '1');
        endGame('X Wins!');
    } else if(board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] === -1) {
        lineThrough('90deg', '-1.5%', '39.5%', '1');
        endGame('O Wins!')
    } else if(board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] === 1) {
        lineThrough('90deg', '-1.5%', '7.3%', '1');
        endGame('X Wins!')
    } else if(board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] === -1) {
        lineThrough('90deg', '-1.5%', '7.3%', '1');
        endGame('O Wins!')
    } else if(board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] === 1) {
        lineThrough('90deg', '-1.5%', '-24.7%', '1');
        endGame('X Wins!')
    } else if(board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] === -1) {
        lineThrough('90deg', '-1.5%', '-24.7%', '1');
        endGame('O Wins!')
    }

    //checking for slanted wins
    if(board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] === 1) {
        lineThrough('44.5deg', '-4%', '5%', '1.2');
        endGame('X Wins!');
    } else if(board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] === -1) {
        lineThrough('44.5deg', '-4%', '5%', '1.2');
        endGame('O Wins!');
    } else if(board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] === 1) {
        lineThrough('-44.5deg', '0', '-2%', '1.2');
        endGame('X Wins!');
    } else if(board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] === -1) {
        lineThrough('-44.5deg', '0', '-2%', '1.2');
        endGame('O Wins!');
    }
}

function lineThrough(rotate, translateX, translateY, scale) {
    line.style.visibility = 'visible';
    line.style.transform = `rotate(${rotate})`;
    line.style.transform += ` translateX(${translateX})`;
    line.style.transform += ` translateY(${translateY})`;
    line.style.transform += ` scale(${scale})`;
}

function replay(e) {
    cells.forEach(cell => {
        cell.textContent = '';
    })
    btn.style.visibility = 'hidden';
    message.textContent = 'Make your moves';
    line.style.visibility = 'hidden';
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