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
            (squares[0].textContent === squares[1].textContent && squares[1].textContent === squares[2].textContent && squares[0].textContent !== ``) ||
            (squares[3].textContent === squares[4].textContent && squares[4].textContent === squares[5].textContent && squares[3].textContent !== ``) ||
            (squares[6].textContent === squares[7].textContent && squares[7].textContent === squares[8].textContent && squares[6].textContent !== ``) ||
    
            (squares[0].textContent === squares[3].textContent && squares[3].textContent === squares[6].textContent && squares[0].textContent !== ``) ||
            (squares[1].textContent === squares[4].textContent && squares[4].textContent === squares[7].textContent && squares[1].textContent !== ``) ||
            (squares[2].textContent === squares[5].textContent && squares[5].textContent === squares[8].textContent && squares[2].textContent !== ``) ||
    
            (squares[0].textContent === squares[4].textContent && squares[4].textContent === squares[8].textContent && squares[0].textContent !== ``) ||
            (squares[2].textContent === squares[4].textContent && squares[4].textContent === squares[6].textContent && squares[2].textContent !== ``)
        ) {
            gameControl.gameScreen.classList.add(`hidden`);
            gameControl.endScreen.classList.remove(`hidden`);
        } else if (
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
            console.log(`It's a draw`);
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
        
        let player1;
        if (document.getElementById(`symbolX`).checked) {
            player1 = PlayerFactory(playerName.value, `X`);
            Board.squares.forEach(square => {
                square.addEventListener(`click`, () => {
                    player1.playSymbol(square);
                    Board.checkWin();
                    basicAI.randomPlay(`O`);
                    Board.checkWin();
                });
            });
        } else if (document.getElementById(`symbolO`).checked) {
            player1 = PlayerFactory(playerName.value, `O`);
            basicAI.randomPlay(`X`)
            Board.squares.forEach(square => {
                square.addEventListener(`click`, () => {
                    player1.playSymbol(square);
                    Board.checkWin();
                    basicAI.randomPlay(`X`);
                    Board.checkWin();
                });
            });
        }
    });

    playAgainBtn.addEventListener(`click`, () => {
        Board.clearBoard();
        endScreen.classList.add(`hidden`);
        gameScreen.classList.remove(`hidden`);
    });

    return {
        greetingScreen, gameScreen, endScreen,
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
        ) {
            return
        }

        let randomTarget;  
        do {
            randomTarget = Math.floor(Math.random() * Board.squares.length);
        } while (Board.squares[randomTarget].textContent != ``);

        Board.squares[randomTarget].textContent = symbol;

    },
}
