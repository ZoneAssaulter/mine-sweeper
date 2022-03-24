'use strict';

const MINE = '💣';
const FLAG = '🚩';
const SMILEY = '🙂';
const BOOM = '🤯';
const OH = '😯';
const DEAD = '😵';
const WIN = '😎';

var gIsGameOn = false;
var gBoard;
var gBoardSize = [8, 8];
var gMineCount = 12;
var gLives = 3;
var gMarkedCount = 0;
var gScore = 0;

function init() {
  gIsGameOn = true;
  gLives = 3;
  document.querySelector('.smiley').innerText = SMILEY; // function normalSmiley() isnt working but this does i dont know why O.o
  var startingSound = document.querySelector('.vulture-bring-it-on')
  startingSound.play()
  gBoard = buildBoard(gBoardSize);
  console.table(gBoard);
  renderBoard(gBoard);
}

function buildBoard(size) {
  //step1: make empty board ✅
  //step2: fill board with randomly placed mines✅
  //step3: determine cell values according to mine placement✅
  //step4: render board✅
  var board = [];
  for (var i = 0; i < size[0]; i++) {
    board[i] = [];
    for (var j = 0; j < size[1]; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
    }
  }
  mineSpawner(board);
  assignMineCount(board);
  return board;
}

function mineSpawner(board) {
  for (var i = 0; i < gMineCount; i++) {
    board[getRandomIntInclusive(0, gBoardSize[0] - 1)][
      getRandomIntInclusive(0, gBoardSize[1] - 1)
    ].isMine = true;
  }
}

function assignMineCount(board) {
  for (var i = 0; i < gBoardSize[0]; i++) {
    for (var j = 0; j < gBoardSize[1]; j++) {
      if (board[i][j].isMine === false) {
        board[i][j].minesAroundCount = countNeighbors(i, j, board);
      }
    }
  }
  return board;
}

function renderBoard(board) {
  var strHTML = '';
  var elCellHTML = document.querySelector('.board-container');
  for (var i = 0; i < board.length; i++) {
    strHTML += `<tr>\n`;
    for (var j = 0; j < board[i].length; j++) {
      if (gBoard[i][j].isMine === true) {
        strHTML += `\t<td class="cell cell${i}-${j}" onclick="clickCell(this, {i:${i}, j:${j}})" onmousedown="markMine(event,{i:${i}, j:${j}}, this)"><span>${MINE}</span></td>`;
      } else {
        strHTML += `\t<td class="cell cell${i}-${j}" onclick="clickCell(this, {i:${i}, j:${j}})" onmousedown="markMine(event,{i:${i}, j:${j}}, this)"><span>${gBoard[i][j].minesAroundCount}</span></td>`;
      }
    }
    strHTML += `</tr>\n`;
  }
  elCellHTML.innerHTML = strHTML;
}

function clickCell(elCell, location) {
  if (gIsGameOn === false) return;
  if (gBoard[location.i][location.j].isShown) return;
  if (gBoard[location.i][location.j].isMarked) return;
  console.log(gBoard[location.i][location.j].minesAroundCount);
  console.log(location);
  var elBoard = document.querySelector('.board-container');

  if (gBoard[location.i][location.j].isMine) {
    if (gLives > 1) {
      gLives--;
      elCell.id = 'shown';
      gMarkedCount++;
      console.log(gMarkedCount);
      gBoard[location.i][location.j].isShown = true;
      console.log(`lives: ${gLives}`);
      boomSmiley();
      playMineHitSound()
    } else {
      elCell.id = 'shown';
      gBoard[location.i][location.j].isShown = true;

      gameOver();
    }
  } else if (gBoard[location.i][location.j].minesAroundCount !== 0) {
    elCell.id = 'shown';
    gBoard[location.i][location.j].isShown = true;
    elBoard.addEventListener('mousedown', smileyMouseClick());
    // console.log(elCell);
    gScore += gBoard[location.i][location.j].minesAroundCount;
    updateScore();
  } else if (gBoard[location.i][location.j].minesAroundCount === 0) {
    elBoard.addEventListener('mousedown', smileyMouseClick());
    expandShown(gBoard, elCell, location);
  }
}

function expandShown(board, elCell, location) {
  for (var i = location.i - 1; i < location.i + 2; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = location.j - 1; j < location.j + 2; j++) {
      if (j < 0 || j >= board[i].length) continue;
      var elCell = document.querySelector(`.cell${i}-${j}`);
      elCell.id = 'shown';
      board[i][j].isShown = true;
    }
  }
}

function markMine(event, location, elCell) {
  if (!gIsGameOn) return;
  if (event.which === 3) {
    var clickedCell = gBoard[location.i][location.j];
    var cellValue;
    if (gBoard[location.i][location.j].isShown) return;
    if (!gBoard[location.i][location.j].isMarked) {
      gBoard[location.i][location.j].isMarked = true;
      renderCell(location, FLAG);
      gMarkedCount++;
      console.log(gMarkedCount);
      elCell.id = 'flagged';
    } else {
      gBoard[location.i][location.j].isMarked = false;
      if (clickedCell.isMine) {
        cellValue = `<span>${MINE}</span>`;
      } else {
        cellValue = `<span>${clickedCell.minesAroundCount}</span>`;
      }
      renderCell(location, cellValue);
      gMarkedCount--;
      console.log(gMarkedCount);
      elCell.removeAttribute('id');
    }
  }
  if (gMarkedCount === gMineCount) victory();
}

function gameOver() {
  gIsGameOn = false;
  gameOverSmiley();
  console.log('Game over');
}

function victory() {
  gIsGameOn = false;
  victorySmiley();
}

function updateScore() {
  var elScore = document.querySelector('.score');
  elScore.innerText = `Score: ${gScore}`;
}
