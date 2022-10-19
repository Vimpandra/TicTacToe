// Player Factory
const PlayerFactory = (name, symbol) => {
    function playSymbol(target) {
        if(target.textContent == ``) {
            target.textContent = symbol;
        }
    }
    return {name, symbol, playSymbol};
}

// Board Module
const Board = (function() {
    'use strict';
    
    const squares = Array.from(document.getElementsByClassName(`square`));

    function clearBoard() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].textContent = ``;
        }
    }
    
    function checkWin() {
        if (
            (squares[0].textContent === `X` && squares[1].textContent === `X` && squares[2].textContent === `X`) ||
            (squares[3].textContent === `X` && squares[4].textContent === `X` && squares[5].textContent === `X`) ||
            (squares[6].textContent === `X` && squares[7].textContent === `X` && squares[8].textContent === `X`) ||
            (squares[0].textContent === `X` && squares[3].textContent === `X` && squares[6].textContent === `X`) ||
            (squares[1].textContent === `X` && squares[4].textContent === `X` && squares[7].textContent === `X`) ||
            (squares[2].textContent === `X` && squares[5].textContent === `X` && squares[8].textContent === `X`) ||
            (squares[0].textContent === `X` && squares[4].textContent === `X` && squares[8].textContent === `X`) ||
            (squares[2].textContent === `X` && squares[4].textContent === `X` && squares[6].textContent === `X`)
        ) {
            return `X`
        } else if (
            (squares[0].textContent === `O` && squares[1].textContent === `O` && squares[2].textContent === `O`) ||
            (squares[3].textContent === `O` && squares[4].textContent === `O` && squares[5].textContent === `O`) ||
            (squares[6].textContent === `O` && squares[7].textContent === `O` && squares[8].textContent === `O`) ||
            (squares[0].textContent === `O` && squares[3].textContent === `O` && squares[6].textContent === `O`) ||
            (squares[1].textContent === `O` && squares[4].textContent === `O` && squares[7].textContent === `O`) ||
            (squares[2].textContent === `O` && squares[5].textContent === `O` && squares[8].textContent === `O`) ||
            (squares[0].textContent === `O` && squares[4].textContent === `O` && squares[8].textContent === `O`) ||
            (squares[2].textContent === `O` && squares[4].textContent === `O` && squares[6].textContent === `O`)
        ) {
            return `O`;
        }
        else if (
            squares[0].textContent !== `` &&
            squares[1].textContent !== `` &&
            squares[2].textContent !== `` &&
            squares[3].textContent !== `` &&
            squares[4].textContent !== `` &&
            squares[5].textContent !== `` &&
            squares[6].textContent !== `` &&
            squares[7].textContent !== `` &&
            squares[8].textContent !== ``
        ) {
            return `Draw`;
        }
    }
    return {
        squares,
        checkWin,
        clearBoard,
    }
})();

// Game control Module
const gameControl = (function() {
    'use strict';
    
    const greetingScreen = document.getElementById(`greetingScreen`);
    const gameScreen = document.getElementById(`gameScreen`);
    const endScreen = document.getElementById(`endScreen`);
    const pvaiInput = document.getElementById(`pvaiInput`);

    const pvpBtn = document.getElementById(`pvpBtn`);
    const pvaiBtn = document.getElementById(`pvaiBtn`);
    
    const playAgainBtn = document.getElementById(`playAgainBtn`);
    const changeModeBtn = document.getElementById(`changeModeBtn`);
    
    const startPvaiBtn = document.getElementById(`startPvaiBtn`);
    const playerName = document.getElementById(`playerName`);

    let player1;
    let player2;

    let player1score = 0;
    let player2score = 0;

    let currentGameMode;

    pvpBtn.addEventListener(`click`, () => {
        greetingScreen.classList.add(`hidden`);
        gameScreen.classList.remove(`hidden`);
    });

    pvaiBtn.addEventListener(`click`, () => {
        greetingScreen.classList.add(`hidden`);
        pvaiInput.classList.remove(`hidden`);
    });

    startPvaiBtn.addEventListener(`click`, () => {
        pvaiInput.classList.add(`hidden`);
        gameScreen.classList.remove(`hidden`);
        
        if (document.getElementById(`symbolX`).checked) {
            gameMode_PxAIo();
            currentGameMode = `PxAIo`;
        } else if (document.getElementById(`symbolO`).checked) {
            gameMode_PoAIx();
            currentGameMode = `PoAIx`;
        }
    });

    playAgainBtn.addEventListener(`click`, () => {
        Board.clearBoard();
        endScreen.classList.add(`hidden`);
        gameScreen.classList.remove(`hidden`);
        if (currentGameMode = `PoAIx`) {
            basicAI.randomPlay(`X`);
        }

    });

    function drawEndScreen(winner) {
        const mainText = document.getElementById(`mainText`);
        const gameScore = document.getElementById(`gameScore`);
        const topText = document.getElementById(`topText`);

        gameScreen.classList.add(`hidden`);
        endScreen.classList.remove(`hidden`);

        if (winner === `draw`) {
            topText.textContent = `Oh no!`
            mainText.textContent = `It's a draw, nobody wins`;
            gameScore.innerHTML = `${player1.name} <strong>${player1score} X ${player2score}</strong> ${player2.name}`;
        } else {   
            topText.textContent = `Congratulations!`
            mainText.textContent = `${winner.name} is the winner`;
            gameScore.innerHTML = `${player1.name} <strong>${player1score} X ${player2score}</strong> ${player2.name}`;
        }
    }

    function gameMode_PxAIo() {
        player1 = PlayerFactory(playerName.value, `X`);
        player2 = basicAI;
        Board.squares.forEach(square => {
            square.addEventListener(`click`, () => {
                player1.playSymbol(square);
                if (Board.checkWin() === `X`) {
                    player1score += 1;
                    drawEndScreen(player1);
                } else if (Board.checkWin() === `Draw`) {
                    drawEndScreen(`draw`)
                } else if (!gameScreen.classList.contains(`hidden`)) {
                    basicAI.randomPlay(`O`);
                    if (Board.checkWin() === `O`) {
                        player2score += 1;
                        drawEndScreen(player2);
                    } else if (Board.checkWin() === `Draw`) {
                        drawEndScreen(`draw`)
                    }
                }
            });
        });
    }

    function gameMode_PoAIx() {
        player1 = PlayerFactory(playerName.value, `O`);
        player2 = basicAI;
        basicAI.randomPlay(`X`)
        Board.squares.forEach(square => {
            square.addEventListener(`click`, () => {
                player1.playSymbol(square);
                if (Board.checkWin() === `O`) {
                    player1score += 1;
                    drawEndScreen(player1);
                } else if (Board.checkWin() === `Draw`) {
                    drawEndScreen(`draw`)
                } else if (!gameScreen.classList.contains(`hidden`)) {
                    basicAI.randomPlay(`X`);
                    if (Board.checkWin() === `X`) {
                        player2score += 1;
                        drawEndScreen(player2);
                    } else if (Board.checkWin() === `Draw`) {
                        drawEndScreen(`draw`)
                    }
                }
            });
        });
    }

    return {
        greetingScreen, gameScreen, endScreen, player1, player2,
    }
})();

// AI Module
const basicAI = {
    name: `Easy AI`,

    randomPlay: function(symbol) {
        if (
            Board.squares[0].textContent != `` &&
            Board.squares[1].textContent != `` &&
            Board.squares[2].textContent != `` &&
            Board.squares[3].textContent != `` &&
            Board.squares[4].textContent != `` &&
            Board.squares[5].textContent != `` &&
            Board.squares[6].textContent != `` &&
            Board.squares[7].textContent != `` &&
            Board.squares[8].textContent != ``
        ) return
        let randomTarget;  
        do {
            randomTarget = Math.floor(Math.random() * Board.squares.length);
        } while (Board.squares[randomTarget].textContent != ``);

        Board.squares[randomTarget].textContent = symbol;

    },
}
