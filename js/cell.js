'use strict'

function createCell(minesAroundCount = 0, isShown = false, isMine = false, isMarked = false) {
    var cell = {
        minesAroundCount: minesAroundCount,
        isShown: isShown,
        isMine: isMine,
        isMarked: isMarked
    }

    return cell;
}

function cellMarked(elCell) {

}

function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];

    if (cell.isMine) {
        handleGameOver();
    } else {
        cell.isShown = true;
        elCell.innerText = cell.minesAroundCount;
    }
}

function showAllMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var curCell = board[i][j];
            if (curCell.isMine && !curCell.isMarked) {
                curCell.isShown = true;
                var curQuery = `[data-i="${i}"][data-j="${j}"]`;
                var curElCell = document.querySelector(curQuery);
                curElCell.innerText = MINE_SYMBOL;
            }
        }
    }

}

function isEmptyCell(board, i, j) {
    var cell = board[i][j];

    return !cell.isShown && !cell.isMine && !cell.isMarked;
}