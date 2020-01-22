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

function disableContextMenu() {
    event.preventDefault();
}

function cellClicked(event, elCell, i, j) {
    if (gIsFirstClick) {
        gIsFirstClick = false;
        setMinesRandom(gBoard, i, j);
    }

    if (event.button === 0) {
        handleLeftClick(elCell, i, j);
    } else if (event.button === 2) {
        handleRightClick(event, elCell, i, j);
    }
}

function handleLeftClick(elCell, i, j) {
    var cell = gBoard[i][j];

    if (cell.isMarked) {
        return;
    }

    if (cell.isMine) {
        handleGameLose();
    } else if (!cell.isShown) {
        expandShown(gBoard, i, j);
        if (checkGameOver()) {
            handleGameWin();
        }
    }
}



function handleRightClick(event, elCell, i, j) {
    event.preventDefault();
    var cell = gBoard[i][j];

    if (!cell.isShown) {
        toggleMarkCell(elCell, i, j);
    }

    if (checkGameOver()) {
        handleGameWin();
    }
}

function toggleMarkCell(elCell, i, j) {
    var cell = gBoard[i][j];

    cell.isMarked = !cell.isMarked;
    elCell.innerText = cell.isMarked ? MARK_SYMBOL : EMPTY_SYMBOL;
}

function showAllMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var curCell = board[i][j];
            if (curCell.isMine) {
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