const clearButton = document.getElementById("reset");
const boardSquares = document.querySelectorAll(".board_spot");
const board_HTML = document.getElementById("game_board");
const name_input = document.querySelectorAll(".player_in");
const result_out = document.getElementById("results");

const Board = () => {
  const spots = {};
  const clearBoard = () => {
    boardSquares.forEach((sqr) => (sqr.innerHTML = ""));
    name_input.forEach((x) => (x.value = ""));
  };
  clearButton.addEventListener("click", clearBoard);
  const getIcon = (target, type) => {
    const cross = `
      <div class="icon" id="right"></div>
      <div class="icon" id="left"></div>    
      `;
    const circle = `
      <div class="icon" id="circle"></div>
      `;
    target.innerHTML = type === "x" ? cross : circle;
  };
  return { spots, getIcon, board_HTML };
};

const Players = () => {
  const p1 = {
    name: name_input[0].value !== "" ? name_input[0].value : "John Doe",
    icon: "x",
  };
  const p2 = {
    name: name_input[1].value !== "" ? name_input[1].value : "Mike Doe",
    icon: "o",
  };
  return { p1, p2 };
};

const Game = () => {
  let playerTurn = true;
  const board = Board();
  const players = Players();
  const makePlay = (e) => {
    if (e.target.className !== "board_spot" || e.target.innerHTML !== "")
      return;
    let currentPlayer = playerTurn ? players.p1 : players.p2;
    playerTurn = !playerTurn;
    board.getIcon(e.target, currentPlayer.icon);
    board.spots[e.target.id] = currentPlayer.icon;
    console.log(board.spots);
    checkWin(currentPlayer);
  };
  board.board_HTML.addEventListener("click", makePlay);
  const checkWin = (lastPlayer) => {
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
    winCases.forEach((caseValue) => {
      if (board.spots[caseValue[0]] === undefined) return;
      if (
        board.spots[caseValue[0]] === board.spots[caseValue[1]] &&
        board.spots[caseValue[0]] === board.spots[caseValue[2]]
      ) {
        result_out.innerText = `${lastPlayer.name} wins!`;
      }
    });
  };

  return { board, players };
};
(() => {
  const currentGame = Game();
})();
