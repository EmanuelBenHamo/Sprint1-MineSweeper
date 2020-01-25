'use strict'

var LEFT_CLICK = 0;
var RIGHT_CLICK = 2;

var HAPPY_FACE = '😀';
var SAD_FACE = '☹️';
var SUNGLASSES_FACE = '😎';

var LIFE_SYMBOL = '❤️';
var HINT_SIMBOL = '💡';
var SAFE_CLICK_SYMBOL = '🛡️';

var gLevels = createLevelsObj();
var gGameCurLevel = gLevels.Beginner;
var gGame;
var gIsFirstClick;
var gRemainHintsCount;
var gIsHintModeOn;
var gGameStartTime;
var gGameTimeInterval;
var gGameTimeIntervalTime = 1000;

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
    var milliseconds = curTime - gGameStartTime;
    var seconds = Math.floor(milliseconds / 1000);
    var minutes = '00';
    var elSeconds = document.querySelector('.time-display-seconds');
    var elMinutes = document.querySelector('.time-display-minutes');

    gGame.secPassed = seconds;
    minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    var secondsStr = seconds.toString();
    var minutesStr = minutes.toString();

    minutesStr = minutes < 10 ? '0' + minutesStr : minutesStr;
    minutesStr += ':';
    secondsStr = seconds < 10 ? '0' + secondsStr : secondsStr;

    elSeconds.innerText = secondsStr;
    elMinutes.innerText = minutesStr;
}

function handleHint(hintBtn) {
    if (!gGame.isOn && !gIsFirstClick) {
        return;
    }

    if (gRemainHintsCount > 0 && !gIsHintModeOn) {
        gIsHintModeOn = true;
        gRemainHintsCount--;
        showNumOfHints();
        if (gRemainHintsCount === 0) {
            disableHintBtn(hintBtn);
        }
        toggleHighlightUnRevealedCells(gIsHintModeOn);
    }
}

function showNumOfHints() {
    var elHints = document.querySelector('.hints');
    var hintsStr = '';

    for (var i = 0; i < gRemainHintsCount; i++) {
        hintsStr += HINT_SIMBOL;
    }

    elHints.innerText = hintsStr;
}

function disableHintBtn(hintBtn) {
    hintBtn.disabled = true;
    hintBtn.style.opacity = 0;
    setTimeout(() => {
        hintBtn.style.display = 'none';
    }, 1000);
}

function enableHintBtn() {
    var elHintBtn = document.querySelector('.hint-btn');
    
    elHintBtn.disabled = false;
    elHintBtn.style.opacity = 1;
    elHintBtn.style.display = '';
    
    gRemainHintsCount = 3;
    showNumOfHints();
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

function handleMineClicked(i, j) {
    if (gGame.livesCount === 0) {
        handleGameLose();
    } else {
        gGame.livesCount--;
        showNumOfLives(gGame.livesCount);
        showCell(gBoard, i, j);
        setTimeout(() => {
            hideMineCell(gBoard, i, j);
        }, gHintTime);
    }
}

function createGameObj() {
    var game = {
        isOn: false,
        showCount: 0,
        markedCount: 0,
        secPassed: 0,
        livesCount: 3
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

function resetTimeDisplay() {
    var elSeconds = document.querySelector('.time-display-seconds');
    var elMinutes = document.querySelector('.time-display-minutes');

    elMinutes.innerText = '00:';
    elSeconds.innerText = '00';
}

function resetSmileyBtn() {
    var elStartOverBtn = document.querySelector('.start-over-btn');
    elStartOverBtn.innerText = HAPPY_FACE;
}

function showNumOfLives() {
    var elLives = document.querySelector('.lives');
    var livesStr = '';

    for (var i = 0; i < gGame.livesCount; i++) {
        livesStr += LIFE_SYMBOL;
    }

    elLives.innerText = livesStr;
}

function initGame() {
    gGame = createGameObj();
    gIsHintModeOn = false;
    gIsFirstClick = true;
    clearInterval(gGameTimeInterval);
    resetTimeDisplay();
    resetSmileyBtn();
    enableHintBtn();
    showNumOfLives();
    gBoard = buildBoard(gGameCurLevel);
    renderBoard(gBoard);
}