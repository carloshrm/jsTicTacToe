const dom = {
  clearButton: document.getElementById('reset'),
  boardSquare: document.querySelectorAll('.board_spot'),
  board_HTML: document.getElementById('game_board'),
  name_input: document.querySelectorAll('.player_in input'),
  result_out: document.getElementById('footer'),
  ai: document.getElementById('ai_toggle'),
  clear: () => {
    dom.boardSquare.forEach((sqr) => (sqr.innerHTML = ''));
    dom.result_out.style.backgroundColor = '';
    dom.clearButton.style.backgroundColor = '';
  },
};

const Board = () => {
  let spots = {};
  let plays = 0;

  const winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const checkWin = (myBoard = spots) => {
    plays++;
    for (let i = 0; i < winCases.length; i++) {
      if (myBoard[winCases[i][0]] === undefined) continue;
      if (
        myBoard[winCases[i][0]] === myBoard[winCases[i][1]] &&
        myBoard[winCases[i][0]] === myBoard[winCases[i][2]]
      ) {
        return 'win';
      }
      if (plays === 9) {
        return 'draw';
      }
    }
  };

  const setIcon = (target, type) => {
    const cross = `
      <div class="icon" id="right"></div>
      <div class="icon" id="left"></div>    
      `;
    const circle = `
      <div class="icon" id="circle"></div>
      `;
    target.innerHTML = type === 'x' ? cross : circle;
  };

  return { spots, setIcon, checkWin, winCases };
};

const Players = () => {
  const p1 = {
    name: dom.name_input[0].value,
    icon: 'x',
  };
  const p2 = {
    name: dom.name_input[1].value,
    icon: 'o',
  };
  const updateName = function () {
    p1.name = dom.name_input[0].value;
    p2.name = dom.name_input[1].value;
  };
  dom.name_input.forEach((x) =>
    x.addEventListener('change', () => {
      updateName();
    })
  );
  return { p1, p2 };
};

const gameSetup = () => {
  const players = Players();
  let ai = false;
  let playerTurn;
  let board;

  (function setUp() {
    dom.clear();
    board = Board();
    playerTurn = true;
    dom.board_HTML.addEventListener('click', makePlay);
    dom.clearButton.addEventListener('click', setUp);
    dom.ai.addEventListener('click', aiToggle);
    dom.result_out.innerText = 'Click a spot on the board to play!';
  })();

  function aiToggle() {
    ai = !ai;
    ai
      ? (dom.ai.style.backgroundColor = '#ffee00')
      : (dom.ai.style.backgroundColor = '');
    dom.name_input[1].disabled = ai;
    ai
      ? (dom.name_input[1].value = 'Computer')
      : (dom.name_input[1].value = dom.name_input[1].defaultValue);
  }

  function aiPlay() {
    let available = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (const spot in board.spots) {
      available.splice(available.indexOf(parseInt(spot)), 1);
    }    
    
    let randomIndex = Math.floor(Math.random() * (available.length - 0) + 0);
    dom.boardSquare[available[randomIndex]].click();
  }

  function makePlay(e) {
    if (e.target.className !== 'board_spot' || e.target.innerHTML !== '')
      return;
    let currentPlayer = playerTurn ? players.p1 : players.p2;
    playerTurn = !playerTurn;
    board.setIcon(e.target, currentPlayer.icon);
    board.spots[e.target.id] = currentPlayer.icon;
    gameOver(board.checkWin(), currentPlayer.name);
    if (ai === true && playerTurn === false) aiPlay();
  }

  function gameOver(result, name) {
    if (result === 'draw') {
      dom.result_out.innerText = "It's a draw. Reset to play again.";
    } else if (result === 'win') {
      dom.result_out.innerText = `${name} has won! Reset to play again.`;
      dom.result_out.style.backgroundColor = '#ffee00';
      dom.clearButton.style.backgroundColor = '#ffee00';
      dom.board_HTML.removeEventListener('click', makePlay);
    }
  }

  return { board, players };
};

let myGame = gameSetup();
