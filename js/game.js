'use strict'

var gGame;
var gLevels;
var gGameCurLevel;

function checkGameOver() {

}

function handleGameOver(){
    showAllMines(gBoard);
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
    gLevels = createLevelsObj();
    gGameCurLevel = gLevels.Beginner;
    createGame(gGameCurLevel);
}

function createGame(level) {
    gGame = createGameObj();
    gBoard = buildBoard(gGameCurLevel);
    setMinesNegsCount(gBoard);
    renderBoard(gBoard);
}