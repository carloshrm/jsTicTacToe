const gameBoard = document.getElementById('game_board');
gameBoard.addEventListener('click', makePlay);
const boardSquares = document.querySelectorAll('.board_spot');
const nameInput = document.querySelectorAll('.player_in');
const clearButton = document.getElementById('reset');
let playerTurn = true;
let currentGame;

function startUp() {
  currentGame = gameSetup();
  clearBoard();
}

const setPlayer = (name, icon) => {
  return { name, icon };
};

function getIcon(target, type) {
  const cross = `
    <div class="icon" id="right"></div>
    <div class="icon" id="left"></div>    
    `;
  const circle = `
    <div class="icon" id="circle"></div>
    `;
  target.innerHTML = type === 'x' ? cross : circle;
}

function makePlay(e) {
  if (e.target.className !== 'board_spot' || e.target.innerHTML !== '') return;
  let currentPlayer = playerTurn
    ? currentGame.players.p1
    : currentGame.players.p2;
  playerTurn = !playerTurn;
  getIcon(e.target, currentPlayer.icon);
  currentGame.board[e.target.id] = currentPlayer.icon;
  checkWin();
}

function checkWin() {
  if (
    currentGame.board[0] === currentGame.board[1] 
    && currentGame.board[0] === currentGame.board[2]
  ) {
      alert('win')
  }
}

const gameSetup = () => {
  const board = {};
  const players = {
    p1: {
      name: nameInput[0].value !== '' ? nameInput[0].value : 'John Doe',
      icon: 'x',
    },
    p2: {
      name: nameInput[1].value !== '' ? nameInput[1].value : 'Mike Doe',
      icon: 'o',
    },
  };
  return { board, players };
};

function clearBoard() {
  boardSquares.forEach((sqr) => (sqr.innerHTML.replace = ''));
  nameInput.forEach((x) => (x.value = ''));
}
startUp();
