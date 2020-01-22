'use strict'

var EMPTY_SYMBOL = ' ';
var MINE_SYMBOL = '*';
var MARK_SYMBOL = '~';


var gBoard;

function expandShown(board, elCell, i, j) {

}

function renderBoard(board) {
    var htmlStr = '';

    for (var i = 0; i < board.length; i++) {
        htmlStr += '<tr>'
        for (var j = 0; j < board.length; j++) {
            var curCell = board[i][j];
            var curCellContent = curCell.isMine ? MINE_SYMBOL : curCell.minesAroundCount;
            curCellContent = curCell.isShown ? curCellContent : EMPTY_SYMBOL;
            htmlStr += `<td class="cell" data-i="${i}" data-j="${j}" data-numOfMinesNegs="${curCell.minesAroundCount}" onmousedown="cellClicked(event, this, ${i}, ${j})" oncontextmenu="disableContextMenu()">${curCellContent}</td>`;
        }

        htmlStr += '</tr>';
    }

    var elTableBody = document.querySelector('.board-table-body');
    elTableBody.innerHTML = htmlStr;
    console.log(board);
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            board[i][j].minesAroundCount = countMinesNegs(board, i, j);
        }
    }
}

function countMinesNegs(board, i, j) {
    var numOfMinesNegs = 0;

    numOfMinesNegs += countCell(board, i - 1, j - 1);
    numOfMinesNegs += countCell(board, i - 1, j);
    numOfMinesNegs += countCell(board, i - 1, j + 1);
    numOfMinesNegs += countCell(board, i, j - 1);
    numOfMinesNegs += countCell(board, i, j + 1);
    numOfMinesNegs += countCell(board, i + 1, j - 1);
    numOfMinesNegs += countCell(board, i + 1, j);
    numOfMinesNegs += countCell(board, i + 1, j + 1);

    return numOfMinesNegs;
}

function countCell(board, i, j) {
    var isValidRow = 0 <= i && i < board.length;
    var isValidCol = 0 <= j && j < board.length;
    var isValidCell = isValidRow && isValidCol;

    if (isValidCell) {
        var cell = board[i][j];
        return cell.isMine ? 1 : 0;
    } else {
        return 0;
    }
}

function setMinesRandom(board) {
    var emptySpaces = getEmptySpaces(board);

    for (var i = 0; i < gGameCurLevel.mines; i++) {
        var curRandEmptySpacesIndex = getRandomIntInclusive(0, emptySpaces.length - 1);
        var curRandPos = emptySpaces.splice(curRandEmptySpacesIndex, 1)[0];
        board[curRandPos.i][curRandPos.j].isMine = true;
        console.log(`mine-i = ${curRandPos.i} mine-j=${curRandPos.j}`);

    }
}

function getEmptySpaces(board) {
    var emptySpaces = [];

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (isEmptyCell(board, i, j)) {
                emptySpaces.push({ i: i, j: j });
            }
        }
    }

    return emptySpaces;
}

function buildBoard(level) {
    var board = [];

    for (var i = 0; i < level.size; i++) {
        board[i] = [];
        for (var j = 0; j < level.size; j++) {
            board[i][j] = createCell();
        }
    }

    setMinesRandom(board);

    return board;
}


