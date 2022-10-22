// Player Factory
const PlayerFactory = (name, symbol) => {
    function playSymbol(target) {
        if(target.textContent === ``) {
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
    const pvpInput = document.getElementById(`pvpInput`);

    const player1displayName = document.getElementById(`player1displayName`);
    const player2displayName = document.getElementById(`player2displayName`);

    const pvpBtn = document.getElementById(`pvpBtn`);
    const pvaiBtn = document.getElementById(`pvaiBtn`);
    
    const playAgainBtn = document.getElementById(`playAgainBtn`);
    const changeModeBtn = document.getElementById(`changeModeBtn`);
    
    const startPvaiBtn = document.getElementById(`startPvaiBtn`);
    const playerName = document.getElementById(`playerName`);

    const player1name = document.getElementById(`player1name`);
    const player2name = document.getElementById(`player2name`);
    const startPvpBtn = document.getElementById(`startPvpBtn`);

    let player1;
    let player2;

    let player1score = 0;
    let player2score = 0;

    let currentGameMode;

    pvpBtn.addEventListener(`click`, () => {
        greetingScreen.classList.add(`hidden`);
        pvpInput.classList.remove(`hidden`);
    });

    pvaiBtn.addEventListener(`click`, () => {
        greetingScreen.classList.add(`hidden`);
        pvaiInput.classList.remove(`hidden`);
    });

    startPvpBtn.addEventListener(`click`, () => {
        pvpInput.classList.add(`hidden`);
        gameScreen.classList.remove(`hidden`);
        player1 = PlayerFactory(player1name.value, `X`);
        player2 = PlayerFactory(player2name.value, `O`);
        player1displayName.textContent = player1.name;
        player2displayName.textContent = player2.name;
        _pvp_player1turn();
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
        endScreen.classList.add(`hidden`);
        gameScreen.classList.remove(`hidden`);
        Board.clearBoard();
        if (currentGameMode === `PoAIx`) {
            basicAI.randomPlay(`X`);
        }

    });

    changeModeBtn.addEventListener(`click`, () => {
        window.location.href = window.location.href
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

    function _pvp_player1turn() {
        for (let i = 0; i < Board.squares.length; i++) {
            Board.squares[i].addEventListener(`click`, _play1);
        }
        player1displayName.classList.add(`thisTurn`);

        function _play1() {
            if (this.textContent !== ``) return;
            player1.playSymbol(this);
            
            if (Board.checkWin() === `X`) {
                player1score += 1;
                drawEndScreen(player1)
            } else if (Board.checkWin() === `Draw`) {
                drawEndScreen(`draw`);
            }

            for (let i = 0; i < Board.squares.length; i++) {
                Board.squares[i].removeEventListener(`click`, _play1);
            }
            for (let i = 0; i < Board.squares.length; i++) {
                Board.squares[i].addEventListener(`click`, _play2)
            }
            player1displayName.classList.remove(`thisTurn`);
            player2displayName.classList.add(`thisTurn`);
        }

        function _play2() {
            if (this.textContent !== ``) return;
            player2.playSymbol(this);
            
            if (Board.checkWin() === `O`) {
                player2score += 1;
                drawEndScreen(player2)
            } else if (Board.checkWin() === `Draw`) {
                drawEndScreen(`draw`);
            }

            for (let i = 0; i < Board.squares.length; i++) {
                Board.squares[i].removeEventListener(`click`, _play2);
            }
            for (let i = 0; i < Board.squares.length; i++) {
                Board.squares[i].addEventListener(`click`, _play1)
            }
            player2displayName.classList.remove(`thisTurn`);
            player1displayName.classList.add(`thisTurn`);
        }
    }

    function gameMode_PxAIo() {
        player1 = PlayerFactory(playerName.value, `X`);
        player2 = basicAI;
        player1displayName.textContent = player1.name;
        player2displayName.textContent = player2.name;
        Board.squares.forEach(square => {
            square.addEventListener(`click`, () => {
                if (square.textContent !== ``) return;
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
        player1displayName.textContent = player1.name;
        player2displayName.textContent = player2.name;
        basicAI.randomPlay(`X`)
        Board.squares.forEach(square => {
            square.addEventListener(`click`, () => {
                if (square.textContent !== ``) return;
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
