
const game = (function(){
    const winningCombinations = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
    const playerX = [];
    const playerO = [];
    let div, winner;
    let turn = 'x';
    let chance = 0;

    const addDivNumber = () => {
        let num = Number(div.getAttribute('data-number'));
        turn === 'x' ? playerX.push(num) : playerO.push(num);
    }
    const displayTurnMessage = () => {
        let classToRemove = turn === 'x' ? 'o-turn' : 'x-turn' ;
        container.classList.remove(classToRemove);
        container.classList.add(turn + '-turn');
    }

    const gameReset = () => {
        if(tryAgainBtn.textContent === 'Start Game'){
            tryAgainBtn.textContent = 'Try Again';
            messageDiv.style.display = 'none';
            return;
        }
        playerO.length = 0;
        playerX.length = 0;
        turn = 'x';
        chance = 0;
        div = null;
        winner = null;
        displayTurnMessage();
        let divs = container.querySelectorAll('div');
        divs.forEach(item => {
            item.className = '';
        });
        messageDiv.style.display = 'none';
    }

    const checkWin = () =>{
        if(chance < 5) return;
        if(turn === 'x'){
            if(winningCombinations.some(arr => arr.every(num => playerX.includes(num)))) winner = 'x';
        }else{
            if(winningCombinations.some(arr => arr.every(num => playerO.includes(num)))) winner = 'o';
        }
    }

    const gameOver = () => {
        messageDiv.style.display = 'block';
        messageDiv.firstElementChild.textContent = `${winner.toUpperCase()} Win !`;
    }

    const markDiv = (e) => {
        div = e.target;
        if(div.className !== '') return;
        addDivNumber();
        div.className = turn;
        chance++;
        checkWin();
        if(winner) gameOver();
        turn = turn === 'x' ? 'o' : 'x';
        displayTurnMessage();
    }

    return {markDiv, gameReset};
})();

const messageDiv = document.querySelector('.message');
const container = document.querySelector('.container');
const tryAgainBtn = messageDiv.querySelector('button');

container.addEventListener('click', game.markDiv);
tryAgainBtn.addEventListener('click', game.gameReset);

// 1. Game starts
//    1.1 Reset both arrays to empty
//    1.2 set turn to x's turn to start with
//    1.3 Empty all divs from markers
//    1.4 Hide message div
// 2. On clicking the divs, the number of divs should be added to their respective arrays
//    2.1 on click add div-number to respective array
//    2.2 show the respective marker to the clicked div
//    2.3 change turn
// 3. On 3rd, 4th and 5th entry in the array, game should check for win
//    3.1 make an array of arrays containg arrays of winning combinations
//    3.2 check if any of the players array contains any of the winning combination
//    3.3 If no win , then keep on playing until run out of moves
//4. When game is over, unhide message div and display respective message
