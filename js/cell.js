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

function disableContextMenu() {
    event.preventDefault();
}

function cellClicked(event, elCell, i, j) {
    if (gIsFirstClick) {
        gIsFirstClick = false;
        gGame.isOn = true;
        setMinesRandom(gBoard, i, j);
        gGameStartTime = Date.now();
    }

    if (event.button === 0) {
        handleLeftClick(i, j);
    } else if (event.button === 2) {
        handleRightClick(event, elCell, i, j);
    }
}

function handleLeftClick(i, j) {
    var cell = gBoard[i][j];

    if (gHintModeOn) {
        showHint(i, j);
        setTimeout(() => {
            gHintModeOn = false;
            hideHint(i, j);
        }, gHintTime);

        return;
    }

    if (cell.isMarked) {
        return;
    }

    if (cell.isMine) {
        handleGameLose();
    } else if (!cell.isShown) {
        expandShown(gBoard, i, j);
        checkGameOver();
    }
}

function handleRightClick(event, elCell, i, j) {
    event.preventDefault();
    var cell = gBoard[i][j];

    if (!cell.isShown) {
        toggleMarkCell(elCell, i, j);
    }

    checkGameOver();
}

function toggleMarkCell(elCell, i, j) {
    var cell = gBoard[i][j];

    cell.isMarked = !cell.isMarked;
    elCell.innerText = cell.isMarked ? MARK_SYMBOL : EMPTY_SYMBOL;
    gGame.markedCount = cell.isMarked ? gGame.markedCount++ : gGame.markedCount--;
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