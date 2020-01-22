'use strict'

var gBoard;

function expandShown(board, elCell, i, j) {

}

function renderBoard(board) {
    var htmlStr = '';

    for (var i = 0; i < board.length; i++) {
        htmlStr += '<tr>'
        for (var j = 0; j < board.length; j++) {
            htmlStr += `<td class="cell" data-i=${i} data-j=${j} onclick=cellClicked()></td>`;
        }

        htmlStr += '</tr>';
    }

    var elTableBody = document.querySelector('.board-table-body');
    elTableBody.innerHTML = htmlStr;
}

function setMinesNegsCount(board) {

}

function buildBoard(level) {
    var board = [];

    for (var i = 0; i < level.size; i++) {
        board[i] = [];
        for (var j = 0; j < level.size; j++) {
            board[i][j] = createCell();
        }
    }

    board[0][0].isMine = true;
    board[0][1].isMine = true;

    return board;
}


