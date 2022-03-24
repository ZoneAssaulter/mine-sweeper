'use strict';

function shuffle(mat) {
  for (var k = 0; k < mat.length; k++) {
    var i = mat[k].length;
    if (i == 0) return false;
    else {
      while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempi = mat[k][i];
        var tempj = mat[k][j];
        mat[k][i] = tempj;
        mat[k][j] = tempi;
      }
    }
  }
  return mat;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function countNeighbors(cellI, cellJ, mat) {
  var neighborsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= mat[i].length) continue;

      if (mat[i][j].isMine === true) neighborsCount++;
    }
  }
  //   console.log(`mat [${i}][${j}]=${neighborsCount}`);
  return neighborsCount;
}

function renderCell(location, value) {
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function playMineHitSound() {
  var mineMoveSound = document.querySelector('.mine-move');
  var mineHitSound = document.querySelector('.mine-hit');
  var mineMoveCount = 0;
  var mineMoveInterval = setInterval(() => {
    mineMoveCount++;
    mineMoveSound.play();
    if (mineMoveCount === 3) {
      clearInterval(mineMoveInterval);
      mineHitSound.play();
    }
  }, 65);
}

