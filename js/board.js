'use strict'

var EMPTY_SYMBOL = ' ';
var MINE_SYMBOL = '💣';
var MARK_SYMBOL = '🏴‍☠️';


var gBoard;
var gHintTime = 1000;

function toggleHighlightUnRevealedCells(shouldHighlightCells) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var curCell = gBoard[i][j];
            if (!curCell.isShown) {
                var curQuery = `[data-i="${i}"][data-j="${j}"]`;
                var elCell = document.querySelector(curQuery);
                if (shouldHighlightCells) {
                    elCell.classList.add('cell-highlight');
                } else {
                    elCell.classList.remove('cell-highlight');
                }
            }
        }
    }

}

function showHint(i, j) {
    for (var iIndex = i - 1; iIndex <= i + 1; iIndex++) {
        for (var jIndex = j - 1; jIndex <= j + 1; jIndex++) {
            if (isValidCell(gBoard, iIndex, jIndex) && !gBoard[iIndex][jIndex].isShown) {
                showCellHint(gBoard, iIndex, jIndex);
            }
        }
    }
}

function hideHint(i, j) {
    for (var iIndex = i - 1; iIndex <= i + 1; iIndex++) {
        for (var jIndex = j - 1; jIndex <= j + 1; jIndex++) {
            if (isValidCell(gBoard, iIndex, jIndex) && gBoard[iIndex][jIndex].isHint) {
                hideCellHint(gBoard, iIndex, jIndex);
            }
        }
    }
}

function expandShown(board, i, j) {
    if (isEmptyAndSafeCell(board, i, j)) {
        showCell(board, i, j);
        for (var iIndex = i - 1; iIndex <= i + 1; iIndex++) {
            for (var jIndex = j - 1; jIndex <= j + 1; jIndex++) {
                expandShown(board, iIndex, jIndex);
            }
        }
    } else if (isValidCell(board, i, j)) {
        showCell(board, i, j);
    }
}

function isEmptyAndSafeCell(board, i, j) {
    var isValid = isValidCell(board, i, j);
    var curCell;
    var isShownValid;
    var isMineValid;
    var isMarkedValid;
    var isNegsValid;

    if (isValid) {
        curCell = board[i][j];
        isShownValid = !curCell.isShown;
        isMineValid = !curCell.isMine;
        isMarkedValid = !curCell.isMarked;
        isNegsValid = curCell.minesAroundCount === 0;
    }

    return isValid && isShownValid && isMineValid && isMarkedValid && isNegsValid;
}

function showCell(board, i, j) {
    var cell = board[i][j];
    gGame.showCount = !cell.isShown ? gGame.showCount++ : gGame.showCount;
    cell.isShown = true;
    var cellContent = cell.minesAroundCount > 0 ? cell.minesAroundCount : EMPTY_SYMBOL;
    var query = `[data-i="${i}"][data-j="${j}"]`;
    var elCell = document.querySelector(query);
    elCell.innerText = cellContent;
    elCell.classList.add('cell-shown');
}

function showCellHint(board, i, j) {
    var cell = board[i][j];
    cell.isShown = true;
    cell.isHint = true;
    var cellContent = cell.isMine ? MINE_SYMBOL : cell.minesAroundCount;
    var query = `[data-i="${i}"][data-j="${j}"]`;
    var elCell = document.querySelector(query);
    elCell.innerText = cellContent;
    elCell.classList.add('cell-hint-on');
}

function hideCellHint(board, i, j) {
    var cell = board[i][j];
    cell.isShown = false;
    cell.isHint = false;
    var cellContent = EMPTY_SYMBOL;
    var query = `[data-i="${i}"][data-j="${j}"]`;
    var elCell = document.querySelector(query);
    elCell.innerText = cellContent;
    elCell.classList.remove('cell-hint-on');
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

    for (var iIndex = i - 1; iIndex <= i + 1; iIndex++) {
        for (var jIndex = j - 1; jIndex <= j + 1; jIndex++) {
            if (iIndex === i && jIndex === j) {
                continue;
            } else {
                numOfMinesNegs += countCell(board, iIndex, jIndex);
            }
        }
    }

    return numOfMinesNegs;
}

function countCell(board, i, j) {
    if (isValidCell(board, i, j)) {
        var cell = board[i][j];
        return cell.isMine ? 1 : 0;
    } else {
        return 0;
    }
}

function isValidCell(board, i, j) {
    var isValidRow = 0 <= i && i < board.length;
    var isValidCol = 0 <= j && j < board.length;
    var isValidCell = isValidRow && isValidCol;

    return isValidCell;
}

function setMinesRandom(board, i, j) {
    var emptySpaces = getEmptySpaces(board);
    emptySpaces = emptySpaces.filter(pos => pos.i !== i && pos.j !== j);

    for (var i = 0; i < gGameCurLevel.mines; i++) {
        var curRandEmptySpacesIndex = getRandomIntInclusive(0, emptySpaces.length - 1);
        var curRandPos = emptySpaces.splice(curRandEmptySpacesIndex, 1)[0];
        board[curRandPos.i][curRandPos.j].isMine = true;
    }

    setMinesNegsCount(board);
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

    return board;
}