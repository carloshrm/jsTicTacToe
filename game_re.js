const dom = {
  clearButton: document.getElementById("reset"),
  boardSquare: document.querySelectorAll(".board_spot"),
  board_HTML: document.getElementById("game_board"),
  name_input: document.querySelectorAll(".player_in input"),
  result_out: document.getElementById("footer"),
  ai: document.getElementById("ai_toggle"),
  clear() {
    this.boardSquare.forEach((sqr) => (sqr.innerHTML = ""));
    this.result_out.style.backgroundColor = "";
    this.clearButton.style.backgroundColor = "";
  },
  clickToggle() {
    let state = true;
    state
      ? dom.board_HTML.addEventListener("click", (e) => {
          myGame.play(e);
        })
      : dom.board_HTML.removeEventListener("click", (e) => {
          myGame.play(e);
        });
    state = !state;
  },
  bindEvents() {
    this.result_out.innerText = "Click a spot on the board to play!";
    this.name_input.forEach((x) =>
      x.addEventListener("change", () => {
        Player.updateName(myGame);
      })
    );
    this.ai.addEventListener("click", Computer.pcPlayerToggle);
    this.clearButton.addEventListener("click", startUp);
    this.clickToggle();
  },
  showWinner(name) {
    this.result_out.innerText = `${name} has won! Reset to play again.`;
    this.result_out.style.backgroundColor = "#ffee00";
    this.clearButton.style.backgroundColor = "#ffee00";
    this.clickToggle();
  },
  draw() {
    this.result_out.innerText = "It's a draw. Reset to play again.";
    this.clickToggle();
  },
};

class Board {
  constructor() {
    this.spots = {};
    this.plays = 0;
  }
  checkWin() {
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
    this.plays++;
    for (let i = 0; i < winCases.length; i++) {
      if (this.spots[winCases[i][0]] === undefined) continue;
      if (
        this.spots[winCases[i][0]] === this.spots[winCases[i][1]] &&
        this.spots[winCases[i][0]] === this.spots[winCases[i][2]]
      ) {
        return "win";
      }
    }
    if (this.plays === 9) {
      return "draw";
    }
  }
  setIcons(target, type) {
    const cross = `
        <div class="icon" id="right"></div>
        <div class="icon" id="left"></div>    
        `;
    const circle = `
        <div class="icon" id="circle"></div>
        `;
    target.innerHTML = type === "x" ? cross : circle;
  }
}

class Player {
  constructor(p1) {
    if (p1) {
      this.name = dom.name_input[0].value;
      this.icon = "x";
      this.isP1 = true;
    } else {
      this.name = dom.name_input[1].value;
      this.icon = "o";
      this.isP1 = false;
    }
  }
  static updateName(player) {
    player.p1.name = dom.name_input[0].value;
    player.p2.name = dom.name_input[1].value;
  }
}

class Computer {
  static ai = false;
  static pcPlayerToggle() {
    Computer.ai = !Computer.ai;
    Computer.ai
      ? (dom.ai.style.backgroundColor = "#ffee00")
      : (dom.ai.style.backgroundColor = "");
    dom.name_input[1].disabled = Computer.ai;
    Computer.ai
      ? (dom.name_input[1].value = "Computer")
      : (dom.name_input[1].value = dom.name_input[1].defaultValue);
  }
  static pcPlayerPlay(board) {
    let available = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (const spot in board.spots) {
      available.splice(available.indexOf(parseInt(spot)), 1);
    }
    let winIndex = Math.floor(Math.random() * (available.length - 0) + 0);
    dom.boardSquare[available[winIndex]].click();
  }
}

class Game {
  constructor() {
    this.p1 = new Player(true);
    this.p2 = new Player();
    this.playingBoard = new Board();
    this.whoGoesNext = true;
  }

  play(e, board = this.playingBoard) {
    if (e.target.className !== "board_spot" || e.target.innerHTML !== "")
      return;
    let currentPlayer = this.whoGoesNext ? this.p1 : this.p2;
    this.whoGoesNext = !this.whoGoesNext;
    board.setIcons(e.target, currentPlayer.icon);
    board.spots[e.target.id] = currentPlayer.icon;
    if (!Game.isGameOver(board.checkWin(), currentPlayer.name)) {
      if (Computer.ai === true && this.whoGoesNext === false)
        Computer.pcPlayerPlay(board);
    }
  }

  static isGameOver(result, name) {
    if (result === "draw") {
      dom.draw();
      return true;
    } else if (result === "win") {
      dom.showWinner(name);
      return true;
    }
  }
}

function startUp() {
  myGame = new Game();
  dom.clear();
  dom.bindEvents();
}
startUp();
