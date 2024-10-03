let button = document.createElement("button");

let safe = "x";
let sostyanie = true;
let wordElement = document.getElementById("word");
button.id = "restartButton";
button.textContent = "Заново";
wordElement.before(button);

let scoreBoard = document.createElement("div");
let playerXScoreElement = document.createElement("p");
let playerOScoreElement = document.createElement("p");
scoreBoard.id = "scoreBoard";
playerOScoreElement.id = "playerOScore";
scoreBoard.appendChild(playerXScoreElement);
scoreBoard.appendChild(playerOScoreElement);
wordElement.before(scoreBoard);

function updateScoreBoard() {
  let playerXWins = localStorage.getItem("x_wins") || 0;
  let playerOWins = localStorage.getItem("о_wins") || 0;
  playerXScoreElement.innerText = `Игрок Х: ${playerXWins}`;
  playerOScoreElement.innerText = `Игрок O: ${playerOWins}`;
}

let newP = document.createElement("p");
newP.id = "newP";
wordElement.after(newP);
newP.textContent = "Игрок х, ходи первым";

updateScoreBoard();

button.addEventListener("click", function () {
  for (let element of document.querySelectorAll(".devochki")) {
    element.textContent = "";
  }
  safe = "x";
  sostyanie = true;
  newP.textContent = "Игрок х ходи первым";
});

function dives() {
  for (let i = 0; i < 9; i++) {
    let divElement = document.createElement("div");
    wordElement.append(divElement);
    divElement.className = "devochki";
    divElement.id = i;
  }
}
dives();

word.addEventListener("click", function (event) {
  if (event.target.classList.contains("devochki")) {
    krest(event.target);
  }
});

//функция принимает ячейку и заменяет содержимое на крестик, потом вызвать между алерта, создать снаружи обработчика

function krest(element) {
  if (element.innerHTML == "" && sostyanie == true) {
    element.innerHTML = safe;

    let draw = proverka();
    if (draw) {
      setTimeout(() => alert("Ничья"), 50);
      sostyanie = false;
      newP.textContent = `Ничья`;
      return;
    }
    let pobeda = checkWin();
    if (pobeda != null) {
      setTimeout(() => alert(`Победитель - ${pobeda}`), 50);
      sostyanie = false;
      newP.textContent = `Игрок ${safe}, победитель`;
      return;
    }

    change();

    newP.textContent = `Игрок ${safe}, твой ход`;
  }
}

function change() {
  if (safe == "x") {
    safe = "o";
  } else {
    safe = "x";
  }
}

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

function checkWin() {
  for (let comb of winCombos) {
    let comb1 = document.getElementById(comb[0]);
    let comb2 = document.getElementById(comb[1]);
    let comb3 = document.getElementById(comb[2]);

    if (
      comb1.textContent != "" &&
      comb1.textContent == comb2.textContent &&
      comb1.textContent == comb3.textContent
    ) {
      const winner = comb1.textContent;
      let winCount = localStorage.getItem(`${winner}_wins`) || 0;
      localStorage.setItem(`${winner}_wins`, +winCount + 1);
      updateScoreBoard();
      return winner;
    }
  }
  return null;
}

function proverka() {
  for (let element of document.querySelectorAll(".devochki")) {
    if (element.textContent == "") {
      return false;
    }
  }
  return true;
}

//Создание кнопки заново
