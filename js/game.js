'use strict'

var gGame;
var gLevels;
var gGameCurLevel;
var gIsFirstClick = true;
var gHintsCount = 3;
var gHintModeOn = false;

function applyLevel(levelBtn) {

}

function handleHint(hintBtn) {
    // todo: check if still remain hints, and update ui according to the number of remained hints
    if (gHintsCount > 0) {
        gHintModeOn = true;
        gHintsCount--;
    }
}

function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var curCell = gBoard[i][j];
            if (curCell.isMine && !curCell.isMarked) {
                return false;
            }
            if (!curCell.isMine && curCell.isMarked) {
                return false;
            }
            if (!curCell.isMine && !curCell.isShown) {
                return false;
            }
        }
    }

    return true;
}

function handleGameWin() {
    alert('win');
}

function handleGameLose() {
    showAllMines(gBoard);
    alert('lose');
}

function createGameObj() {
    var game = {
        isOn: false,
        showCount: 0,
        markedCount: 0,
        secPassed: 0
    }

    return game;
}

function createLevelsObj() {
    var levels = {
        Beginner: { size: 4, mines: 2 },
        Medium: { size: 8, mines: 12 },
        Expert: { size: 12, mines: 30 }
    }

    return levels;
}

function initGame() {
    gHintModeOn = false;
    gHintsCount = 3;
    gIsFirstClick = true;
    gLevels = createLevelsObj();
    gGameCurLevel = gLevels.Beginner;
    createGame(gGameCurLevel);
}

function createGame(level) {
    gGame = createGameObj();
    gBoard = buildBoard(gGameCurLevel);
    renderBoard(gBoard);
}