let playerO = document.createElement("img");
playerO.src = "lizzie.png";
let playerX = document.createElement("img");
playerX.src = "jester.png";
let currPlayer = playerO;
let przycisk = document.getElementById("powrot");
let tictac = document.querySelector(".tictac");
let wishes = document.querySelector(".wishes")
let wejscie_na_druga_strone = 0;

let game_board = document.getElementById("game-board")

//               0   1   2   3   4   5   6   7   8
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameCells = document.getElementsByClassName("game-cell");

let winningConditions = [
    [0, 1, 2], //horizontal row 1
    [3, 4, 5], //horizontal row 2
    [6, 7, 8], //horizontal row 3
    [0, 3, 6], //vertical column 1
    [1, 4, 7], //vertical column 2
    [2, 5, 8], //vertical column 3
    [0, 4, 8], //diagonal
    [2, 4, 6]  //anti-diagonal
];

let restartGameButton;
let gameOver = false;

window.onload = function() {
        if (currPlayer == playerO)
        {
            game_board.addEventListener("click", (ev) => {
                let cell = ev.target.closest(".game-cell")
                placeCell(cell)
                cell = AiCell()
                placeCellBot(cell)
            })
        }
    restartGameButton = this.document.getElementById("game-restart-button");
    restartGameButton.addEventListener("click", restartGame);
    }


function placeCell(cell) {
    if (gameOver) {
        return;
    }

    const index = parseInt(cell.getAttribute("data-cell-index"));
    if (gameBoard[index] !== "") {
        return;
    }

    gameBoard[index] = playerO; //mark the board
    cell.appendChild(playerO.cloneNode(true));   //mark the board on html

    //change players
    currPlayer = playerX;

    //check winner
    checkWinner();
    console.log(currPlayer)
}

function placeCellBot(cell) {
    if (gameOver) {
        return;
    }

    const index = parseInt(cell.getAttribute("data-cell-index"));
    if (gameBoard[index] !== "") {
        return;
    }

    gameBoard[index] = playerX; //mark the board
    cell.appendChild(playerX.cloneNode(true));   //mark the board on html

    //change players
    currPlayer = playerO;

    //check winner
    checkWinner();
    console.log(currPlayer)
}

function AiCell() {
    let cell_index, cell, index;
    do {
        cell_index = Math.floor(Math.random() * (8 - 0) + 1) + 0;
        cell = gameCells[cell_index]
        index = parseInt(cell.getAttribute("data-cell-index"));
    } while (gameBoard[index] !== "");
    
    return cell
}

function checkWinner() {
    for (let winCondition of winningConditions) {
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];

        if (a == b && b == c && a != "") {
            //update styling for winning cells
            for (let i = 0; i < gameBoard.length; i++) {
                if (winCondition.includes(i)) {
                    gameCells[i].classList.add("winning-game-cell");
                }
            }
            gameOver = true;
            if (a == playerO) {
                if (wejscie_na_druga_strone == 0)
            {
                tictac.style.display = "none";
                wishes.style.display = "flex";
                wejscie_na_druga_strone = 1
            }
            return;
            }
            
        }
    }
}

function restartGame() {
    gameOver = false;
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    for (let cell of gameCells) {
        cell.innerText = "";
        cell.classList.remove("winning-game-cell");
    }
}    

przycisk.addEventListener("click", () => {
    tictac.style.display = "flex";
    wishes.style.display = "none";
})