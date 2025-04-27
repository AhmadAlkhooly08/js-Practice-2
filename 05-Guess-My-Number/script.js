"use strict";
// document.querySelector(".message").textContent = "🎉 Correct number";
// document.querySelector(".number").textContent = 13;
// document.querySelector(".score").textContent = 10;
// document.querySelector(".guess").value = 7;
// console.log((document.querySelector(".guess").value = 7));
let secret = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
const displayMessage = function (mesage) {
  document.querySelector(".message").textContent = mesage;
};
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value); // evrething comes from the user inter face is a string
  // document.querySelector(".number").textContent = guess;
  // document.querySelector(".message").textContent = "🚫 Not Number";
  console.log(guess, typeof guess);
  if (!guess) {
    displayMessage("🚫 Not Number");
  } else if (guess === secret) {
    displayMessage("🎉 Correct number");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = secret;
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  } else if (guess !== secret) {
    if (score > 1) {
      displayMessage(guess > secret ? "📈 too high!" : "📉 Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      // document.querySelector(".message").textContent = "💥 You lost the game";
      displayMessage("💥 You lost the game");
      document.querySelector(".score").textContent = 0;
    }
  }
  //  else if (guess > secret) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "📈 too high!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "💥 You lost the game";
  //     document.querySelector(".score").textContent = 0;
  //   }
  // } else if (guess < secret) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = ;
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "💥 You lost the game";
  //     document.querySelector(".score").textContent = 0;
  //   }
  // }
});
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secret = Math.trunc(Math.random() * 20) + 1;
  // document.querySelector(".message").textContent = "Start guessing...";
  displayMessage("Start guessing...");
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = " ";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
