// function sing (song){
//     console.log(`${song}`)
//     // console.log("sep")
//     return 3;
// }

// let safe = function(){console.log("safe")}

// function calltwice(func){
//     func();
//     func();
// }

// function die(){
//     const roll = Math.floor(Math.random() * 6)+1
//     console.log(roll)
// }
// calltwice(die)

// const mamath = {
//     PI : 3.14,
//     square(num){
//         return num*num;
//     },
//     cube(num){
//         return num**3
//     }
// }

// const cat={
//     name:"safe",
//     age: 21,
//     sex: "male",
//     sep(){
//         console.log(`${this.age} hahaha `);
//     }
// }

// const num=[1,2,3,4,5,6,7,8,9,10]

// const dub = num.map(function(num){
//     return num*2;
// })

// arrow func
// const sum1 =(x,y) =>{
//     return x+y;
// }
// use () to return
// const sum2 =(x,y) =>(
//     x+y
// )

// setTimeout(() => {
//     console.log("safeeee")
// },3000)

// setInterval(() => {
//     console.log(Math.random())
// }, 1000);
// filter some every 

// const price=[1,2,3,4,5,6,7,8,9,10];

// let total=0;
// for (let num of price){
//     total += num
// }
// console.log(total)
// reduce
// const total = price.reduce((total,price)=>{
//     return total+price
// })

// param
// function roll(numside){
//     if(numside === undefined){
//         numside = 6
//     }
//     return Math.floor(Math.random() * numside) +1
// }
// function roll(numside=6){
//     return Math.floor(Math.random() * numside) +1
// }

// spread 
// const price=[1,2,3,4,5,6,7,8,9,10];
// Math.max(price) not work
// Math.max(...price) work!

//DOM

//promise
// const weather=true;

// const date = new Promise(function(resolve,reject){
//     if(weather){
//         const datedetail={
//             name: "matimon",
//             location: "123st,saraburi",
//             table: 24
//         }
//         resolve(datedetail)
//     }
//     else{
//         reject(new Error("Bad wheater srry"));
//     }
// })
// console.log(date);

// const mydate = function(){
//     date
//         .then(function(done){
//             console.log("we are going");
//             console.log(done);
//         })
//         .catch(function(error){
//             console.log(error.message);
//         })
// }

// mydate()

// const orderuber = function(datedetail){
//     const message = "get me on uber ";
//     return Promise.resolve(message);
// }
// // change mydate to asycn

// async function mydate(){
//     try{
//         let datadetail = await date;
//         let message = await orderuber(datedetail);
//         console.log(message);
//     } catch(error){
//         console.log(error.message);
//     }
// }
// (async () => {
//     await mydate();
// })();{

// const login = async(username ,password) =>{
//     if(!username || !password) throw 'missing credentials'
//     if(password==='corgisocute') return 'welcome'
//     throw 'invalid password'
// }
// login('akjsfda','corgisocute')
//     .then(msg=>{
//         console.log("logged in!!!!")
//         console.log(msg) //msg= welcome 
//     })
//     .catch(err=>{
//         console.log("ERROR!")
//         console.log(err) //msg= ,issing or invalid
//     })

// API
// fetch 
// fetch('https://api.cryptonator.com/api/ticker/btc-usd')
//     .then(res =>{
//         console.log("RESPONSE, w8ing to parse...",res)
//         return res.json()
//     })
//     .then(data =>{
//         console.log("data parse...")
//         console.log(data.ticker.price)
//     })
//     .catch(e =>{
//         console.log("ok no ERROR",e)
//     })

//1
// const fetchbitcoin = async()=>{
//     try{
//         const res = await fetch ('https://api.cryptonator.com/api/ticker/btc-usd')
//         const data = await res.json();
//         console.log(data)
//     } catch(e){
//         console.log("something wrong!!!",e)
//     }
// }
// fetchbitcoin()
//2
// axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
//     .then(res =>{
//         console.log(res.data.ticker.price)
//     })
//     .catch(err=>{ 
//         console.log("ERROR!",err)
//     })
//3
// const fetchbitcoin = async()=>{
//     try{
//         const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
//         // const data = await res.json();
//         console.log(res.data.ticker.price)
//     } catch(e){
//         console.log("something wrong!!!",e)
//     }
// }
// fetchbitcoin()
//axios get joke with click button 
const jokes = document.querySelector('#jokes');
const button=document.querySelector('#buttme')

const getjoke = async () => {
    try{
        const config = {headers: {Accept: 'application/json'}}
        const res = await axios.get('https://icanhazdadjoke.com',config)
        return res.data.joke
    }catch(e){
        console.log(e)
        return "no more jokeeeeeeeeeeeeee"
    }
}
const addjoke = async () => {
    const joketext = await getjoke();
    const newli = document.createElement('LI');
    newli.append(joketext)
    jokes.append(newli)
}

// button.addEventListener('click',() => {
//     addjoke()
// })

button.addEventListener('click',addjoke)

/////////////////////

const form = document.querySelector('#searchform')
form.addEventListener('submit',(e) =>{
    e.preventDefault();
    // console.log("submittt")
    console.log(form.elements.query.value)
})