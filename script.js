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
    }
}

checkWin()

})();