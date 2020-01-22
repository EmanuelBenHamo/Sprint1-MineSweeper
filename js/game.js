'use strict'

var gGame;
var gLevels;
var gGameCurLevel;
var gIsFirstClick = true;

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