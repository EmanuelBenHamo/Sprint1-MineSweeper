'use strict'

var gBoard;

function expandShown(board, elCell, i, j) {

}

function renderBoard(board) {
    var htmlStr = '';

    for (var i = 0; i < board.length; i++) {
        htmlStr += '<tr>'
        for (var j = 0; j < board.length; j++) {
            var curCell = board[i][j];
            var curCellContent = curCell.isMine ? '*' : curCell.minesAroundCount;
            htmlStr += `<td class="cell" data-i=${i} data-j=${j} data-numOfMinesNegs=${curCell.minesAroundCount} onclick=cellClicked()>${curCellContent}</td>`;
        }

        htmlStr += '</tr>';
    }

    var elTableBody = document.querySelector('.board-table-body');
    elTableBody.innerHTML = htmlStr;
    console.log(board);
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            board[i][j].minesAroundCount = countMinesNegs(board, i, j);
        }
    }
}

function countMinesNegs(board, i, j) {
    var numOfMinesNegs = 0;

    numOfMinesNegs += countCell(board, i - 1, j - 1);
    numOfMinesNegs += countCell(board, i - 1, j);
    numOfMinesNegs += countCell(board, i - 1, j + 1);
    numOfMinesNegs += countCell(board, i, j - 1);
    numOfMinesNegs += countCell(board, i, j + 1);
    numOfMinesNegs += countCell(board, i + 1, j - 1);
    numOfMinesNegs += countCell(board, i + 1, j);
    numOfMinesNegs += countCell(board, i + 1, j + 1);

    return numOfMinesNegs;
}

function countCell(board, i, j) {
    var isValidRow = 0 <= i && i < board.length;
    var isValidCol = 0 <= j && j < board.length;
    var isValidCell = isValidRow && isValidCol;

    if (isValidCell) {
        var cell = board[i][j];
        return cell.isMine ? 1 : 0;
    } else {
        return 0;
    }
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


