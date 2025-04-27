"use strict";

// Plus one leet code
// let digits = [6,3,7,0];
// var plusOne = function(digits) {
//     for(let i = digits.length -1; i >=0; i--){
//         if(digits[i] < 9){
//             digits[i] = digits[i] + 1;
//             return digits
//         }else{
//             digits[i] = 0;
//         }
//     }
//     digits.unshift(1)
//     return digits;
// };
// console.log(plusOne(digits));

// Merge Sorted Array leet code
// let nums1=[1,2,3,0,0,0];
// let nums2=[2,5,6];
// var merge = function(nums1, m, nums2, n) {
//     let len = m + n -1;
//     let p1 = m -1;
//     let p2 = n -1;
//     for(let i = len; i >= 0; i--){
//         if(p2 < 0)break;
//         if(p1>=0 && nums1[p1] > nums2[p2]){
//             nums1[i] = nums1[p1--]
//         }else{
//             nums1[i] = nums2[p2--];
//         }
//     }
//     console.log(nums1);
// };
// merge(nums1,3,nums2,3)

// Convert Sorted Array to Binary Search Tree
// let nums = [-10, -3,0, 5, 9];
// var sortedArrayToBST = function (nums) {
//     let midKeyIndex = Math.floor(nums.length / 2);
//     console.log(midKeyIndex);
//     let middle = nums.splice(midKeyIndex,1)[0];
//     nums.unshift(middle);
//     if(nums[0] > nums){
//        middle = nums.splice(midKeyIndex,1)[0];
//        nums.unshift(middle); 

//     }
//     console.log(nums);
//     for (let i = 0; i < nums.length; i++) {}
// };
// console.log(sortedArrayToBST(nums));


// working with scope 

// function calcAge(birthyear){
//     const age = 2025 - birthyear;
//     function print(){
//         let output = `Hi ${n}, You are ${age}, Born in ${birthyear}`;
//         console.log(output);
//         if(birthyear >= 2000 && birthyear <= 2010){
//             const Name = 'Alkholy';
//             var st ='how are you';
//             const str = `oh and you are millenial ${Name}`;
//             console.log(str);
//             function add(a,b){
//                 return a+b;
//             }
//             output = 'New';
//             console.log(output);
//         }
//         // console.log(str); will not be defind
//         console.log(st);
//         // console.log(add(2,3));
//     }
//     print();
//     console.log(Name); 
//     console.log(age);
// }

// const Name = 'Ahmad';
// calcAge(2008)
// Finished scope

// edabit Test

// const arr = [1.346, 1.6532, 1.8734, 1.8723];
// const minMax = function (arr){
//     let min =arr[0];
//     let max =arr[0];
//     for(let i=0; i<arr.length; i++){
//         if(arr[i] < min){
//             min = arr[i]
//         }
//         if(arr[i] > max){
//             max = arr[i]
//         }

//     }
//     console.log(min,max);
// }
// minMax(arr);



// Hoisting and TDZ in Practice

// variabels
// console.log(nam);
// console.log(job);
// console.log(age);

var nam = 'Ahmad';
let job = 'programmer';
const age = 17;

// Functions

// console.log(dec(2,3));
// console.log(exp(6,5));
// console.log(arrow(3,4));
// function dec (a,b){
//     return a+b;
// }
// const exp= function (a,b){
//     return a+b;
// }
// var arrow = (a,b) => a+b;

// if(!shopping) delet();
// var shopping = 10;
// function delet (){
//     console.log('All products is deleted');
// } 

// // working with this keyword

// console.log(this);
// const calcAge = function(birthYear){
//     console.log(2025 - birthYear);
//     console.log(this);
// }
// calcAge(2008)
// const calcAgeArrow = birthYear =>{
//     console.log(2025 - birthYear);
//     console.log(this);
// }
// calcAgeArrow(2010)
// var firstName = 'ismail' // The VAR method is included in the window so it will be found By Arrow Function
// const Ahmad ={
//     firstName:'Ahmad',
//     year:1987,
//     calcAge:function(){
//         console.log(this);
//         console.log(2025 - this.year);
        
//         // solution 1
//         const self = this; // we can solve it like this now it bee defind it is called with self or that
//         const millenial = function(){
//             console.log(self.year >= 1981 && self.year <= 2000);
//             // console.log(this.year >= 1981 && this.year <= 2000); //it will be undeifeind excaktly like if we use the THIS keyword in the global scope !!!but we can solve it follow in top
//         }
//         millenial();

//         // solution 2
//         const isMillenial = ()=>{
//             console.log(this.year >= 1981 && this.year <= 2000); // this solution is best because THIS keyword in the arrow function is loking to the parent and its parent calcAge so this will be the object  
//         }  
//         isMillenial();  
//     },
//     scope: () => console.log(`hy ${this.firstName}`)
// }
// Ahmad.calcAge();
// Ahmad.scope();
// const mat = {
//     year:1989,
// }

// mat.calcAge = Ahmad.calcAge // Method bawroling // And without calling the function
// mat.calcAge()

// const f = Ahmad.calcAge;
// f( )
// This keyword Always points to the object that is calling the method


// arguments keyword

const expr = function(a,b){
    console.log(arguments);
    console.log(a+b);
}
expr(3,5)

// var arro = (a,b) =>{
//     console.log(arguments);
//     return a + b ;
// }
// arro(7,4)

// Object refrense in practice

const john1 ={
    firstName:'John',
    lastName:'Alkhooly',
    age:30
}
const ne = john1;
ne.firstName = 'Ahmad'
console.log(john1);
console.log(john1);
// const beMuslim= function(Name,newname){
//     Name.firstName = newname;
//     console.log(Name);
// }
// beMuslim(john1,'Ahmad')

const john ={
    firstName:'John',
    lastName:'Alkhooly',
    age:30,
    family:['Ahmad','isa']
}

const johncopy={...john} // But this will not copy all the object if there is a nested object it will not copy it like the array is atype of a object so if we want to change anything from the array it will be changed in 2 objects

johncopy.firstName='Ahmad';

johncopy.family.push('musa')

console.log('befor:',john);
console.log('after:',johncopy); 

// But we can solve it wit deep clone 
const johnClone = structuredClone(john);// with this know we can solve the problem

johnClone.family.push('muhammed')

console.log('original:',john);
console.log('deep clone:',johnClone); 

// Destructuring Arrays

// const arr = [3,7,9];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];
// // insted of doing this we can do it more simple 👉

// const [x,y,z] = arr;
// console.log(x, y, z);

// const resturant ={
//     name: 'classico italyano',
//     categories:['italyen','organic','margaretta','with meat'],
//     startermenu:['bread','tea','Ayran','egg'],
//     mainMenu:['pizza','pasta','breakfest'],
//     order: function(starterindex,mainindex){
//         return[this.startermenu[starterindex],this.mainMenu[mainindex]]
//     }
// }

// let [first,second] = resturant.categories;
// const [secod, , third] = resturant.startermenu;
// console.log(first,second);
// console.log(secod,third);
// now if we want to change 2 elements place we can do it with 2 ways normally & Destructuring

// normally
// const temp = first;
// first = second;
// second = temp;
// console.log(first,second);

// Destructuring
// [first,second] = [second,first]
// console.log(first,second);

// // Recieve 2 return values from a function
// const [order1,order2] = resturant.order(2,0);
// console.log(order1,order2);

// // what if we have a nested array

// const nested = [2,4,[5,1]]

// // const [f, , j] = nested;
// // console.log(f,j);

// const [i, ,[j,d]] = nested;
// console.log(i,j,d);

// // Default values
// // const [A,B,C]= [8,9];
// const [A=1,B=1,C=1]= [9];
// console.log(A,B,C); // now c will be undefiend but if we make A,B,C = 1 c will be 1 and if we remove B from the array it will be 1 also 

// Destructuring objects
const weekda = ['mon','tue','wed','thu','friday','sat','sun'];
const openhour ={
    [weekda[0 ]]:{
        open: 9,
        close: 12,
    },
    [weekda[2]]:{
        open:10,
        close:11,
    },
    [weekda[4]]:{
        open: 2,
        close: 1,
    },
    sun:{
        open:0,
        close:2
    }
};

const resturant2 ={
    name: 'classico italyano',
    categories:['italyen','organic','margaretta','with meat'],
    startermenu:['bread','tea','Ayran','egg'],
    mainMenu:['pizza','pasta','breakfest'],
    openhour,
    order (starterindex,mainindex){
        return[this.startermenu[starterindex],this.mainMenu[mainindex]]
    },
    orderdelivery ({starterindex=2,mainindex=2,time=7,adress}){
        console.log(`order recived: ${this.startermenu[starterindex]} & ${this.mainMenu[mainindex]} at ${time}'oclock to adress:${adress}`);
    },
    pasta (ing1,ing2,ing3){
        console.log(`Here is your deliciose 😋 pasta with ${ing1} , ${ing2} and ${ing3}`);
    },
    orderpizza (mainIng,...others){
        console.log(mainIng);
        console.log(...others);
    }
}
// resturant2.orderdelivery({
//     starterindex:1,
//     mainindex:0,
//     time:6,
//     adress:'istanbul kartal',
// });
// resturant2.orderdelivery({
//     adress:'istanbul kartal',
// });
// const {name,startermenu,openhour} = resturant2;
// console.log(name,startermenu,openhour); 

//  if we want to change the verebiles in the object Destructuring

// const{name:resturant,startermenu:tea,openhour:hours} = resturant2;
// console.log(resturant,tea,hours);

// ⁡⁢⁢⁢resturant.menu 👈 this will be undefiend but if we give it a difault value it will not be undefiund like bellow
// const {main=[],startermenu:st=[]}= resturant2;
// console.log(main,st);

//  Mutating variabels

// let A = 123;
// let B =45;

// const obj = {a:3,b:5,c:7};

// ({A,B}=obj)
// console.log(A,B);

// // Nested objects 
// const {friday:{open,close},} = openhour;
// console.log(open,close);

// The spread operator

const arr = [5,6,7]; // now we want to add 2,3 

const badarr = [2,3,arr[0],arr[1],arr[2]]; // without the spread operator we do this
const godarr = [2,3,...arr]; //this is the spread operator 
console.log(badarr);
console.log(...godarr); //if we use the spread operator to log it it will be without the commas and brraks

const newmenu = [...resturant2.mainMenu,'kabsa'];
console.log(newmenu);

//copy array
const main = [...resturant2.startermenu]

// join 2 arrays

const combain = [...resturant2.mainMenu,...resturant2.startermenu];
console.log(combain);

// The spread operator works only on all ⁡⁢⁣⁢Iterabls⁡
// ⁡⁢⁣⁢Iterabls⁡ are: arrays,maps,strings,sets. Not objects

const str= 'Ahmad';
const letter = [...str, ' ','c'];
console.log(letter);

// ⁡⁢⁣⁢console.log(`${...str}`ss);⁡ //this does not work with spread operator because that is not the place that expect multipple values with comma but it is expekted only when we pass it to function or to knew array

// Real world example
// const ingredients = [
//     prompt('let\'s make pasta 1.first ingredient?'),
//     prompt('2.second ingredient?'),
//     prompt('3.third ingredient?'),
// ];

// console.log(ingredients);

// resturant2.pasta(...ingredients);

//spread operator with objects
//const newObj = {foundIn:1980,...resturant2,founder:'Ahmad Alkhooly'}
// console.log(newObj);

// const copy = {...resturant2}
// copy.name = 'Alkhooly';
// console.log(copy.name , resturant2.name); 

// Rest operator
// Rest operator is opisite of spread spread  unpacks array but Rest operator packs elements into the array

// 1)Destructuring
// Spread: because on the Right side of the =
const ar = [1,2,...[3,4]];

// Rest: because on the left side of the =
const[a,b,...others] = [2,35,8,6,7]
console.log(a,b,others);


const [pizza, ,breakfest,...other] = [...resturant2.mainMenu,...resturant2.startermenu];
console.log(pizza,breakfest,other); // the rest operator always collect all the rest vareabiles after the last variable and it does not incloude any scep elements for that resion it have to be in the last in the destucturing assement 

// ⁡⁢⁣⁢object⁡

const{friday,...weekdays}= resturant2.openhour;
console.log(weekdays);

// 2) functions
const add = function(...numbers){
    let sum = 0;
    for(let i = 0; i< numbers.length; i++){
        sum += numbers[i]
    }
    console.log(sum);
}
add(3,5);
add(7,4,9,2);
add(3,6,1,5,8,9,7);
const x = [22,45,2];
add(...x);

resturant2.orderpizza('mashroom','meat','cheese','zeytin');
resturant2.orderpizza('mashroom');

// ⁡⁣⁢⁣About logical operatores⁡
// 1)⁡⁢⁢⁢They can use any data type⁡ 2) ⁡⁢⁢⁢They can return any data type⁡ 3) ⁡⁢⁢⁢short-circuting⁡

// if the first value is trothy it will log but if it is falsy it will log the athor one but if the athor one is also falsy it will log it And that is called ⁡⁢⁢⁢short-circuting⁡
console.log('-----OR-----');
console.log(3 || 'Ahmed');
console.log(0 || 1);
console.log(false||true);
console.log('df'||'');
console.log(undefined||null);

console.log(undefined || 0 || '' || null || 'hello'||23);

resturant2.numgests = 23; //if we change it like this it will also be changed from 👇
const guests1 = resturant2.numgests ? resturant2.numgests:10;
console.log(guests1);
console.log(resturant2);
// but with the || it kan be more simple
const guests2 = resturant2.numgests || 10; // so now numgests is undefiend so it will choose the troothy value

console.log(guests2);

console.log('-----AND-----');
// The ⁡⁢⁢⁢&&⁡ operator is opsite the ⁡⁢⁢⁢||⁡ operator it chosses the falsy value

console.log(0 && 'ahmad');
console.log('hello' && '');
console.log(2 && 23);
console.log(null && 23);
console.log(4 && 'd' && undefined && 23);

// Practical practice
if(resturant2.orderpizza){
    resturant2.orderpizza('vineger','mashroom')
}//insted this with && operator we can make it more simple
resturant2.orderpizza && resturant2.orderpizza('g','g');

resturant2.numgests = 0;

const guests = resturant2.numgests || 10; // = 10

// Nulish:it is only ⁡⁢⁢⁢short-circuting the null & undefiend Not falsy like (0 or '')
const correct = resturant2.numgests ?? 10; // = 0
console.log(correct);

const rest1 = {
    name:'mustafa',
    // numgests: 20
    numgests: 0
}
const rest2={
    name:"ibrahim",
    owner:'Ahmed'
}
//OR assigment operator
    // rest1.numgests = rest1.numgests || 10;
    // rest2.numgests = rest2.numgests || 10; 
    // rest1.numgests ||= 10;
    // rest2.numgests ||= 10;

// Nullish assigment operator
    // rest1.numgests ??= 10;
    // rest2.numgests ??= 10;

//AND assigment operator
    rest1.owner &&= '<ANNOYMOSE>'  
    rest2.owner &&= '<ANNOYMOSE>'  
console.log(rest1);
console.log(rest2);

// challenge #1
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

✅1. Create one player array for each team (variables 'players1' and 'players2')
✅2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
✅3. Create an array 'allPlayers' containing all players of both teams (22 players)
✅4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
✅5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
✅6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
✅7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// const game = {
//     team1: 'Bayern Munich', team2: 'Borrussia Dortmund', players: [
//     [
//     'Neuer',
//           'Pavard',
//           'Martinez',
//           'Alaba',
//           'Davies',
//           'Kimmich',
//           'Goretzka',
//           'Coman',
//           'Muller',
//           'Gnarby',
//           'Lewandowski',
//     ], [
//           'Burki',
//           'Schulz',
//           'Hummels',
//           'Akanji',
//           'Hakimi',
//           'Weigl',
//           'Witsel',
//           'Hazard',
//           'Brandt',
//           'Sancho',
//           'Gotze',
//     ], ],
//       score: '4:0',
//       scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
//       'Hummels'],
//       date: 'Nov 9th, 2037',
//       odds: {
//         team1: 1.33,
//         draw: 3.25,
//         team2: 6.5,
//     },
// };
// // 1
// const [player1,player2]= game.players;
// console.log(player1);
// console.log(player2);
// // 2
// //player 1
// const [gk1,...filed1]= player1
// console.log(gk1,filed1);

// const [ gk2,...filed2]= player2;

// // 3
// const allPlayers = [...player1,...player2]
// console.log(allPlayers);

// // 4
// const player1Final = [...player1,'Thiago','Coutinho','Perisic'];
// console.log(player1Final);


// // 5
// const {odds:{team1,draw,team2}} = game;
// console.log(team1,draw,team2);

// // 6
// const goal=function(...shooters){
//     console.log(...shooters);
//     console.log(`total goals scored :${shooters.length}`);
// }

// goal(...game.scored);


// // 7
// console.log(team1 < team2 && 'team 1 is more likely to win' || team2<team1 && 'team 2 is more likely to win');

//For of loop

const collect = [...resturant2.mainMenu,...resturant2.startermenu]
for(const i of collect) console.log(i);

for(const [i,el] of collect.entries()) console.log(`${i +1}: ${el}`);
console.log([...collect.entries()]);

// Edabit code challenge 

function timeForMilkAndCookies(date) {
	if(date === 11,24 ){
		console.log(true);
	}else{
		console.log(false);
	}
}
timeForMilkAndCookies(new Date(2154, 11, 11));

if(resturant2.openhour && resturant2.openhour.mon) console.log(resturant2.openhour.mon.open);

// console.log(resturant2.openhour.mon.open); 

// Using optional chaining

console.log(resturant2.openhour.friday?.open); 
console.log(resturant2.openhour?.mon?.open); 

const weekday = ['mon','tue','wed','thu','friday','sat','sun'];

for(const day of weekday){
    const open = resturant2.openhour[day]?.open ?? ' this day is close';
    console.log(`on ${day} we open at: ${open}`)
}

// Methods
console.log(resturant2.order?.(3,1) ?? 'This method does not excist');
console.log(resturant2.orderda?.(3,1) ?? 'This method does not excist');

// Arrays
const users = [{name:'Ahmad',gmail:'Ahmad@gmail.com',age:17}]
console.log(users[0]?.name ?? 'user is empty');

// Without the optional chainig we must a had to do it with if else statment

if(users[0].gmail) console.log(users[0].gmail);else console.log('user is empty');

// looping over objects
 //properety Names
const propet = Object.keys(openhour);
console.log(propet);
let openstr = `We open ${propet.length} days :`;
for(const day of propet){
    // openstr += `${day},`;
}
// console.log(openstr);

// property values

const propVal = Object.values(openhour);
console.log(propVal);

// Entire object
const entrie = Object.entries(openhour);
console.log(entrie);
for(const [key,{open,close}] of entrie){
    console.log(`At ${key} we open at ${open} and close at ${close}`);

}


///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

✅1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
✅2. Use a loop to calculate the average odd and log it to the console.
✅3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

✅BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game2 = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
      [
        'Neuer',
        'Pavard',
        'Martinez',
        'Alaba',
        'Davies',
        'Kimmich',
        'Goretzka',
        'Coman',
        'Muller',
        'Gnarby',
        'Lewandowski',
      ],
      [
        'Burki',
        'Schulz',
        'Hummels',
        'Akanji',
        'Hakimi',
        'Weigl',
        'Witsel',
        'Hazard',
        'Brandt',
        'Sancho',
        'Gotze',
      ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    },
  };
 
// 1  
for(const [i,goal] of game2.scored.entries()){
    // const number = 0 + 1
    console.log(`Goal ${i + 1} : ${goal}`);
}  

// 2
const tow = Object.values(game2.odds);
let average = 0;
let last;
for(const j of tow){
    average += j 
    
}
  average /= tow.length;
console.log(average);

// 3
const vari = Object.entries(game2.odds);
for(const [key,odd] of vari){
    let a = key === 'x' ? 'draw' : `victory ${game2[key]}`;
    console.log(`Odd of ${a}: ${odd}`);
}

// Bonus
const scorers = {}
for(const players of game2.scored){
    // console.log(i);
    scorers[players] ? scorers[players]++ : (scorers[players] =1);
};
console.log(scorers);


// Sets
    // Sets are uniq if we put the same element 2 times it will pase it as 1 and it does not has index and we can not recieve elements from the set 
const orderSet = new Set(['pizza','burger','burger','egg'])
console.log(new Set('Ahmad'));
console.log(orderSet.has('pizza'),orderSet.has('garlic bread'));
console.log(orderSet.add('garlic bread'));
console.log(orderSet.delete('egg'));
//  ⁡⁣⁢⁣orderSet.clear()⁡   👈 this clears All the sets     
console.log(orderSet,orderSet.size);

// we can loop also
for(const e of orderSet) console.log(e);

// The main use of the sets to remove the duplikate values of the arrays
    // Example
 const staff = ['mannager','waiter','cheff','waiter','cheff','waiter'];
 const staffSet = [...new Set(staff)];
 console.log(staffSet);   

//  OR

console.log(new Set(['mannager','waiter','cheff','waiter','cheff','waiter']).size);
console.log(new Set('AhmadYaserAlkhooly').size);

// edabit code challenge
function printArray(number) {
    let newArray = [];
      for(let i =1; i <= number; i++){
           newArray.push(i);
      }
      console.log(newArray);
}
console.log(printArray(7));

const arrowFunc = (num) => {
    let bool = (typeof num === 'number' || typeof num === 'boolean') ? num : `'${num}'`;
    console.log(bool);

}

arrowFunc(3)
arrowFunc("4")
arrowFunc('hello')
arrowFunc(true)


function countUnique(s1, s2) {
	console.log(new Set(s1 + s2).size)
}
countUnique('apple','play');

// New operations to make Set's useful

const italianFoods = new Set([
    'pasta',
    'gnocchi',
    'tomatoes',
    'olive oil',
    'garlic',
    'basil',
]);

const mexicanFoods = new Set([
'tortillas',
'beans',
'rice',
'tomatoes',
'avocado',
'garlic',
]);

// If we want to know the same elements in the 2 sets above we use ⁡⁢⁣⁢intersection⁡ method
const common = italianFoods.intersection(mexicanFoods)
console.log([...common]);

// ⁡⁢⁣⁢Union⁡ method combaines 2 sets without repeting the same elements

const italianmexican = italianFoods.union(mexicanFoods);
console.log(italianmexican);

// ⁡⁢⁣⁢Difference⁡ method takes the unige methods that is only in the taken set from one set 

const uniqitalian = italianFoods.difference(mexicanFoods);
const uniqmexican = mexicanFoods.difference(italianFoods);

console.log(uniqitalian);
console.log(uniqmexican);

// ⁡⁢⁣⁢symetricdifference⁡ method it gives all the uniq elements from 2 set's

const italianMexican = italianFoods.symmetricDifference(mexicanFoods);
console.log(italianMexican);

// ⁡⁢⁣⁢isDisjointFrom⁡ method checks if the 2 sets are completle diffrent or not

console.log(italianFoods.isDisjointFrom(mexicanFoods));

// Edabit code challenge
function unrepeated(str) {
    const ser = new Set(str);
	console.log(...ser);
}
unrepeated("hello");

function fiftyThirtyTwenty(ati) {
	const involve = {
        Needs: ati * 0.50,
        Wants: ati * 0.30,
        Savings: ati * 0.20
    }
    console.log(involve);
}
fiftyThirtyTwenty(10000)

function uploadCount(dates, month) {
	let mon = 0;
	for(let i = 0; i < dates.length; i++){
		if(dates[i].startsWith(month)){
            mon++;
        }
	}
        console.log(mon);
}
uploadCount(["Sept 22", "Sept 21", "Oct 15"], "Sept");

// MAPS
    // With maps the key varibal kan number,string or even athor maps

let mpa = new Map()    
mpa.set('Name','Egyption')
mpa.set(1,'Ahmad')
mpa.set('categories',resturant2.categories)
    .set('open',11)
    .set('close',23)
    .set(true,'We are open')
console.log(mpa.set(2,'Alkhooly'));
console.log(mpa.get('Name'));
console.log(mpa.get(true));

let time = 8;
console.log(mpa.get(time > mpa.get('open') && time < mpa.get('close')));
console.log(mpa.has(2));
mpa.delete(2);
// mpa.clear();

// We can make an array key in map but when we try to call the array it well not give us the value becaus it is not the same array in the heap but if we put the array inside a variable it well work

const aar = [1,2];
mpa.set(aar,'Test');
mpa.set(document.querySelector('h1'),'Heading ')
console.log(mpa.get(aar));
console.log(mpa);
console.log(mpa.size);

// Maps iteration

const question = new Map([
    ['Question','What is the best coding lenguage?'],
    [1,'c'],
    [2,'java'],
    [3,'javaScript'],
    ['correct' , 3],
    [true,'correct 🎉'],
    [false,'Wrong try again'],
])
console.log(question);

// converting Objects to maps

console.log(Object.entries(openhour));
const hoursMap = new Map(Object.entries(openhour))
console.log(hoursMap);

// Quiz
console.log(question.get('Question'));
for(const [key,val] of question){
    if(typeof key === 'number') console.log(`Answer ${key}: ${val}`);
}

// ⁡⁢⁣⁢smart logic⁡
// const answer = Number(prompt('Whats your answer'));
// console.log(answer);
// console.log(question.get(answer === question.get('correct')));

// convert map to array

console.log([...question]);
// console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]);

///////////////////////////////////////
// Coding Challenge #3
/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

✅1. Create an array 'events' of the different game events that happened (no duplicates)
✅2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
✅3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
✅4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
    [17, '⚽️ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽️ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽️ GOAL'],
    [80, '⚽️ GOAL'],
    [92, '🔶 Yellow card'],
]);

// 1
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2
gameEvents.delete(64)
console.log(gameEvents);

// 3
console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`);

// 4
for(const [key,valu] of gameEvents){
    const half = key < 45 ? 'FIRST '  : 'SECOND' ;
    console.log(`[${half} HALF] ${key}: ${valu}`);
}

// Strings

const airplane = 'Tap Air Egypt';
const plane = 'A3123';
// So we can use strings like an array selecting index or now the length 
console.log(plane[0]);
console.log(plane[1]);
console.log('wedfv'[1]);
console.log(airplane.length);
console.log('b732'.length);

// and rtrings also has methods

console.log(airplane.indexOf('p'));
console.log(airplane.lastIndexOf('p'));
console.log(airplane.indexOf('Egypt')); //Not: if we write something wrong it will show -1

// with slice method we can slice indexes from strings and put it to knew one So it starts with the index that you enterd and stop at the end index minus one that you enterd and the length of the sliced string its always the end - beginning

console.log(airplane.slice(4));
console.log(airplane.slice(4,7));

console.log(airplane.slice(0,airplane.indexOf(' ')));
console.log(airplane.slice(airplane.lastIndexOf(' ') + 1));
// And we can use negative to slice from the end
console.log(airplane.slice(-3));
console.log(airplane.slice(3,-2));

const chekMiddle = function(middle){
    const s = middle.slice(-1); 
    if(s === 'B' || s === 'E'){
        console.log(`You got the middle seat: ${middle}`);
    }else{
        console.log(`your seat is: ${middle}`);
    }
}
chekMiddle('11E')
chekMiddle('23D')
chekMiddle('17B');

// When we use method on strings javascript converts it to object and when it finished from the methods it reutrns to string
console.log(new String('Ahmad'));
console.log(typeof new String('Ahmad'));

// Edabit code challenge 
function colorInvert(rgb) {
    let sub = [];
    for(let i of rgb){
        sub.push(255 - i);
    }
	console.log(sub)
}
colorInvert([240, 190, 187])

// Contoniu with strings 

console.log(airplane.toLowerCase());
console.log('ahmad'.toUpperCase());

const correctPassenger = function(passenger){
    let correct = passenger.slice(1).toLowerCase();
    console.log(passenger[0].toUpperCase() + correct);
}
correctPassenger('uDeMy')

// comparing email example

const correctEmail = function(original,loginEmail){
    let resign = loginEmail.toLowerCase().trim() //.trim removes all the spaces from the string
    console.log(resign);
    console.log(original === resign);
}
correctEmail('salk321@gmail.com','   SalK321@GmaIL.CoM  ')

// replacing 

let priceGB = '289,79JD';
let priceUS = priceGB.replace('JD','$').replace(',','.');
console.log(priceGB , priceUS);

const call = 'All passengers to To boarding door 23. boarding door 23!';
console.log(call.replace('door','gate')); // replace method will only replace the first selected element
console.log(call.replaceAll('door','gate')); // replaceAll method will work

// Boolean

const aPlane = 'Air board A320 ead'
console.log(aPlane.includes('20'));
console.log(aPlane.includes('bead'));
console.log(aPlane.startsWith('Air'));
console.log(aPlane.startsWith('Air b'));

if(aPlane.startsWith('Air board') && aPlane.endsWith('ead')){
    console.log('Part of new airplane family');
}

// Examole
const baggege = function(bag){
    const res = bag.toLowerCase();
    if(res.includes('gun') || res.includes('knife')){
        console.log('🫵 You can not enter with unleagle things');
    }else{
        console.log('you can enter the plane 😊');
    }
}
baggege('I have Food,KniFe,phone')
baggege('I have Laptop,boxer,phone')
baggege('I have snackes,boxer,gUn')

// Edabit
function rps(p1, p2) {
    let w = {
        Rock: "Scissors",
        Scissors: "Paper",
        Paper: "Rock"
    }
    if(p1 === p2) console.log('draw!!');
    console.log(`The winner is ${w[p1] === p2 ? 'p1' : 'p2'}`);
    // let winner = 'draw';
    // for(let [win,lost] of chec){
    //     if(p1 === win && p2 === lost){
    //         winner ='p1';
    //         console.log(`the winner is ${winner}`);
    //         break;
    //     }else if(p1 === lost && p2 === win){
    //         winner = 'p2';
    //         console.log(`the winner is ${winner}`);
    //         break;
    //     }else if(p1 === p2){
    //         winner = 'Draw'
    //         console.log(`it is ${winner}`);
    //     }
    // }
    // const key = Object.keys(chec);
    // const va = Object.values(chec)
}

rps("Rock", "Paper");
rps("Scissors", "Rock");
rps("Scissors", "Paper");
rps("Paper", "Rock");

// continuing with strings 
    // Join & Split

console.log('This + is + good'.split('+'));    
console.log('Ahmad Alkhooly'.split(' '));

const [firstName,LastName] = 'Ahmad Alkhooly'.split(' ');
const join = ['MR.', firstName , LastName.toUpperCase()].join(' ');
console.log(join);

const capitilaizName = function(name){
    let ar = name.split(' ');
    let result = [];
    for(const n of ar){
        // result.push(n[0].toUpperCase() + n.slice(1)); //First way
        result.push(n.replace(n[0],n[0].toUpperCase())) //second way
    }
    console.log(result.join(' '));
}
capitilaizName('ahmad yaser mostafa alkhooly');

// Padding
const bf = 'Go to there'
console.log(bf.padStart(15,'-').padEnd(19,'-'));//pad add elements to complete the length that you enterd
console.log('Ahmad'.padStart(11,'-').padEnd(19,'-'));

// Example

const creditCard = function(number){
    const str = number + '';
    const combain= str.slice(-4)
    console.log(combain.padStart(str.length,'*'));
}
creditCard(23764924)
creditCard(2376496632110)
creditCard('5776190832738')

// Repeat
const weth = 'dont go outside its very coold  ';
console.log(weth.repeat(3));

const plan = function(n){
    console.log(`there are ${n} planes inline ${'🛩️ '.repeat(n)}`);
}
plan(3)
plan(4)
plan(5)

// code challenge
///////////////////////////////////////
// Coding Challenge #4

/**
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
// const sds = function(regen){
//     const sm = regen.toLowerCase();
//     const [first,last] = sm.split('_');
//     const redr = last.replace(last[0],last[0].toUpperCase())
//     const con = [first+redr].join('')
//     console.log(con);
// }    
// sds('underscore_case')
// sds('first_name')
// sds('Some_Variable')
// sds('calculate_AGE')
// sds('delayed_departure')

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
let btn = document.querySelector('button')
btn.addEventListener('click',function(){
    const text = document.querySelector('textarea').value;
    const rows = text.split('\n');
    for(const[i,f] of rows.entries()){
        const sm = f.toLowerCase().trim();
        const [first,last] = sm.split('_');
        const redr = `${first}${last.replace(last[0],last[0].toUpperCase())}`
        console.log(`${redr.padEnd(20)} ${'✅'.repeat(i+1)}`);
    }
})


const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)
const getcode = str => str.slice(0,3).toUpperCase()
for(const flight of flights.split('+')){
    const [type,from,to,time] = flight.replaceAll('_',' ').replace(':','h').trim().split(';');
    const start = type.startsWith('Delayed') ? '🔴 ' + type : '' + type
    const conca = `${getcode(from)} to ${getcode(to)}`;
    console.log(`${start} from ${conca} (${time})`.padStart(44));
}