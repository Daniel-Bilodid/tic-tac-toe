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
          } else {
            if (winner === "x") {
              xWins++;
              winnerX.textContent = xWins;
              winnerPopup.style.display = "block";
            }
            if (winner === "o") {
              oWins++;
              winnerO.textContent = oWins;
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
});

function cpuMove() {
  // Создаем массив из всех пустых ячеек

  setInterval(() => {
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

        const winner = checkForWinner();
        if (winner) {
          gameEnded = true;
          if (winner === "draw") {
            document.querySelector(".result").innerHTML = "Draw";
          } else {
          }
        }
      } else {
        console.log("No empty cells available.");
      }
    }
  }, 1000);
}
const cells = document.querySelectorAll(".cell");
let reset = document.querySelector(".reset");

reset.addEventListener("click", resetGame);

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
