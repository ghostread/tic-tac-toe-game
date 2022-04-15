const boardContainer = document.querySelector("#board-container");
const boardItems = document.querySelectorAll(".board-item");
let turnGameText = document.querySelector('.turn-game');
const startGameButton = document.querySelector('#start-game');
const startGameText = document.querySelector('#start-game-text')
const gameResult = document.querySelector('#game-result')
let currentPlayer;
let isCircleTurn = false;
let counter = 0;
let gameState = ["", "", "", "", "", "", "", "", ""];
let roundWon = false;
const onePosition = document.getElementById("0");

console.log(onePosition)
const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

startGameButton.addEventListener('click', () => {
    roundWon = false

    gameResult.innerHTML = "";
    turnGameText.innerHTML = `The turn game is for ${isCircleTurn ? 'X' : 'O'}`
    startGameText.textContent = "Restart Game"
    gameState = ["", "", "", "", "", "", "", "", ""];
    counter = 0;
    boardItems.forEach(item => {
        item.innerHTML = null;
        item.classList.remove('winner-color')
    })

    boardContainer.classList.remove("hidden");
})
boardItems.forEach((boardItem) => {

    boardItem.addEventListener('click', (event) => {
        counter++;
        const position = event.target.id;

        if (boardItem.innerHTML !== "") {
            return;
        }
        if (!roundWon) {

            if (isCircleTurn) {
                boardItem.innerHTML = 'X';
                gameState[position] = 'X';
                currentPlayer = "X"
            } else {
                boardItem.innerHTML = 'O';
                gameState[position] = "O";
                currentPlayer = "O"
            }
        }

        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                setColorWinner(winCondition);
                break
            }
        }

        turnGameText.innerHTML = `The turn game is for ${isCircleTurn ? 'O' : 'X'}`;

        if (counter === 9 || roundWon) {
            turnGameText.innerHTML = null;
        }

        if (roundWon) {
            gameResult.innerHTML = `The winner is ${currentPlayer}`;
        } else if (counter === 9 && !roundWon) {
            gameResult.innerHTML = `The game finish to Draw`;
        }

        isCircleTurn = !isCircleTurn;
    });

});

function setColorWinner(winPositions) {
    winPositions.forEach((id) => {
        let doc = document.getElementById(`${id}`);
        doc.classList.add('winner-color')
    })
}