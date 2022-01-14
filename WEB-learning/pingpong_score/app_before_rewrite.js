const p1butt = document.querySelector('#p1butt')
const p2butt = document.querySelector('#p2butt')
const reset = document.querySelector('#reset')
const playto = document.querySelector('#playto')

const p1display = document.querySelector('#p1display')
const p2display = document.querySelector('#p2display')


let p1sc=0;
let p2sc=0;
let winsc=3;
let over=false;

p1butt.addEventListener('click',() => {
    if(!over){
        p1sc += 1;
        if(p1sc === winsc){
            over=true;
            p1display.classList.add('winner');
            p2display.classList.add('loser');
            p1butt.disabled =true;
            p2butt.disabled =true;
        }
        p1display.textContent = p1sc;        
    }
})

p2butt.addEventListener('click',() => {
    if(!over){
        p2sc += 1;
        if(p2sc === winsc){
            over=true;
            p2display.classList.add('winner');
            p1display.classList.add('loser');
            p1butt.disabled =true;
            p2butt.disabled =true;
        }
        p2display.textContent = p2sc;        
    }
})
//if use this dont use arrow => func  !!!!!!!!!!
playto.addEventListener('change',function(){
    winsc = parseInt(this.value);
    resett();
})

reset.addEventListener('click', resett)

function resett(){
    over=false;
    p1sc=0;
    p2sc=0;
    p1display.textContent = 0;        
    p2display.textContent = 0;        
    p1display.classList.remove('winner','loser');
    p2display.classList.remove('winner','loser');
    p1butt.disabled =false;
    p2butt.disabled =false;
}
