'use strict'

var gGame;
var gLevels;

function checkGameOver() {

}

function createGame() {
    var game = {
        isOn: false,
        showCount: 0,
        markedCount: 0,
        secPassed: 0
    }

    return game;
}

function createLevels() {
    var levels = {
        Beginner: { size: 4, mines: 2 },
        Medium: { size: 8, mines: 12 },
        Expert: { size: 12, mines: 30 }
    }

    return levels;
}

function initGame() {
    gGame = createGame();
    gLevels = createLevels();
    gBoard = buildBoard(gLevels.Beginner);
    renderBoard(gBoard);

    console.log(gBoard);
}