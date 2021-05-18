const dom = {
  clearButton: document.getElementById('reset'),
  boardSquare: document.querySelectorAll('.board_spot'),
  board_HTML: document.getElementById('game_board'),
  name_input: document.querySelectorAll('.player_in input'),
  result_out: document.getElementById('results'),
};

const Board = () => {
  let spots = {};
  let plays = 0;

  const checkWin = () => {
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
    plays++;
    if (plays === 9) {
      return 'draw';
    }
    for (let i = 0; i < winCases.length; i++) {
      if (spots[winCases[i][0]] === undefined) continue;
      if (
        spots[winCases[i][0]] === spots[winCases[i][1]] &&
        spots[winCases[i][0]] === spots[winCases[i][2]]
      ) {
        return 'win';
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

  return { spots, setIcon, plays, checkWin };
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
  return { p1, p2, updateName };
};

const gameSetup = () => {
  let playerTurn = true;
  const board = Board();
  const players = Players();

  function makePlay(e) {    
    if (e.target.className !== 'board_spot' || e.target.innerHTML !== '')
      return;
    let currentPlayer = playerTurn ? players.p1 : players.p2;
    playerTurn = !playerTurn;
    board.setIcon(e.target, currentPlayer.icon);
    board.spots[e.target.id] = currentPlayer.icon;
    let result = board.checkWin();
    gameOver(result, currentPlayer.name);
  }
  function gameOver(result, name) {
    if (result === 'draw') {
      dom.result_out.innerText = "It's a draw. Reset to play again.";
    } else if (result === 'win') {
      dom.result_out.innerText = `${name} has won! Reset to play again.`;
      dom.board_HTML.removeEventListener('click', makePlay);
    }
  }

  dom.board_HTML.addEventListener('click', makePlay);
  dom.result_out.innerText = 'Click a spot on the board to play!';
  return { playerTurn, board, players };
};

(() => {
  let myGame;
  function reset() {
    dom.boardSquare.forEach((sqr) => (sqr.innerHTML = ''));
    dom.name_input.forEach((x) => (x.value = x.defaultValue));
    dom.result_out.innerText = '';
    myGame = gameSetup();    
  }
  myGame = gameSetup();
  dom.clearButton.addEventListener('click', reset);
  dom.name_input.forEach((x) =>
    x.addEventListener('change', () => {
      myGame.players.updateName();
      console.log(myGame);
    })
  )

})();
