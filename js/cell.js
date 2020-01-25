'use strict'

function createCell(minesAroundCount = 0, isShown = false, isMine = false, isMarked = false) {
    var cell = {
        minesAroundCount: minesAroundCount,
        isShown: isShown,
        isMine: isMine,
        isMarked: isMarked,
        isHint: false
    }

    return cell;
}

function disableContextMenu() {
    event.preventDefault();
}

function cellClicked(event, elCell, i, j) {
    if (gIsFirstClick) {
        handleFirstClick(i, j);
    }

    if (!gGame.isOn) {
        return;
    }

    if (event.button === LEFT_CLICK) {
        handleLeftClick(i, j);
    } else if (event.button === RIGHT_CLICK) {
        handleRightClick(event, elCell, i, j);
    }
}

function handleFirstClick(i, j) {
    gIsFirstClick = false;
    gGame.isOn = true;
    setMinesRandom(gBoard, i, j);
    gGameStartTime = Date.now();
    gGameTimeInterval = setInterval(() => {
        displayCurTime();
    }, gGameTimeIntervalTime);
}

function handleLeftClick(i, j) {
    var cell = gBoard[i][j];

    if (cell.isMarked || cell.isShown) {
        return;
    }

    if (gIsHintModeOn) {
        displayHint(i, j);
        return;
    }

    if (cell.isMine) {
        handleMineClicked(i, j);
    } else {
        expandShown(gBoard, i, j);
        checkGameOver();
    }
}

function displayHint(i, j) {
    toggleHighlightUnRevealedCells(!gIsHintModeOn);
    showHint(i, j);
    setTimeout(() => {
        gIsHintModeOn = false;
        hideHint(i, j);
    }, gHintTime);

    return;
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
                curElCell.classList.add('cell-shown');
            }
        }
    }

}

function isEmptyCell(board, i, j) {
    var cell = board[i][j];

    return !cell.isShown && !cell.isMine && !cell.isMarked;
}