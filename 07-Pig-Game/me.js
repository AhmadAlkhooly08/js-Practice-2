"use strict";
// defiding varibals
const player0 = document.querySelector('.player-0')
const player1 = document.querySelector('.player-1')
const score0 = document.querySelector('.score-0')
const score1 = document.querySelector('.score-1')
const current0 = document.querySelector('.current-0')
const current1 = document.querySelector('.current-1')
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.new')
const btnRoll = document.querySelector('.Roll')
const btnHold = document.querySelector('.Hold')
// starting with addEventlistener
let currentScore = 0;
let activePlayer = 0;
let scores = [0,0]
const switchPlayer = function(){
    document.querySelector(`.current-${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle('player-active')
    player1.classList.toggle('player-active')
}
btnRoll.addEventListener('click',function(){
    let dice = Math.trunc(Math.random()*6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden')
    currentScore += dice;
    if(dice != 1){
        document.querySelector(`.current-${activePlayer}`).textContent=currentScore;
    }else{
        switchPlayer();
    }

}) 
btnHold.addEventListener('click',function(){
    scores[activePlayer] += currentScore;
    document.querySelector(`.score-${activePlayer}`).textContent = scores[activePlayer];    
    if(scores[activePlayer] >= 20){
        document.querySelector(`.score-${activePlayer}`).textContent = 'Winner 🎉';     
        document.querySelector(`.player-${activePlayer}`).classList.add('player--winner')
        btnRoll.disabled = true;
        btnHold.disabled = true;
        currentScore = 0;
        document.querySelector(`.current-${activePlayer}`).textContent= 0;
    }else{
        switchPlayer();
    }
});
btnNew.addEventListener('click',function(){
    currentScore = 0;
    scores[0] = 0;
    scores[1] = 0;
    activePlayer = 0;
    btnRoll.disabled = false;
    btnHold.disabled = false;
    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    player0.classList.add('player-active')
    player1.classList.remove('player-active')
    player0.classList.remove('player--winner')
    player1.classList.remove('player--winner')
   diceEl.classList.add('hidden')
})