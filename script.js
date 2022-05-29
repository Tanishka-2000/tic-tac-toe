
const game = (function(){
    const winningCombinations = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
    const playerX = [];
    const playerO = [];
    let div;
    let turn = 'x';
    let chance = 0;
    let winner;
    const addDivNumber = () => {
        let num = Number(div.getAttribute('data-number'));
        turn === 'x' ? playerX.push(num) : playerO.push(num);
    }
    const changeTurn = () => turn = turn === 'x' ? 'o' : 'x';
    const addMarkerClass = () => div.className = turn;
    const changeTurnMessage = () => div.parentElement.className = turn === 'x' ? 'container x-turn' : 'container o-turn';
    const gameReset = () => {
        playerO.length = 0;
        playerX.length = 0;
        turn = 'x';
        div = null;
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
        console.log(`${winner} wins!`);
        messageDiv.style.display = 'block';
        messageDiv.firstElementChild.textContent = `${winner.toUpperCase()} Win !`;
    }
    const markDiv = (e) => {
        div = e.target;
        if(div.className !== '') return;
        addDivNumber();
        addMarkerClass();
        chance++;
        checkWin();
        if(winner) gameOver();

        changeTurn();
        changeTurnMessage();
    }
    return {markDiv, gameReset};
})();

let container = document.querySelector('.container');
container.addEventListener('click', game.markDiv);

const messageDiv = document.querySelector('.message');


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
