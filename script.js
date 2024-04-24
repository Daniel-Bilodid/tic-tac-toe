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
let playerMark = "o";

let secondPlayerMark = "";
let xMark = document.querySelector(".win-x-res");
let oMark = document.querySelector(".win-o-res");

startBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Reset background color of all buttons
    startBtns.forEach((otherBtn) => {
      otherBtn.style.background = "initial";
    });

    playerMark = btn.getAttribute("data-mark");

    if (playerMark === "x") {
      secondPlayerMark = "o";
    }
    if (playerMark === "o") {
      secondPlayerMark = "x";
    }

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
        } else if (cpuBot === false) {
          turn.textContent = "O TURN";
          data[i][j] = "x";
          x++;
          cell.classList.add("x");
          cell.innerHTML = `<img src="./images/icon-x.svg" />`;
        } else if (playerMark === "x") {
          turn.textContent = "O TURN";
          data[i][j] = "x";
          x++;
          cell.classList.add("x");
          cell.innerHTML = `<img src="./images/icon-x.svg" />`;
        } else if (playerMark === "o") {
          turn.textContent = "X TURN";
          data[i][j] = "o";

          o++;
          cell.classList.add("o");
          cell.innerHTML = `<img src="./images/icon-o.svg" />`;
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
            document.styleSheets[0].addRule("body::after", "display: block");
            winnerPopupText.innerHTML = "ROUND TIED";
            winnerPopupText.classList.remove("winner__popup-x");
            winnerPopupText.classList.remove("winner__popup-o");
            winnerPopupText.classList.add("tie");
            winnerPopupSubtitle.textContent = "";
          } else {
            if (winner === "x") {
              if (cpuBot !== true) {
                if (playerMark === "x") {
                  winnerPopupSubtitle.textContent = "PLAYER 1 WINS!";
                } else {
                  winnerPopupSubtitle.textContent = "PLAYER 2 WINS!";
                }
              } else {
                winnerPopupSubtitle.textContent = "YOU WON!";
                winnerPopupText.classList.add("winner__popup-x");
                winnerPopupText.classList.remove("winner__popup-o");
              }

              xWins++;
              winnerX.textContent = xWins;
              winnerPopup.style.display = "block";
              winnerPopupText.classList.add("winner__popup-x");
              winnerPopupText.classList.remove("winner__popup-o");
              winnerPopupText.innerHTML = `<img src="./images/icon-x.svg" /> <span> TAKES THE ROUND</span>`;
              document.styleSheets[0].addRule("body::after", "display: block");
            }
            if (winner === "o") {
              if (cpuBot !== true) {
                if (playerMark === "o") {
                  winnerPopupSubtitle.textContent = "PLAYER 1 WINS!";
                } else {
                  winnerPopupSubtitle.textContent = "PLAYER 2 WINS!";
                }
              } else {
                winnerPopupSubtitle.textContent = "YOU WON!";
                winnerPopupText.classList.add("winner__popup-x");
                winnerPopupText.classList.remove("winner__popup-o");
                document.styleSheets[0].addRule(
                  "body::after",
                  "display: block"
                );
              }
              oWins++;
              winnerO.textContent = oWins;
              winnerPopup.style.display = "block";
              document.styleSheets[0].addRule("body::after", "display: block");
              winnerPopupText.classList.add("winner__popup-o");
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
  cpuMove();
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
    if (playerMark === "x" && cpuBot === true) {
      if (o < x && gameEnded === false) {
        const emptyCells = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === null) {
              emptyCells.push({ row: i, column: j });
            }
          }
        }

        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].length; j++) {
            // Проверка горизонтальных линий
            if (
              data[i][0] === "x" &&
              data[i][1] === "x" &&
              data[i][2] === null
            ) {
              data[i][2] = "o";
              updateCell(i, 2, "o");
              return;
            }
            if (
              data[i][0] === "x" &&
              data[i][2] === "x" &&
              data[i][1] === null
            ) {
              data[i][1] = "o";
              updateCell(i, 1, "o");
              return;
            }
            if (
              data[i][1] === "x" &&
              data[i][2] === "x" &&
              data[i][0] === null
            ) {
              data[i][0] = "o";
              updateCell(i, 0, "o");
              return;
            }

            // Проверка вертикальных линий
            if (
              data[0][j] === "x" &&
              data[1][j] === "x" &&
              data[2][j] === null
            ) {
              data[2][j] = "o";
              updateCell(2, j, "o");
              return;
            }
            if (
              data[0][j] === "x" &&
              data[2][j] === "x" &&
              data[1][j] === null
            ) {
              data[1][j] = "o";
              updateCell(1, j, "o");
              return;
            }
            if (
              data[1][j] === "x" &&
              data[2][j] === "x" &&
              data[0][j] === null
            ) {
              data[0][j] = "o";
              updateCell(0, j, "o");
              return;
            }

            // Проверка диагоналей
            if (
              data[0][0] === "x" &&
              data[1][1] === "x" &&
              data[2][2] === null
            ) {
              data[2][2] = "o";
              updateCell(2, 2, "o");
              return;
            }
            if (
              data[0][0] === "x" &&
              data[2][2] === "x" &&
              data[1][1] === null
            ) {
              data[1][1] = "o";
              updateCell(1, 1, "o");
              return;
            }
            if (
              data[1][1] === "x" &&
              data[2][2] === "x" &&
              data[0][0] === null
            ) {
              data[0][0] = "o";
              updateCell(0, 0, "o");
              return;
            }
            if (
              data[0][2] === "x" &&
              data[1][1] === "x" &&
              data[2][0] === null
            ) {
              data[2][0] = "o";
              updateCell(2, 0, "o");
              return;
            }
            if (
              data[0][2] === "x" &&
              data[2][0] === "x" &&
              data[1][1] === null
            ) {
              data[1][1] = "o";
              updateCell(1, 1, "o");
              return;
            }
            if (
              data[1][1] === "x" &&
              data[2][0] === "x" &&
              data[0][2] === null
            ) {
              data[0][2] = "o";
              updateCell(0, 2, "o");
              return;
            }
          }
        }

        // Если нет угрозы, выбираем случайную пустую ячейку
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCell = emptyCells[randomIndex];
        const { row, column } = randomCell;
        data[row][column] = "o";
        updateCell(row, column, "o");
      }

      function updateCell(row, column, mark) {
        const cellElement = document.querySelector(`.cell-${row}-${column}`);
        cellElement.innerHTML = `<img src="./images/icon-${mark}.svg" />`;
        cellElement.classList.add(mark);
        // Увеличиваем количество ходов для 'o'
        o++;
        // Проверяем наличие победителя после каждого хода
        const winner = checkForWinner();
        if (winner) {
          gameEnded = true;
          if (winner === "draw") {
            result.textContent = "";
            drawText.textContent = `${draw}`;

            winnerPopup.style.display = "block";

            document.styleSheets[0].addRule("body::after", "display: block");
            winnerPopupText.classList.remove("winner__popup-o");
            winnerPopupText.classList.add("tie");
            winnerPopupText.innerHTML = "ROUND TIED";

            winnerPopupSubtitle.textContent = "";
          } else {
            oWins++;
            winnerO.textContent = oWins;

            winnerPopup.style.display = "block";
            winnerPopupText.classList.add("winner__popup-o");
            winnerPopupText.classList.remove("winner__popup-x");
            winnerPopupText.innerHTML = `<img src="./images/icon-o.svg" /><span> TAKES THE ROUND</span>`;
            winnerPopupSubtitle.textContent = "OH NO, YOU LOST…";

            document.styleSheets[0].addRule("body::after", "display: block");
          }
        }
      }
    }

    if (playerMark === "o" && cpuBot === true) {
      if (x <= o && gameEnded === false) {
        const emptyCells = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === null) {
              emptyCells.push({ row: i, column: j });
            }
          }
        }
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].length; j++) {
            // Проверка горизонтальных линий
            if (
              data[i][0] === "o" &&
              data[i][1] === "o" &&
              data[i][2] === null
            ) {
              data[i][2] = "x";
              updateCell(i, 2, "x");
              return;
            }
            if (
              data[i][0] === "o" &&
              data[i][2] === "o" &&
              data[i][1] === null
            ) {
              data[i][1] = "x";
              updateCell(i, 1, "x");
              return;
            }
            if (
              data[i][1] === "o" &&
              data[i][2] === "o" &&
              data[i][0] === null
            ) {
              data[i][0] = "x";
              updateCell(i, 0, "x");
              return;
            }

            // Проверка вертикальных линий
            if (
              data[0][j] === "o" &&
              data[1][j] === "o" &&
              data[2][j] === null
            ) {
              data[2][j] = "x";
              updateCell(2, j, "x");
              return;
            }
            if (
              data[0][j] === "o" &&
              data[2][j] === "o" &&
              data[1][j] === null
            ) {
              data[1][j] = "x";
              updateCell(1, j, "x");
              return;
            }
            if (
              data[1][j] === "o" &&
              data[2][j] === "o" &&
              data[0][j] === null
            ) {
              data[0][j] = "x";
              updateCell(0, j, "x");
              return;
            }

            // Проверка диагоналей
            if (
              data[0][0] === "o" &&
              data[1][1] === "o" &&
              data[2][2] === null
            ) {
              data[2][2] = "x";
              updateCell(2, 2, "x");
              return;
            }
            if (
              data[0][0] === "o" &&
              data[2][2] === "o" &&
              data[1][1] === null
            ) {
              data[1][1] = "x";
              updateCell(1, 1, "x");
              return;
            }
            if (
              data[1][1] === "o" &&
              data[2][2] === "o" &&
              data[0][0] === null
            ) {
              data[0][0] = "x";
              updateCell(0, 0, "x");
              return;
            }
            if (
              data[0][2] === "o" &&
              data[1][1] === "o" &&
              data[2][0] === null
            ) {
              data[2][0] = "x";
              updateCell(2, 0, "x");
              return;
            }
            if (
              data[0][2] === "o" &&
              data[2][0] === "o" &&
              data[1][1] === null
            ) {
              data[1][1] = "x";
              updateCell(1, 1, "x");
              return;
            }
            if (
              data[1][1] === "o" &&
              data[2][0] === "o" &&
              data[0][2] === null
            ) {
              data[0][2] = "x";
              updateCell(0, 2, "x");
              return;
            }
          }
        }

        // Если нет угрозы, выбираем случайную пустую ячейку
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCell = emptyCells[randomIndex];
        const { row, column } = randomCell;
        data[row][column] = "x";
        updateCell(row, column, "x");
      }

      function updateCell(row, column, mark) {
        const cellElement = document.querySelector(`.cell-${row}-${column}`);
        cellElement.innerHTML = `<img src="./images/icon-x.svg" />`;
        cellElement.classList.add(mark);
        // Увеличиваем количество ходов для 'o'
        x++;

        const winner = checkForWinner();
        if (winner) {
          gameEnded = true;
          if (winner === "draw") {
            result.textContent = "";
            drawText.textContent = `${draw}`;

            winnerPopup.style.display = "block";

            document.styleSheets[0].addRule("body::after", "display: block");

            winnerPopupText.classList.remove("winner__popup-x");
            winnerPopupText.classList.add("tie");
            winnerPopupText.innerHTML = "ROUND TIED";

            winnerPopupSubtitle.textContent = "";
          } else {
            xWins++;
            winnerX.textContent = xWins;
            winnerPopup.style.display = "block";
            winnerPopupText.classList.add("winner__popup-x");
            winnerPopupText.classList.remove("winner__popup-o");
            winnerPopupText.innerHTML = `<img src="./images/icon-x.svg" /><span> TAKES THE ROUND</span>`;
            winnerPopupSubtitle.textContent = "OH NO, YOU LOST…";

            document.styleSheets[0].addRule("body::after", "display: block");
          }
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
let quit = document.querySelector(".winner__popup-quit");
restartCancel.addEventListener("click", () => {
  restartPopup.style.opacity = 0;
  restartPopup.style.zIndex = -1;

  restartPopup.classList.remove("animate__popup");

  document.styleSheets[0].addRule("body::after", "display: none");
});

quit.addEventListener("click", () => {
  restartPopup.style.opacity = 0;
  restartPopup.style.zIndex = -1;

  restartPopup.classList.remove("animate__popup");
  xWins = 0;
  winnerX.textContent = xWins;
  oWins = 0;
  winnerO.textContent = oWins;
  draw = 0;
  drawText.textContent = `${draw}`;
  gameScreen.style.display = "none";
  startPopup.style.display = "flex";
  playerMark = "";
  cpuBot = false;
  document.styleSheets[0].addRule("body::after", "display: none");
  resetGame();
});

restartConfirm.addEventListener("click", () => {
  restartPopup.style.opacity = 0;
  restartPopup.style.zIndex = -1;

  restartPopup.classList.remove("animate__popup");
  document.styleSheets[0].addRule("body::after", "display: none");
  xWins = 0;
  winnerX.textContent = xWins;
  oWins = 0;
  winnerO.textContent = oWins;
  draw = 0;
  drawText.textContent = `${draw}`;
  gameScreen.style.display = "none";
  startPopup.style.display = "flex";

  playerMark = "";
  cpuBot = false;
  resetGame();
});

reset.addEventListener("click", () => {
  restartPopup.style.opacity = 1;
  restartPopup.style.zIndex = 1000;

  restartPopup.classList.add("animate__popup");

  document.styleSheets[0].addRule("body::after", "display: block");
});

nextRound.addEventListener("click", () => {
  document.styleSheets[0].addRule("body::after", "display: none");
  resetGame();

  if (cpuBot === true) {
    cpuMove();
  }
});

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

function toggleActive(button) {
  const activeButton = document.querySelector(".button.active");
  if (activeButton) {
    gsap.to(activeButton, {
      duration: 0.5,
      x: 100,
      opacity: 0,
      onComplete: () => {
        activeButton.classList.remove("active");
        button.classList.add("active");
        gsap.from(button, { duration: 0.5, x: -100, opacity: 0 });
      },
    });
  } else {
    button.classList.add("active");
    gsap.from(button, { duration: 0.5, x: -100, opacity: 0 });
  }
}

function toggleActiveX(button) {
  const activeButton = document.querySelector(".button.active");
  if (activeButton) {
    gsap.to(activeButton, {
      duration: 0.5,
      x: -100,
      opacity: 0,
      onComplete: () => {
        activeButton.classList.remove("active");
        button.classList.add("active");
        gsap.from(button, { duration: 0.5, x: 100, opacity: 0 });
      },
    });
  } else {
    button.classList.add("active");
    gsap.from(button, { duration: 0.5, x: 100, opacity: 0 });
  }
}
