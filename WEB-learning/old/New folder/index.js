console.log("Hello world!");
let myString = "String";
let myNumber = 2;
let myFloat = 2.0;
let myBoolean = true;
let myArray = ["Tomato", "Cheese", "Basil"];
let myObject = {
  name: "John",
  lastname: "Doe",
  age: 20,
};
const Pi = 22 / 7;
console.log(`safe ${myNumber}`)

let falsies = [false, 0, "", "", NaN, null, undefined];
let truthies = [true, 22, [], {}, function () {}];

if (falsies[0]) {
  console.log(falsies[0] && false[2]);
} else if (falsies[1]) {
  console.log(falsies[1] || false[3]);
} else {
  console.log("all false!");
}

for (let i = 0; i < 5; i++) {
  console.log(i);
}
console.log("-------------");
for (let i = 0; i < falsies.length; i++) {
  console.log(falsies[i]);
}
console.log("-------------");
falsies.forEach((a) => {
  console.log(a);
});
console.log("-------------");