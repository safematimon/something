const p1butt=document.querySelector("#p1butt");
const p2butt=document.querySelector("#p2butt");
const p1dis=document.querySelector("#p1dis");
const p2dis=document.querySelector("#p2dis");
const reset=document.querySelector("#reset");
const playto=document.querySelector("#playto")

let p1score=0;
let p2score=0;
let win=5;
let gameover=false;

p1butt.addEventListener('click',function(){
    if(!gameover){
        p1score+=1;
        if(p1score===win){
            gameover=true;
        }
        p1dis.textContent=p1score;
    }
})

p2butt.addEventListener('click',function(){
    if(!gameover){
        p2score+=1;
        if(p2score===win){
            gameover=true;
        }
        p2dis.textContent=p2score;
    }
})

playto.addEventListener('change',function(){
    win=parseInt(this.value);
    re()
})

reset.addEventListener('click',re)
function re(){
    gameover=false
    p1score=0
    p2score=0
    p1dis.textContent=0
    p2dis.textContent=0
}

