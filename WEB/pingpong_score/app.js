const p1={
    score: 0,
    button: document.querySelector('#p1butt'),
    display: document.querySelector('#p1display')
}

const p2={
    score: 0,
    button: document.querySelector('#p2butt'),
    display: document.querySelector('#p2display')
}

const reset = document.querySelector('#reset')
const playto = document.querySelector('#playto')

let winsc=3;
let over=false;

function update(player ,oppoent){
    if(!over){
        player.score += 1;
        if(player.score === winsc){
            over=true;
            player.display.classList.add('winner');
            oppoent.display.classList.add('loser');
            player.button.disabled =true;
            oppoent.button.disabled =true;
        }
        player.display.textContent = player.score;        
    }
}

p1.button.addEventListener('click',() => {
    update(p1,p2)
})

p2.button.addEventListener('click',() => {
    update(p2,p1)
})

//if use 'this' dont use arrow => func 
playto.addEventListener('change',function(){
    winsc = parseInt(this.value);
    resett();
})

reset.addEventListener('click', resett)

function resett(){
    over=false;
    for(let p of [p1,p2]){
        p.score=0;
        p.display.textContent = 0;  
        p.display.classList.remove('winner','loser');
        p.button.disabled =false;
    }
    // p1.score=0;
    // p2.score=0;
    // p1.display.textContent = 0;        
    // p2.display.textContent = 0;        
    // p1.display.classList.remove('winner','loser');
    // p2.display.classList.remove('winner','loser');
    // p1.button.disabled =false;
    // p2.button.disabled =false;
}
