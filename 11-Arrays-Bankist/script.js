'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account0 = {
  owner: 'Yasir Alkhooly',
  movements: [43000, 200000, -700, 5000, 900,-100000],
  interestRate: 0,
  pin: 7191,
  type: 'premium',
};


const account1 = {
  owner: 'Ammar Yasir',
  movements: [50000, 3400, -150, -790, -3210, -10000, 85000, -300],
  interestRate: 0,
  pin: 1111,
  type: 'standard',
};
const account2 = {
  owner: 'Ahmad Alkhooly',
  movements: [2000, 450, -400, 30000, -650, -130, 70, 1300],
  interestRate: 0, // %
  pin: 2222,
  type: 'basic',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account0,account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const display = function(movments, sort = false){
  containerMovements.innerHTML = '';
  const mov = sort ? movements.slice().sort((a,b) => a-b) : movments;
  mov.forEach(function(current,i){
    const type = current > 0 ? 'deposit' : 'withdrawal' ;
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${current}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin',html)
  })
}
// display(account1.movements)
// console.log(containerMovements.innerHTML);


// let userName = 'Ahmad Alkhooly'.toLowerCase().split(' ')
// console.log(userName);
// const join = userName.map(cur => cur[0])
// console.log(join.join(''));

const displayBalance = function(mov){
   mov.balance = mov.movements.reduce((acc,cur) => acc + cur ,0)
  return labelBalance.textContent = `${mov.balance}€`;
}
// calcBalance(account1.movements)

const displaySummary = function(arr){
  const incomes = arr.movements.filter(mov => mov > 0).reduce((acc,mov) => acc + mov , 0)
  labelSumIn.textContent = `${incomes}€`
  const out = arr.movements.filter(mov => mov < 0).reduce((acc,mov) => acc + mov , 0)
  labelSumOut.textContent = `${Math.abs(out)}€`
  const interest = arr.movements
    .filter(mov => mov > 0)
    .map(mov => mov * arr.interestRate / 100)
    .filter((mov,i,al) =>{
      // console.log(al);
      return mov >= 1
    })
    .reduce((acc,mov) => acc+mov , 0)
  labelSumInterest.textContent = `${interest}€`

}
// displaySummary(account1.movements)
const big= function(acs){
  acs.forEach(acc => acc.userName = acc.owner.toLowerCase().split(' ').map(arr => arr[0]).join(''))
}
big(accounts)
console.log(accounts);

const updateUi = function(acc){
  display(acc.movements)
  displayBalance(acc)
  displaySummary(acc)
}
// Login logic
let currentAccount;
btnLogin.addEventListener('click',function(e){
  // Stops form from dissapear
  e.preventDefault();
  const user = inputLoginUsername.value;
  const userPin = Number(inputLoginPin.value);
  currentAccount = accounts.find(cur => cur.userName === user && cur.pin == userPin); 
  if(currentAccount){
    // styling
    containerApp.style.opacity = 1;
    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''; 
    inputLoginPin.blur();
    // Display
    updateUi(currentAccount)
    labelWelcome.textContent = `🙋‍♂️ MR. ${currentAccount.owner.split(' ')[0]}`
  }
})

// Transfer money

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const transferAccount = accounts.find(cur => cur.userName === inputTransferTo.value);
  if(amount <= currentAccount.balance && transferAccount && amount > 0 && transferAccount?.userName !== currentAccount.userName){
    currentAccount.movements.push(-amount)
    transferAccount.movements.push(amount);

    // Update UI
    updateUi(currentAccount)
  }else{
    alert('wrong user Name or balance insufficient 🚫');
  }
  inputTransferAmount.blur();
  inputTransferTo.value = inputTransferAmount.value = ''; 
})

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const loan = Number(inputLoanAmount.value);
  const rule = currentAccount.movements.some(mov => mov >= loan * 0.1)
  if(loan > 0 && rule){
    currentAccount.movements.push(loan)
    setTimeout(()=>{
      updateUi(currentAccount)
    },3000)
  }else{
    const bigest = Math.max(...currentAccount.movements)
    alert(`You can loan max ${bigest * 10}!!!`)
  }
  console.log(rule);
  inputLoanAmount.value = ''
})

console.log(10000 * 0.1);
// close Account

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  const closeUser = inputCloseUsername.value;
  const closeUserPin = Number(inputClosePin.value);
  if(currentAccount?.userName === closeUser && currentAccount?.pin == closeUserPin){

    const remove = accounts.findIndex(delet => delet.userName === currentAccount.userName )

    // update Array
    accounts.splice(remove,1)
    
    // update UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
    // updateUi(currentAccount)
  }
  inputCloseUsername.value = inputClosePin.value = '';
})

// sort

let sorted = false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  display(currentAccount.movements,!sorted)

  sorted = !sorted;
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Array Methods
  // Slice
// ⁡⁢⁣⁢let arr = ['a','w','e','d','f','g','b']
// console.log(arr.slice(4),'Slice Method');
// console.log(arr.slice(3,6),'Slice Method');
// console.log(arr.slice(-3),'Slice Method');
// console.log(arr.slice(1,-3),'Slice Method');
// console.log(arr.slice(-1),'Slice Method');//is always the last element from an array
// console.log(arr.slice(),'Slice Method');// this will console the holl array

// // Splice
// // The diffrent between slice & splice that splice shanges the original array
// // console.log(arr.splice(4));
// arr.splice(-1) // remove the last element
// console.log(arr,'Splice Method');
// // the second peramotor is the elements we want to delete
// arr.splice(1,2) // deletes2 elemnts from position 1console.log(arr);
// console.log(arr,'Splice Method');

// // Reverse

// let arr2 = ['v','f','e','w','r']
// console.log(arr2.reverse());
// console.log(arr2,'Reverse Method'); // Reverse method changes the original array like splice

// // concat 
// const concat = arr.concat(arr2);
// console.log(concat,'Concat Method');

// // Join
// console.log(concat.join(' - '),'Join Method');

// // at methodd
// const atM = [43,54,21,876,456]
// console.log(atM[0]);
// console.log(atM.at(0));

// //getting the last element
// console.log(atM[atM.length -1]);
// console.log(atM.slice(-1)[0]);
// console.log(atM.at(-1));
// console.log('Ahmad'.at(0));

// // Edabit challenge
// function minMax(arr) {
// 	let min = arr[0];
// 	let max = arr[0];
// 	for(let i = 1; i < arr.length; i++){
//     if(arr[i]<min){
//       min = arr[i]
//     }else if(arr[i]>max){
//       max = arr[i]
//     }
// 	}
//   return [min,max]
// }
// console.log(minMax([14, 35, 6, 1, 34, 54]));


// // Foreach loop
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // for(const [i,movment] of movements.entries()){
// //   if(movment > 0){
// //     console.log(`${i +1}: you deposited ${movment}`);
// //   }else{
// //     console.log(`${i +1}: you lose ${Math.abs(movment)}`);
// //   }
// // }

// console.log('-----For Each-----');
// movements.forEach(function(current,index,array){
//   if(current > 0){
//     console.log(`${index +1}: you deposited ${current}`);
//   }else{
//     console.log(`${index +1}: you lose ${Math.abs(current)}`);
//   }
// })
// // in the function we can pass 3 variales 1 for the current element 2 for the index 3 for the holl array and break does not work at forEach loop
// // this how it works👇
// // 0: function(200)
// // 1: function(450)
// // 1: function(-400)

// // Edait challenge

// function oddSum(numbers) {
//   let tf = [];
//   for(let i = 0; i< numbers.length -1; i++){
//     console.log(numbers[i] + numbers[i + 1]);
//     let sum = numbers[i] + numbers[i + 1];
//     tf.push(sum %2==0)
//   }
//   return tf
// }
// console.log(oddSum([11, 15, 6, 8, 9, 10]));

// // ForEach with maps and sets
//   // Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function(value,key,map){
//   console.log(`${key}: ${value}`);
// })// forEach with maps 1. is the value 2. key 3.intire map

// // SET

// const uniq = new Set(['US','EUR','TL','EUR','US','TL'])

// uniq.forEach(function(value,key,index){
//   console.log(`${key}: ${value},${index}`);
// })//With sets we dont need three arguments the first 1 it's for all the values the second one object
// ⁡

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/


const checkDogs = function(dogsJulia,dogsKate){
  const onlyDogs = dogsJulia.splice(1,2);
  let combain = onlyDogs.concat(dogsKate)
  console.log(combain);
  combain.forEach(function(value,index){
    if(value >= 3){
      console.log(`Dog number ${index + 1} is an adult, and is ${value} years old`);
    }else{
      console.log(`Dog number ${index + 1} is still a puppy 🐶`);
    }
  })
}
// checkDogs([3, 5, 2, 12, 7],[4, 1, 15, 8, 3])
// checkDogs([9, 16, 6, 8, 3],[10, 5, 6, 1, 4])

// MAP
  // the map method loops intro the array and returns a knew array
const eurToUsd = 1.1;
const movementUsd =  movements.map(function(mov){
  return Math.trunc(mov * eurToUsd)
})
console.log(movements);
console.log(movementUsd);

// with for of loop 

// const ofLoop = [];
// for(const m of movements){
//   ofLoop.push(Math.trunc(m * eurToUsd))
// }
// console.log(ofLoop);

// With arrow function

const Arrow = movements.map( mov => Math.trunc(mov * eurToUsd));
console.log(Arrow);

// Maps also can have 3 arguments like for each

const ind = movements.map((cur,index,array) =>  `Movment ${index + 1} you ${cur > 0 ? 'deposited' : 'losed'} ${Math.abs(cur)}`
)
console.log(ind);

// Filter Method

const deposits = movements.filter((mov,i,arr) => mov > 0)
console.log(deposits);

const withdraw = movements.filter(mov => mov < 0)
console.log(withdraw);
// with for of loop

let depos = [];
for(const mov of movements){
  if(mov > 0){
    depos.push(mov)
  }
}
console.log(depos);

// reduce Method
  // the reduce method is diffrent from forEach and map it has one more value it contains: accumulator,current element,index,hole array

// const balance = movements.reduce(function(acc,cur,i,hole){
//   // console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// },0) // the zero here is for accumulator value we are leting it to start from 0
const balance = movements.reduce((acc,cur,i,hole) =>  acc + cur ,0)

console.log(balance);
// With for of loop

let sum = 0;

for(const balance of movements) sum += balance;

console.log(sum);

// maximum value
const max = movements.reduce((acc,cur) => {
  if(acc > cur){
    return acc
  }else{
    return cur
  }
}, movements[0])
console.log(max);


///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = function(arr){
  const humanAge = arr.map(cur=> cur <= 2 ? 2 * cur : 16 + cur * 4)
  const adult = humanAge.filter(cur => cur >= 18 )
  // const average = adult.reduce((acc,cur) => acc + cur , 0)/ adult.length
  const average = adult.reduce((acc,cur,i,arr) => acc + cur / arr.length, 0)
  //2 3 (2+3)/2 = 2.5 === 2/2 + 3/2 = 2.5
  console.log(humanAge);
  console.log(adult);
  console.log(average);
}
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])

// We can chain multiple map,filter,reduce together it works until the one before it returns a new array

const totalToUsd = movements
  .filter(mov => mov >= 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc,mov) => acc + mov ,0);

console.log(totalToUsd);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge2 = arr =>{
  const chain = arr.map(cur => cur <= 2 ? 2 * cur : 16 + cur *4).filter(cur => cur >= 18).reduce((acc,cur,i,arr) => acc + cur  / arr.length , 0)
  console.log(chain);
}
calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3])
calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4])


// Find Method
  // The find method it is quite diffrent from filter the filter returns a new array but the find only returns first one true value

const find = movements.find(tr => tr < 0)
console.log(find);  

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Sarah Smith' )
console.log(account);

// with for of loop 

for(const i of accounts){
  if(i.owner === 'Sarah Smith'){
    console.log(i);
  }
}

// FindLast & findLastIndex metods
  // those start searching from the last

console.log(movements);  
const last = movements.findLast(mov => mov < 0)
console.log(last);  

// 'your latest large movement was x movements ago'
const lastIndex = movements.findLastIndex(mov => mov >= 2000);
console.log(`your latest large movement was ${movements.length - lastIndex} movements ago`);

// some method
  // /\it returns boolean

console.log(movements.includes(-130));

const any = movements.some(mov => mov > 5000)
console.log(any);

// Every Method
  // it checks if evey single method passes the needed thing

console.log( movements.every(mov => mov > 0));  
console.log( account4.movements.every(mov => mov > 0));  

// Small example

const doNot = mov => mov > 0;

console.log(movements.some(doNot));
console.log(movements.every(doNot));
console.log(movements.filter(doNot));

// Flat method

const nest = [[1,2,3],[4,5,6],7,8];
// the flat method puts all the nested arrays in one array
console.log(nest.flat());

// but this method goes 1 level deep into the array to fix that 👇

const deeper = [[[1,2],3],[4,5,[6]],7,8];
console.log(deeper.flat(2));

// Example
  // flat
const allAccountsMovements = accounts.map(cur => cur.movements).flat().reduce((acc,mov) => acc + mov, 0)

console.log(allAccountsMovements);

// flatMap
  // insted using map and then flat we can use flatMap insted

const allAccountsMovements2 = accounts.flatMap(acc => acc.movements).reduce((acc,cur) => acc + cur, 0)
console.log(allAccountsMovements2);


///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
✅1. Store the the average weight of a "Husky" in a variable "huskyWeight"
✅2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
✅3. Create an array "allActivities" of all the activities of all the dog breeds
✅4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
✅5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
✅6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
✅7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

✅BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/


const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// 1

const huskyWeight = breeds.find(mov => mov.breed === 'Husky').averageWeight;
console.log(huskyWeight);

// 2

const dogBothActivities = breeds.find(mov => mov.activities.includes('running') && mov.activities.includes('fetch')).breed;
console.log(dogBothActivities);

// 3

const allActivities = breeds.flatMap(mov => mov.activities)
console.log(allActivities);

// 4

const uniqueActivities = [... new Set(allActivities)];
console.log(uniqueActivities);  

// 5

const filtiring = breeds.filter(mov => mov.activities.includes('swimming')).flatMap(mov => mov.activities).filter(mov => mov !== 'swimming');
const swimmingAdjacent = [...new Set(filtiring)]
console.log(swimmingAdjacent );

// 6

console.log(breeds.every(mov => mov.averageWeight >= 10));

// 7

console.log(breeds.some(mov => mov.activities.length >= 3));

// Bonus

const hevy = breeds.filter(mov => mov.activities.includes('fetch')).map(mov => mov.averageWeight)

console.log(Math.max(...hevy));

// Sorting Method

// String Sorting

const orginizeString = ['zack','william','yaser','ahmad']
console.log(orginizeString.sort());
// console.log(orginizeString);
// the sort method changes the originall array

// Number sorting

  // Sorting with numbers is diffrent it changes the numbers to strings to fix that we add a callback function inside it

// return < 0, A,B (keep order) 
// return > 0, B,A (switch order) 

// from lowest to biggest
// movements.sort((a,b) =>{
//   if(a > b) return 1;
//   if(a <b) return -1
// }) 
movements.sort((a,b) => a-b) //this is the same if a is bigger than b it will return + else it will return -
console.log(movements);

// from biggest to lowest
// movements.sort((a,b) => {
//   if(a > b) return -1;
//   if(a < b) return 1;
// })
movements.sort((a,b) => b - a)
console.log(movements);



// Array grouping

const group = Object.groupBy(movements, mov => mov > 0 ? 'deposit' : 'withdrawl')
// those strings returns key to the object
console.log(group);

const example = Object.groupBy(accounts, acc => {
  const evr = acc.movements.length;

  if(evr >= 6) return 'very active'
  if(evr >= 4) return 'active'
  if(evr >= 1) return 'moderate'
  return 'inactive'
})

console.log(example);

const api = Object.groupBy(accounts, acc => acc.type)
console.log(api);


// fill 

const ar = [1,2,3,4,5,6,7];

const ws = new Array(7);

console.log(ar);
console.log(ws);

ws.fill(1)
console.log(ws);
// 3 is what number we want to fill inside the array 2 is at what index we want it to start  6 is at what index we want it to end
ws.fill(3,2,6)
console.log(ws);

ar.fill(7,3,5)
console.log(ar);

// Array.from

const af = Array.from({length:7}, ()=> 3);
console.log(af);

// creating from 1 to 7 array

const z = Array.from({length: 7}, (_,i) => i + 1);
console.log(z);

labelBalance.addEventListener('click',function(){
  const balan = Array.from(document.querySelectorAll('.movements__value') , el => Number(el.textContent.replace('€','')))
  console.log(balan);
})


///////////////////////////////////////
// Non-Destructive Alternatives: toReversed, toSorted, toSpliced, with

  // toReversed
console.log(movements);

const Reversed = movements.toReversed(); //reverse() changes the originall array but .toReversed does not
console.log(Reversed);
console.log(movements);

// toSorted

const sortd = movements.toSorted((a,b) => a-b)
console.log(sortd);

// toSpliced
const spliced = movements.toSpliced(2,3)
console.log(spliced);

// With method

const rep = movements.with(3,456) //Replaces position 3 with the enterd value 
console.log(movements);
console.log(rep);


/////////////////////////
// ARRAY METHODS PRACTISE

// 1
const totalAll = accounts.flatMap(cur => cur.movements).filter(mov => mov > 0).reduce((acc,cur) => acc + cur , 0)
console.log(totalAll);

// 2

const moreThan = accounts.flatMap(cur => cur.movements).filter(cur => cur >= 1000).length;
const num2 = accounts.flatMap(mov => mov.movements).reduce((acc,mov) => (mov >= 1000 ? ++acc : acc) , 0);
console.log(moreThan);
console.log(num2);

let a = 10;
console.log(a++); //as we know ++ adds 1 to the value but when we do it like this it will add 1 but it will not appear it appears only when we log it again to solve this 👉 ++a
console.log(a);//it will appear here the plused 1 value 

// 3

const sums = accounts.flatMap(cur => cur.movements).reduce((acc,cur) => {
  // cur > 0 ? acc.deposits += cur : acc.withdrawls += cur;
  acc[cur > 0 ? 'deposits' : 'withdrawls'] += cur;
  return acc;
} , {deposits:0,withdrawls:0})
console.log(sums);

// 4

// this is a nice title => This Is a Nice Title

const convertTo = function(title){
  const capitilaze = str => str[0].toUpperCase() + str.slice(1) ;

  const exmeption = ['a','the','with','in','on','or','but','an','is'];

  const solve = title.toLowerCase().split(' ').map(cur => exmeption.includes(cur) ? cur : capitilaze(cur)).join(' ');

  return capitilaze(solve)
}

console.log(convertTo('this is a nice title in the succses table'));
console.log(convertTo('the title is not good but it is on the succes LisT'));




///////////////////////////////////////
// Coding Challenge #5

/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];


// 1

const food = dogs.forEach(cur => cur.recFood = Math.floor(cur.weight ** 0.75 * 28)
)  
console.log(dogs);

// 2

const much = [dogs.find(cur => cur.owners.includes('Sarah'))].map(cur => cur.curFood > cur.recFood ? 'eats too much' : 'eats sow less')

console.log(`Sharah's dog ${much}`);
 
// 3

const ownersTooMuch =  dogs.filter(cur => cur.curFood > cur.recFood).flatMap(cur => cur.owners);

const ownersTooLittle = dogs.filter(cur => cur.curFood < cur.recFood).flatMap(cur => cur.owners);
console.log(ownersTooMuch);
console.log(ownersTooLittle);

// 4

console.log(`${ownersTooMuch.join(' and ')}'s dogs eat too much!`);  
console.log(`${ownersTooLittle.join(' and ')}'s dogs eat too little!`);  

// 5

const anyDog = dogs.some(cur => cur.curFood === cur.recFood);
console.log(anyDog);

// 6

const checkOkay = okay => okay.curFood > (okay.recFood * 0.90) && okay.curFood < (okay.recFood * 1.10)

const see = dogs.every(checkOkay);
console.log(see);

// 7

const okay = dogs.filter(checkOkay)  
console.log(okay);

// 8

const groupDogs = Object.groupBy(dogs, mov => mov.curFood == mov.recFood ? 'exact' : mov.curFood > mov.recFood ? 'too-much' : 'too-little' );

console.log(groupDogs);

// 9

const hard  = Object.groupBy(dogs, dog => `${dog.owners.length}-owners`)

console.log(hard);

// 10

const sorting = dogs.toSorted((a,b) => a.recFood - b.recFood);

console.log(sorting);
console.log(dogs);