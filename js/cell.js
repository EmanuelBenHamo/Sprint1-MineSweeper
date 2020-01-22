'use strict'

function createCell(minesArountCount = 0, isShown = true, isMine = false, isMarked = false) {
    var cell = {
        minesArountCount: minesArountCount,
        isShown: isShown,
        isMine: isMine,
        isMarked: isMarked
    }

    return cell;
}

function cellMarked(elCell) {

}

function cellClicked(elCell, i, j) {

}