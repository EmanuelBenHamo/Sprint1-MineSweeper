'use strict'

var gLevels = createLevelsObj();
var gGameCurLevel = gLevels.Beginner;
var gGame;
var gIsFirstClick;
var gRemainHintsCount;
var gHintModeOn;

function applyLevel(levelBtn) {
    var level = levelBtn.innerText;

    switch (level) {
        case 'Beginner':
            gGameCurLevel = gLevels.Beginner;
            break;
        case 'Medium':
            gGameCurLevel = gLevels.Medium;
            break;
        case 'Expert':
            gGameCurLevel = gLevels.Expert;
            break;
    }

    initGame();
}

function handleHint(hintBtn) {
    // todo: check if still remain hints, and update ui according to the number of remained hints
    if (gRemainHintsCount > 0) {
        gHintModeOn = true;
        gRemainHintsCount--;
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
    gRemainHintsCount = 3;
    gIsFirstClick = true;
    gGame = createGameObj();
    gBoard = buildBoard(gGameCurLevel);
    renderBoard(gBoard);
}