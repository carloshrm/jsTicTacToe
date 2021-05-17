const dom = {
  clearButton: document.getElementById('reset'),
  boardSquare: document.querySelectorAll('.board_spot'),
  board_HTML: document.getElementById('game_board'),
  name_input: document.querySelectorAll('.player_in input'),
  result_out: document.getElementById('results'),
};

const Board = () => {
  let spots = {};
  const plays = 0;

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

  return { spots, setIcon, plays };
};

const Players = () => {
  const p1 = {
    name: dom.name_input[0].value !== '' ? name_input[0].value : 'John Doe',
    icon: 'x',
  };
  const p2 = {
    name: dom.name_input[1].value !== '' ? name_input[1].value : 'Mike Doe',
    icon: 'o',
  };
  return { p1, p2 };
};

const gameSetup = () => {
  const playerTurn = true;
  const board = Board();
  const players = Players();

  return { playerTurn, board, players };
};

(() => {
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

  function makePlay(e) {
    if (e.target.className !== 'board_spot' || e.target.innerHTML !== '')
      return;
    let currentPlayer = myGame.playerTurn
      ? myGame.players.p1
      : myGame.players.p2;
    myGame.playerTurn = !myGame.playerTurn;
    myGame.board.setIcon(e.target, currentPlayer.icon);
    myGame.board.spots[e.target.id] = currentPlayer.icon;
    console.log(myGame.board.spots);
    checkWin(currentPlayer);
  }

  function checkWin(lastPlayer) {
    myGame.board.plays++;
    winCases.forEach((caseValue) => {
      if (myGame.board.spots[caseValue[0]] === undefined) return;
      if (
        myGame.board.spots[caseValue[0]] === myGame.board.spots[caseValue[1]] &&
        myGame.board.spots[caseValue[0]] === myGame.board.spots[caseValue[2]]
      ) {
        gameOver(lastPlayer.name);
      }
    });
    if (myGame.board.plays === 9) {
      alert('draw');
    }
  }
  function gameOver(name) {
    dom.result_out.innerText = `${name} wins!`;
    dom.board_HTML.removeEventListener('click', makePlay);
  }
  function reset() {
    dom.boardSquare.forEach((sqr) => (sqr.innerHTML = ''));
    dom.name_input.forEach((x) => (x.value = ''));
    myGame = startUp();
  }  
  function startUp() {
    dom.board_HTML.addEventListener('click', makePlay);
    return gameSetup();
  }
  let myGame = startUp();
  dom.clearButton.addEventListener('click', reset);
})();
