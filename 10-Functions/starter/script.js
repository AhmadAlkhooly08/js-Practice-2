// 'use strict';

// // const bookings = [];
// // We can add any expression to defult
// // const creatFlight = function(flightNum,numPassengers =3,price=199.4 * numPassengers){ // best way 

//      // giving defult value to undefiend varibals
//          // Es5 old way
//      // numPassengers = numPassengers || 3;
//      // price = price || 199; 

// //     const booking = {
// //         flightNum,
// //         numPassengers,
// //         price,
// //     };
// //     console.log(booking);

// //     bookings.push(booking);
// // }
// // creatFlight('Lh345')
// // creatFlight('Lh345',2)
// // creatFlight('Lh345',6)
// // ⁡⁢⁣⁢creatFlight('Lh345',6)⁡ //we can not pass an argument but unsted we can set it to undefenfd


// // const flight = 'AB243';
// // const passenger = {
// //     name: 'Ahmad',
// //     passaport: 234286365
// // }
// // const checkIn = function(flightNum,person){
// //     flightNum = 'Lh453'
// //     person.name = "MR." + person.name;
// //     if(person.passaport === 234286365){
// //         alert('check in')
// //     }else{
// //         alert('Wrong passport')
// //     }
// // }
// // checkIn(flight,passenger) 

// // console.log(flight); 
// // console.log(passenger);⁡⁡ // so we see with the object that when we resigned it with the function value it also changed from the original one because they are pointing to the same object in the heap heap nvmbfh

// // const newPassport = function(num){
// //     return num.passaport = Math.trunc(Math.random() * 123453348654);
// // }
// // console.log(newPassport(passenger))
// // checkIn(flight,passenger)

// const oneWord = function(st){
//     return st.replace(/ /g,'')
// }
// const cappital = function(str){
//     const [first,...others] = str.split(' ');
//     return [first.toUpperCase(),...others].join(' ')
// }

// // High order function 
// // ⁡⁢⁣⁢const transfor = function(str,fn){
// //     console.log(`original: ${str}`);
// //     console.log(`transformed String:  ${fn(str)}`);
// //     console.log(`transformed by:  ${fn.name}`);
// // }
// // transfor('javascript is the best!', cappital)
// // transfor('javascript is the best!', oneWord)

// // const five = function(){
// //     console.log('✋🏿');
// // }
// // document.body.addEventListener('click',five)

// // ['Ahmad','omar', 'Adam'].forEach(five);

// // simple challenge

// // ⁡⁢⁣⁢const add =(a,b) =>  a+b;
// // const subtract = (a,b) =>  a-b;
// // const multiply = (a,b)=> a*b;
// // const call = (a,b,fn) => fn(a,b)

// // console.log(call(7,8,add))
// // console.log(call(7,8,subtract));
// // console.log(call(7,8,multiply))


// // Functions returning functions

// // const greet =function(greetin){
// //     return function(name){
// //         console.log(`${greetin}: ${name}`);
// //     }
// // }

// // const gree = greet('Hey') // the gree variable is the returning function in greet
// // gree('Ahmad')

// // greet('Hello')('Omar') // this also work

// // 
// // const greet2 = greetin => name => console.log(`${greetin} ${name}`);
// // greet2('Hello MR.')('Omar') 

// // Call & Apply methods
// const lufthans = {
//     flight:'lufthans',
//     code:'LH',
//     booking:[],
//     book(flightNum,name){
//         console.log(`${name} Booked a seat on ${this.flight} flight ${this.code}${flightNum}`);
//         this.booking.push({flight:`${this.code}${flightNum}`,name})
//     },
// }
// lufthans.book(274,'Ahmad Alkhooly')
// lufthans.book(238,'omar hasan')

// const euroFlight={
//     flight:'euroWings',
//     code:'EU',
//     booking:[],
    
// }
// const book = lufthans.book;
// //⁡⁢⁣⁢book(324,'Ali');  So this will not work because the ⁡⁢⁣⁢This⁡ keyword is pointing to ⁡⁢⁣⁢lufthans⁡ Object to fix that there is 3 function Methods they are ⁡⁢⁣⁢Call,Apply,Bind⁡

// // Call method 
// book.call(euroFlight, 281,"Ali Hasan")
// book.call(lufthans, 187,"MR.peresedent Ahmad")
// console.log(lufthans.booking);

// const swis = {
//     flight:'swisAirline',
//     code:'SWR',
//     booking:[],
// }
// book.call(swis, 295,"MR.muslim")

// // Apply Method
// const arr = [210,'muhammed']
// book.apply(swis,arr)//the diffrent betwen call and apply that apply needs array to enter
// console.log(swis.booking);


// // Edabit code challenge

// // function whichIsLarger(f, g) {
// //     if(f===g) console.log('neither');
// //     // return f =>{
// //         if(f > g) console.log('f');
// //     // }
// //     // return g =>{
// //         if(g > f) console.log('g');
// //     // }
// // }
// // whichIsLarger(1,9)
// // whichIsLarger(9,9)

// // Bind method

// const bokEw = book.bind(euroFlight);
// const bokLuft = book.bind(lufthans);
// const bokSaw = book.bind(swis);
// bokEw(23,'Selam')

// // we can also pass multipple arguments
// const bokEw23 = book.bind(euroFlight,23);
// bokEw23('Hasan')
// bokEw23('Hamza')

// // Event listener example

// lufthans.planes = 300;
// lufthans.buyPlane = function(){
//     bokEw23('Ahmad')
//     this.planes++
//     console.log(this.planes);
// }
// const btn = document.querySelector('.buy');
// const buy = lufthans.buyPlane.bind(lufthans)
// btn.addEventListener('click',buy)

// // Partial application
// const addTax = (tax,value) => console.log(value + value * tax);
// addTax(0.1,300);

// const taxBr = addTax.bind(null, 0.15)//the first place we pass an argument that we want the this keyword to pointto
// // taxBr = (value) => console.log(value + value * 0.15);
// taxBr(10)
// taxBr(275)

// // challenge

// // ⁡⁢⁣⁢const tax = tax => value => console.log(value + value * tax)

// // const rre = tax(0.11)
// // rre(1323)
// // rre(133)


// ///////////////////////////////////////
// // Coding Challenge #1

// /* 
// Let's build a simple poll app!

// A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

// Here are your tasks:

// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
//   1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
//         What is your favourite programming language?
//         0: JavaScript
//         1: Python
//         2: Rust
//         3: C++
//         (Write option number)
  
//   1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

// HINT: Use many of the tools you learned about in this and the last section 😉

// BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

// GOOD LUCK 😀
// */
// // ⁡⁢⁣⁢const poll = {
// //     question: 'What is your favourite programming language?',
// //     options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
// //     // This generates [0, 0, 0, 0]. More in the next section 😃
// //     answers: new Array(4).fill(0),
// //     registerNewAnswer(){
// //         const answer = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)
// //         `));
// //         typeof answer === 'number' && answer < this.answers.length &&             this.answers[answer]++

// //         console.log(this.answers);
// //         this.displayResults('string')
// //     },
// //     displayResults(result = 'array'){
// //         if(result === 'array'){
// //             console.log(this.answers);
// //         }else if(result === 'string'){
// //             console.log(`Poll results are ${this.answers}`);
// //         }
// //     }
// // }   
// // const btn2 = document.querySelector('.poll')
// // const the = poll.registerNewAnswer.bind(poll)
// // btn2.addEventListener('click',the)
// // poll.displayResults.call({answers:[1,5,9]},'string')

// // (function(){
// //     console.log('this only run once');
// // })(); ⁡⁢⁣⁢//this function only runs once to do it we put the function inside these() and we can not put variables and call them outside⁡

// // (() => console.log('this also runs once'))();

// const backpac = function(){
//     let passengers = 0;
//     return function(){
//         passengers++;
//         console.log(`${passengers} passengers`);
//     }
// }
// const backBock = backpac();

// backBock()
// backBock()
// backBock()
// console.dir(backBock)

// // edabite code challenge

// function isSpecialArray(arr) {
//     let trFl = true; 
//     for(const [index,value] of arr.entries()){
//         console.log(index);
//         if(index % 2 == 0 && value % 2 == 0 || index % 2 && value % 2){
//             trFl = true
//         }else{
//             return trFl = false
//             break
//         }
//     }
//     return trFl === true ? true : false;
// }
// console.log(isSpecialArray([2, 7, 9, 1, 6, 1, 6, 3]));

// // eample of clousers
//     // example 1
// let f;
// const g = function(){
//     let a = 18;
//     f = function(){
//         console.log(a * 2 / 3);
//     }
// }
// const h = function(){
//     let b = 380;
//     f = function(){
//         console.log(b * 2 / 5);
//     }
// }

// g();
// f();
// console.dir(f)
// // resigned f
// h();
// f();
// console.dir(f)

// // timer
// // ⁡⁢⁣⁢setTimeout(function(){
// //     console.log('timer');
// // },1000)⁡

// const passn = function(n,wait){
//     let num = n / 3;
//     setTimeout(function(){
//         console.log(`We have ${n} passengers waiting`);
//         console.log(`Ther are 3 goups each with ${num} passengers`);
//     },wait * 1000)
//     console.log(`Our flight will start after ${wait} minutes`);
// }
// // const num = 2028; the returned function can also accses this outside
// passn(180,3)


///////////////////////////////////////
// Coding Challenge #2
/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function(){
    const header = document.querySelector('h1');
    header.style.color = 'red'

    document.querySelector('body').addEventListener('click',function(){
        header.style.color = 'blue';
    })
})();