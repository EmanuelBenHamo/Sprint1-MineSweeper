'use strict'

var LEFT_CLICK = 0;
var RIGHT_CLICK = 2;

var HAPPY_FACE = '😀';
var SAD_FACE = '☹️';
var SUNGLASSES_FACE = '😎';

var gLevels = createLevelsObj();
var gGameCurLevel = gLevels.Beginner;
var gGame;
var gIsFirstClick;
var gRemainHintsCount;
var gIsHintModeOn;
var gGameStartTime;
var gGameTimeInterval;
var gGameTimeIntervalTime = 90;

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

function displayCurTime() {
    var curTime = Date.now();
    var timeDiff = curTime - gGameStartTime;
    timeDiff /= 1000;
    var timeStr = `Game Time: ${timeDiff}`;
    var elGameTime = document.querySelector('.time-display');
    elGameTime.innerText = timeStr;
}

function handleHint(hintBtn) {
    if (gRemainHintsCount > 0 && !gIsHintModeOn) {
        gIsHintModeOn = true;
        gRemainHintsCount--;
        disableHintBtn(hintBtn);
        toggleHighlightUnRevealedCells(gIsHintModeOn);
    }
}

function disableHintBtn(hintBtn) {
    hintBtn.disabled = true;
    //TODO: add css class that show that it is disabled

}

function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var curCell = gBoard[i][j];
            if (curCell.isMine && !curCell.isMarked) {
                return;
            }
            if (!curCell.isMine && curCell.isMarked) {
                return;
            }
            if (!curCell.isMine && !curCell.isShown) {
                return;
            }
        }
    }

    handleGameWin();
}

function handleGameWin() {
    gGame.isOn = false;
    var elStartOverBtn = document.querySelector('.start-over-btn');
    elStartOverBtn.innerText = SUNGLASSES_FACE;
    clearInterval(gGameTimeInterval);
}

function handleGameLose() {
    gGame.isOn = false;
    showAllMines(gBoard);
    var elStartOverBtn = document.querySelector('.start-over-btn');
    elStartOverBtn.innerText = SAD_FACE;
    clearInterval(gGameTimeInterval);
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

function enableHintBtns() {
    gRemainHintsCount = 3;
    var hintBtnsElments = document.querySelectorAll('.hint-btn');

    for (var i = 0; i < hintBtnsElments.length; i++) {
        hintBtnsElments[i].disabled = false;
    }
}

function resetTimeDisplay() {
    var elGameTime = document.querySelector('.time-display');
    elGameTime.innerHTML = 'Game Time: 00:00';
}

function resetSmileyBtn() {
    var elStartOverBtn = document.querySelector('.start-over-btn');
    elStartOverBtn.innerText = HAPPY_FACE;
}

function initGame() {
    clearInterval(gGameTimeInterval);
    enableHintBtns();
    resetTimeDisplay();
    resetSmileyBtn();
    gIsHintModeOn = false;
    gIsFirstClick = true;
    gGame = createGameObj();
    gBoard = buildBoard(gGameCurLevel);
    renderBoard(gBoard);
}