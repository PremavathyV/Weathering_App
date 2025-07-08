const board = document.getElementById('board');
const statusText = document.getElementById('status');
let cells = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
  board.innerHTML = '';
  cells.forEach((val, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.textContent = val;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (cells[index] !== '' || !gameActive || currentPlayer !== 'X') return;

  cells[index] = 'X';
  updateBoard();
  if (checkWin('X')) {
    statusText.textContent = 'You Win! 🎉';
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell !== '')) {
    statusText.textContent = "It's a Draw! 😐";
    return;
  }

  currentPlayer = 'O';
  setTimeout(aiMove, 500); // Delay for realism
}

function aiMove() {
  if (!gameActive) return;

  let emptyIndices = cells
    .map((val, idx) => val === '' ? idx : null)
    .filter(v => v !== null);

  let aiIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  cells[aiIndex] = 'O';

  updateBoard();

  if (checkWin('O')) {
    statusText.textContent = 'AI Wins! 😈';
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell !== '')) {
    statusText.textContent = "It's a Draw!";
    return;
  }

  currentPlayer = 'X';
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === player)
  );
}

function updateBoard() {
  document.querySelectorAll('.cell').forEach((cell, i) => {
    cell.textContent = cells[i];
  });
}

function resetGame() {
  cells = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = '';
  createBoard();
}

createBoard();
