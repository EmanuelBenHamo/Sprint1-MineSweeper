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

    if (!cell.isMine) {
        cell.isShown = true;
        elCell.innerText = cell.minesAroundCount;
    }
}

function isEmptyCell(board, i, j) {
    var cell = board[i][j];

    return !cell.isShown && !cell.isMine && !cell.isMarked;
}