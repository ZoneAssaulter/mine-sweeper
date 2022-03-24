'use strict';
var gElSmiley = document.querySelector('.smiley');

function smileyMouseClick() {
  gElSmiley.innerText = OH;
  setTimeout(() => {
    gElSmiley.innerText = SMILEY;
  }, 400);
}


function boomSmiley() {
  gElSmiley.innerText = BOOM;
  setTimeout(() => {
    gElSmiley.innerText = SMILEY;
  }, 800);
}


function gameOverSmiley(){
    gElSmiley.innerText = DEAD
}

function normalSmiley(){
    gElSmiley.innnerText = SMILEY
}

function victorySmiley(){
    gElSmiley.innerText = WIN
}