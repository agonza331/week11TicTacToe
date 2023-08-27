/* Week 11 assignment
 create board
store in a array to see if the x and o for a line
Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
Create a Tic-Tac-Toe game grid using your HTML element of choice.
When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
A heading should say whether it is X's or O's turn and change with each move made.
A button should be available to clear the grid and restart the game.
When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.*/

const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const turnDisplay = document.getElementById("turn");
const restartButton = document.getElementById("restart");
const resultDisplay = document.getElementById("result");
const resultMessage = document.getElementById("result-message");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function checkWin(player) {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]           // Diagonals
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
            //checks board for arrays and if they are equal to player & if there is then it'll return true
            return true; // Player won
        }
    }

    return false; // There is no winner
}

function checkDraw() {
    return gameBoard.every(cell => cell !== ""); 
    // Game is a draw if all cells are filled, checks to make sure cell is not empty
}
function announceWinner(winner) {
    resultMessage.textContent = `${winner} wins!`;
    resultDisplay.classList.add("alert-success");//alert in green
    resultDisplay.style.display = "flex";
    console.log(resultDisplay.textContent);
} //function of what do to if needed to announce winner, display on screen

function announceDraw() {
    resultMessage.textContent = "It's a draw!";
    resultDisplay.classList.add("alert-warning"); //alert in red
    resultDisplay.style.display = "flex";
    console.log(resultMessage.textContent)
} //function of what do to if needed to announce a draw, display on screen

//function to go through all steps/functions created in a loop,
//
function handleClick(index) {
    if (gameBoard[index] === "" && !resultDisplay.style.display)/*to check if player clicks on the boards & 
    if needs to continue before declaring a winner or draw */ {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            announceWinner(currentPlayer);// check if current player is winner, if yes then announce winner
        } else if (checkDraw()) {
            announceDraw(); // if not a winner then check if all cells are filled, if yes, announce draw
        } else { //if not all cells filled then current player is toggled between x & o, 
            //displaying whose turn it is through turn id turnDisplay the text 
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            turnDisplay.textContent = `Player: ${currentPlayer}'s Turn`;
            console.log(currentPlayer)
        }
    }
}
//function to restart the game, then this will be called to do when restartButton is clicked
function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
    }); //review each cell to empty it once restartbutton is clicked
    resultDisplay.textContent = ""; //clear the results as well
    currentPlayer = "X"; // Reset currentPlayer to "X"
    turnDisplay.textContent = `Player: ${currentPlayer}'s Turn`;// goes back to original players turn
    resultDisplay.style.display = "none"; // Hide the Bootstrap alert
}

cells.forEach((cell, index) => {//listens to event:click for each cell
    cell.addEventListener("click", () => handleClick(index));//then for each clicked cell, it will call the handleClick function
});

restartButton.addEventListener("click", restartGame);
