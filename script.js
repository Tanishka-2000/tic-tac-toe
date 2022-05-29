let turn = 'x';
let container = document.querySelector('.container');
container.addEventListener('click',function(e){
    let div = e.target;
    if(div.className === 'x' || div.className === 'o') return
    div.className = turn;
    turn = turn === 'x' ? 'o' : 'x';
});
