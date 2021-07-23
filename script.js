let score = 0;
let level = 1;
let time = 10; //thời gian hiện tại
let fullTime = 10; //thời gian mỗi phép toán
let widthTime = 0; //thanh thời gian

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomOperator() {
  let operators = ["+", "-", "*", "/"];
  let ran = Math.floor(Math.random() * operators.length);
  return operators[ran];
}

function generateCalculation() {
  let num1 = getRandomNumber(1 * level, 5 * level);
  let num2 = getRandomNumber(1 * level, 5 * level);
  let op = getRandomOperator();
  let cal = num1 + " " + op + " " + num2;
  if (level >= 20) {
    cal = num1 + " " + op + " " + num2 + getRandomOperator() + " " + getRandomNumber(2, 8);
  }
  if (level >= 40) {
    cal = num1 + " " + op + " " + num2 + getRandomOperator() + " " + getRandomNumber(2, 8) + getRandomOperator() + " " + getRandomNumber(2, 8);
  }
  if (level >= 60) {
    cal = num1 + " " + op + " " + num2 + getRandomOperator() + " " + getRandomNumber(2, 8) + getRandomOperator() + " " + getRandomNumber(2, 8) + getRandomOperator() + " " + getRandomNumber(2, 8);
  }
  document.getElementById("calculation").innerHTML = cal;
  document.getElementById("result").innerHTML = getRandomResult(cal);
}

function getRandomResult() {
  let randomResult = Math.random() >= 0.5; //50:50
  return randomResult ? getTrueResult() : getFalseResult();
}

function getTrueResult() {
  let cal = document.getElementById("calculation").innerHTML;
  return eval(cal);
}

function getFalseResult() {
  let falseResult = getRandomNumber(getTrueResult() - 10, getTrueResult() + 10); //lấy sai số = +- 10 đơn vị
  return falseResult === getTrueResult() ? getFalseResult() : falseResult;
}

function check(btn) {
  let result = +document.getElementById("result").innerHTML;
  let check = false;
  switch (btn) {
    case "true":
      if (result == getTrueResult()) check = true;
      break;
    case "false":
      if (result !== getTrueResult()) check = true;
      break;
  }
  check ? nextLevel() : gameOver();
}

function nextLevel() {
  score += level;
  level++;
  time = fullTime;
  document.getElementById("score").innerHTML = "Score: " + score;
  document.getElementById("level").innerHTML = "Level: " + level;
  document.getElementById("correct").currentTime = 0;
  document.getElementById("correct").play();
  generateCalculation();
}

function gameOver() {
  document.getElementById("true").style.display = "none";
  document.getElementById("false").style.display = "none";
  document.getElementById("wrong").play();
  alert("Game Over. Your score is " + score + ".");
  location.reload();
}

function countDown() {
  let timeDiv = document.getElementById("time");
  let run = setInterval(function () {
    time -= 0.1;
    timeDiv.style.width = (widthTime * time) / fullTime + "px";
    if (time <= 0) {
      clearInterval(run);
      gameOver();
    }
  }, 100);
}

function startGame() {
  time = fullTime;
  widthTime = document.getElementById("time").offsetWidth;
  document.getElementById("score").innerHTML = "Score: " + score;
  document.getElementById("level").innerHTML = "Level: " + level;
  generateCalculation();
}
function displayGame() {
  let m = document.getElementById("main");
  m.style.display = "block";
  countDown();
  startGame();
}
function replayGame() {
  let n = document.getElementById("main");
  n.style.display = "block";
  countDown();
  startGame();
}
