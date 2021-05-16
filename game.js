const clearButton = document.getElementById("reset");

const Board = () => {
  const boardSquares = document.querySelectorAll(".board_spot");
  const board_HTML = document.getElementById("game_board");

  const spots = {};
  const clearBoard = () => {
    boardSquares.forEach((sqr) => (sqr.innerHTML.replace = ""));
    nameInput.forEach((x) => (x.value = ""));
  };
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
  return { spots, clearBoard, getIcon, board_HTML };
};

const Players = () => {
  const nameInput = document.querySelectorAll(".player_in");
  const p1 = {
    name: nameInput[0].value !== "" ? nameInput[0].value : "John Doe",
    icon: "x",
  };
  const p2 = {
    name: nameInput[1].value !== "" ? nameInput[1].value : "Mike Doe",
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
    checkWin();
  };
  const checkWin = () => {
    // 0 1 2
    // 3 4 5
    // 6 7 8
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

    winCases.forEach((x) => {
      if (board.spots[x[0]] === undefined) return;
      if (
        board.spots[x[0]] === board.spots[x[1]] &&
        board.spots[x[0]] === board.spots[x[2]]
      ) {
        alert("win");
      }
    });
  };
  board.board_HTML.addEventListener("click", makePlay);
  return { board, players };
};

function startUp() {
  const currentGame = Game();
}
startUp();
