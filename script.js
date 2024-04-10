let data = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
let x = 0;
let o = 0;

let xWins = 0;

let oWins = 0;

let draw = 0;

let gameEnded = false;

let cpuBot = false;

let winnerPopup = document.querySelector(".winner__popup");
let nextRound = document.querySelector(".winner__popup-next");

let positions = [];
const tic = document.querySelector(".tic");
function checkForWinner() {
  const lines = [
    // horizontal
    [0, 0, 0],
    [1, 1, 1],
    [2, 2, 2],
    // vertical
    [0, 0, 0],
    [1, 1, 1],
    [2, 2, 2],
    // diagonals
    [0, 1, 2],
    [2, 1, 0],
  ];

  for (let line of lines) {
    const [a, b, c] = line;

    // Проверка горизонтальных линий
    if (
      data[a][0] !== null &&
      data[a][0] === data[b][1] &&
      data[a][0] === data[c][2]
    ) {
      positions.push(a, b, c);

      return data[a][0]; // Возвращаем символ победителя
    }

    // Проверка вертикальных линий
    if (
      data[0][a] !== null &&
      data[0][a] === data[1][a] &&
      data[0][a] === data[2][a]
    ) {
      return data[0][a]; // Возвращаем символ победителя
    }
  }
  // Проверка на ничью
  if (x + o === 9) {
    draw++;
    return "draw";
  }

  return null;
}

// Создаем элемент таблицы
const table = document.createElement("table");
let turn = document.querySelector(".turn");

let winnerX = document.querySelector(".winner__x");
let winnerO = document.querySelector(".winner__o");
let drawText = document.querySelector(".draw");
let result = document.querySelector(".result");
let winnerPopupText = document.querySelector(".winner__popup-win");
let winnerPopupSubtitle = document.querySelector(".winner__popup-text");
let startPopup = document.querySelector(".tic__start");
let gameScreen = document.querySelector(".tic__tac");
let startBtns = document.querySelectorAll(".tic__player-btn button");
let startPlayer = document.querySelector(".tic__start-player");
let playerMark = "";
let xMark = document.querySelector(".win-x-res");
let oMark = document.querySelector(".win-o-res");

startBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Reset background color of all buttons
    startBtns.forEach((otherBtn) => {
      otherBtn.style.background = "initial";
    });

    playerMark = btn.getAttribute("data-mark");

    // Set background color of the clicked button to blue
    btn.style.background = "rgb(168, 191, 201)";

    let svg = btn.querySelector("svg");
    if (svg) {
      // Change fill color of each path inside the SVG
      let paths = svg.querySelectorAll("path");
      paths.forEach((path) => {
        path.setAttribute("fill", "rgb(26, 42, 51)");
      });
    }
    startBtns.forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.style.background = "initial";
        let otherSvg = otherBtn.querySelector("svg");
        if (otherSvg) {
          let otherPaths = otherSvg.querySelectorAll("path");
          otherPaths.forEach((otherPath) => {
            otherPath.setAttribute("fill", "rgb(168, 191, 201)");
          });
        }
      }
    });
  });
});

// Проходим по матрице и создаем строки и ячейки для каждого элемента
for (let i = 0; i < data.length; i++) {
  const row = document.createElement("tr"); // Создаем строку таблицы
  for (let j = 0; j < data[i].length; j++) {
    const cell = document.createElement("td"); // Создаем ячейку таблицы
    cell.textContent = data[i][j]; // Устанавливаем содержимое ячейки

    // Добавляем класс "cell" и класс "cell-i-j" для каждой ячейки
    cell.classList.add("cell");
    cell.classList.add(`cell-${i}-${j}`);

    cell.addEventListener("click", function () {
      if (!gameEnded && (data[i][j] === null || data[i][j] === "")) {
        if (o < x && cpuBot === false) {
          turn.textContent = "X TURN";
          data[i][j] = "o";

          o++;
          cell.classList.add("o");
          cell.innerHTML = `<img src="./images/icon-o.svg" />`;
        } else {
          turn.textContent = "O TURN";
          data[i][j] = "x";
          x++;
          cell.classList.add("x");
          cell.innerHTML = `<img src="./images/icon-x.svg" />`;
        }

        if (cpuBot === true) {
          cpuMove();
        }

        const winner = checkForWinner();
        if (winner) {
          gameEnded = true;
          if (winner === "draw") {
            result.textContent = "";
            drawText.textContent = `${draw}`;

            winnerPopup.style.display = "block";
            winnerPopupText.innerHTML = "ROUND TIED";
            winnerPopupSubtitle.textContent = "";
          } else {
            if (winner === "x") {
              if (cpuBot !== true) {
                winnerPopupSubtitle.textContent = "PLAYER 1 WINS!";
              } else {
                winnerPopupSubtitle.textContent = "YOU WON!";
              }

              xWins++;
              winnerX.textContent = xWins;
              winnerPopup.style.display = "block";
              winnerPopupText.innerHTML = `<img src="./images/icon-x.svg" /> <span> TAKES THE ROUND</span>`;
            }
            if (winner === "o") {
              if (cpuBot !== true) {
                winnerPopupSubtitle.textContent = "PLAYER 2 WINS!";
              } else {
                winnerPopupSubtitle.textContent = "YOU WON!";
              }
              oWins++;
              winnerO.textContent = oWins;
              winnerPopup.style.display = "block";
              winnerPopupText.innerHTML = `<img src="./images/icon-o.svg" /><span> TAKES THE ROUND</span>`;
            }
          }
        }
      }
    });

    row.appendChild(cell); // Добавляем ячейку в строку
  }
  table.appendChild(row); // Добавляем строку в таблицу
}

// Добавляем таблицу в элемент .tic
tic.appendChild(table);

let cpu = document.querySelector(".cpu");

cpu.addEventListener("click", () => {
  cpuBot = true;
  startPopup.style.display = "none";
  gameScreen.style.display = "block";
  if (playerMark === "x") {
    xMark.textContent = "X (YOU)";
  } else {
    xMark.textContent = "X (CPU)";
  }

  if (playerMark === "o") {
    oMark.textContent = "O (YOU)";
  } else {
    oMark.textContent = "O (CPU)";
  }
});

function cpuMove() {
  // Создаем массив из всех пустых ячеек

  setInterval(() => {
    if (playerMark === "x") {
      if (o < x && gameEnded === false) {
        const emptyCells = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === null) {
              emptyCells.push({ row: i, column: j });
            }
          }
        }

        // Если есть пустые ячейки, выбираем случайную и устанавливаем в нее "x"
        if (emptyCells.length > 0) {
          cpuBot = true;
          const randomIndex = Math.floor(Math.random() * emptyCells.length);
          const randomCell = emptyCells[randomIndex];

          const { row, column } = randomCell;

          data[row][column] = "o";
          const cellElement = document.querySelector(`.cell-${row}-${column}`);
          o++;
          // Устанавливаем текстовое содержимое ячейки на игровом поле
          cellElement.innerHTML = `<img src="./images/icon-o.svg" />`;
          cellElement.classList.add("o");

          const winner = checkForWinner();
          if (winner) {
            gameEnded = true;
            if (winner === "draw") {
              document.querySelector(".result").innerHTML = "Draw";
            } else {
              oWins++;
              winnerO.textContent = oWins;
              winnerPopup.style.display = "block";
              winnerPopupText.innerHTML = `<img src="./images/icon-o.svg" /><span> TAKES THE ROUND</span>`;
              winnerPopupSubtitle.textContent = "OH NO, YOU LOST…";
            }
          }
        } else {
          console.log("No empty cells available.");
        }
      }
    }

    if (playerMark === "o") {
      if (o > x && gameEnded === false) {
        const emptyCells = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === null) {
              emptyCells.push({ row: i, column: j });
            }
          }
        }

        // Если есть пустые ячейки, выбираем случайную и устанавливаем в нее "x"
        if (emptyCells.length > 0) {
          cpuBot = true;
          const randomIndex = Math.floor(Math.random() * emptyCells.length);
          const randomCell = emptyCells[randomIndex];

          const { row, column } = randomCell;

          data[row][column] = "x";
          const cellElement = document.querySelector(`.cell-${row}-${column}`);
          x++;
          // Устанавливаем текстовое содержимое ячейки на игровом поле
          cellElement.innerHTML = `<img src="./images/icon-o.svg" />`;
          cellElement.classList.add("x");

          const winner = checkForWinner();
          if (winner) {
            gameEnded = true;
            if (winner === "draw") {
              document.querySelector(".result").innerHTML = "Draw";
            } else {
              xWins++;
              winnerO.textContent = xWins;
              winnerPopup.style.display = "block";
              winnerPopupText.innerHTML = `<img src="./images/icon-o.svg" /><span> TAKES THE ROUND</span>`;
              winnerPopupSubtitle.textContent = "OH NO, YOU LOST…";
            }
          }
        } else {
          console.log("No empty cells available.");
        }
      }
    }
  }, 1000);
}
const cells = document.querySelectorAll(".cell");

cells.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    if (o < x && gameEnded === false) {
      item.classList.add("o-hovered");
    } else if (gameEnded === false) {
      item.classList.add("x-hovered");
    }
  });

  item.addEventListener("mouseout", function () {
    item.classList.remove("o-hovered", "x-hovered");
  });
});

let reset = document.querySelector(".reset");
let restartConfirm = document.querySelector(".restart__btn-yes");
let restartCancel = document.querySelector(".restart__btn-cancel");
let restartPopup = document.querySelector(".restart__popup");

restartCancel.addEventListener("click", () => {
  restartPopup.style.display = "none";
});

restartConfirm.addEventListener("click", () => {
  restartPopup.style.display = "none";
  xWins = 0;
  winnerX.textContent = xWins;
  oWins = 0;
  winnerO.textContent = oWins;
  draw = 0;
  drawText.textContent = `${draw}`;
  gameScreen.style.display = "none";
  startPopup.style.display = "flex";
  resetGame();
});

reset.addEventListener("click", () => {
  restartPopup.style.display = "block";
});

nextRound.addEventListener("click", resetGame);

function resetGame() {
  data = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("o");
    cell.classList.remove("x");
  });

  gameEnded = false;

  x = 0;
  o = 0;

  result.textContent = "";

  turn.textContent = "X TURN";

  winnerPopup.style.display = "none";
}

startPlayer.addEventListener("click", () => {
  gameScreen.style.display = "block";
  startPopup.style.display = "none";
  if (playerMark === "x") {
    xMark.textContent = "X (YOU)";
  } else {
    xMark.textContent = "X (2 PLAYER)";
  }

  if (playerMark === "o") {
    oMark.textContent = "O (YOU)";
  } else {
    oMark.textContent = "O (2 PLAYER)";
  }
});
