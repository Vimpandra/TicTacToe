// Player Factory
const PlayerFactory = (name, symbol) => {
    function playSymbol(target) {
        if(target.textContent == ``) {
            target.textContent = symbol;
        }
    }
    return {name, playSymbol};
}

// Board Module
const Board = (function() {
    'use strict';
    
    const squares = Array.from(document.getElementsByClassName(`square`));
    
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
            console.log(`Winner`);
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
        checkWin
    }
})();

// Game control Module
const gameControl = (function() {
    'use strict';
    
    const greetingScreen = document.getElementById(`greetingScreen`);
    const gameScreen = document.getElementById(`gameScreen`);
    const pvpBtn = document.getElementById(`pvpBtn`);
    const pvaiBtn = document.getElementById(`pvaiBtn`);

    pvpBtn.addEventListener(`click`, () => {
        greetingScreen.classList.add(`hidden`);
        gameScreen.classList.remove(`hidden`);
    });

    pvaiBtn.addEventListener(`click`, () => {
        greetingScreen.classList.add(`hidden`);
        gameScreen.classList.remove(`hidden`);

        const player1 = PlayerFactory(`Player 1`, `X`);
        Board.squares.forEach(square => {
            square.addEventListener(`click`, () => {
                player1.playSymbol(square);
                Board.checkWin();
                basicAI.randomPlay();
                Board.checkWin();
            });
        });
    });

})();

// AI Module
const basicAI = {
    name: `Easy AI`,
    symbol: `O`,

    randomPlay: function() {
        let randomTarget = Math.floor(Math.random() * Board.squares.length);
        if(Board.squares[randomTarget].textContent == ``) {
            Board.squares[randomTarget].textContent = this.symbol;
        } else if (
            Board.squares[0].textContent !== `` &&
            Board.squares[1].textContent !== `` &&
            Board.squares[2].textContent !== `` &&
            Board.squares[3].textContent !== `` &&
            Board.squares[4].textContent !== `` &&
            Board.squares[5].textContent !== `` &&
            Board.squares[6].textContent !== `` &&
            Board.squares[7].textContent !== `` &&
            Board.squares[8].textContent !== ``
        ) {
            return;
        } else {
            basicAI.randomPlay();
        }
    },
}
