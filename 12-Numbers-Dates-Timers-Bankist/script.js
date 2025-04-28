'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Ahmad Yasir',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2025-04-08T16:33:06.386Z',
    '2025-04-10T14:43:26.374Z',
    '2025-04-12T18:49:59.371Z',
    '2025-04-13T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'ar-EG', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2025-04-05T16:33:06.386Z',
    '2025-04-07T14:43:26.374Z',
    '2025-04-12T18:49:59.371Z',
    '2025-04-13T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const NumberFormet = function(value,locale,currency){
  const display ={
    style:'currency',
    currency: currency,
  }
  return new Intl.NumberFormat(locale,display).format(value)
}

const formet = function(dates,local){
  const fixMovDate = (date1,date2) =>{
    return Math.round(Math.abs(date2 - new Date(date1)) / (1000 * 60 * 60 * 24));
  }
  const daysPassed = fixMovDate(new Date(),dates);
  if(daysPassed === 0) return 'Today';
  if(daysPassed === 1) return 'Yesterday';
  if(daysPassed <= 7) return `${daysPassed} Days ago`;
  return new Intl.DateTimeFormat(local).format(dates)
}
const display = function(acc, sort = false){
  containerMovements.innerHTML = '';

  const movDates = acc.movements.map((mov,i) =>({
    movement: mov, 
    date: acc.movementsDates.at(i),
  }))

  // const mov = sort ? acc.movements.slice().sort((a,b) => a-b) : acc.movements;
  if(sort) movDates.sort((a,b) => a.movement - b.movement)
  
  movDates.forEach(function(obj,i){
    const {movement,date} = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal' ;
    const dates = new Date(date);
    const combained = formet(dates,acc.locale);
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__date"> ${combained}</div>
          <div class="movements__value">${NumberFormet(movement,acc.locale,acc.currency)}</div>
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
  return labelBalance.textContent = NumberFormet(mov.balance,mov.locale,mov.currency);
}

// calcBalance(account1.movements)

const displaySummary = function(arr){
  const incomes = arr.movements.filter(mov => mov > 0).reduce((acc,mov) => acc + mov , 0)
  labelSumIn.textContent = NumberFormet(incomes,arr.locale,arr.currency);
  const out = arr.movements.filter(mov => mov < 0).reduce((acc,mov) => acc + mov , 0)
  labelSumOut.textContent = NumberFormet(Math.abs(out),arr.locale,arr.currency)
  const interest = arr.movements
    .filter(mov => mov > 0)
    .map(mov => mov * arr.interestRate / 100)
    .filter((mov,i,al) =>{
      // console.log(al);
      return mov >= 1
    })
    .reduce((acc,mov) => acc+mov , 0)
  labelSumInterest.textContent = NumberFormet(interest,arr.locale,arr.currency)

}
// displaySummary(account1.movements)
const big= function(acs){
  acs.forEach(acc => acc.userName = acc.owner.toLowerCase().split(' ').map(arr => arr[0]).join(''))
}
big(accounts)
console.log(accounts);

const updateUi = function(acc){
  display(acc)
  displayBalance(acc)
  displaySummary(acc)
}


const logOutTimer = function(){

  const tick = function(){
    // In each call print the remainig time to the UI
      const min = String(Math.floor(time / 60)).padStart(2,0);
      const sec = String(Math.floor(time % 60)).padStart(2,0)
      labelTimer.textContent = `${min}:${sec}`;

      // when its 0 seconds stop timer and log user out
      
      if(time === 0){
        clearInterval(timer)
        containerApp.style.opacity = 0;
        labelWelcome.textContent = 'Login to get started'
      }
      // decrese 1 s
      time--;
  }
  
    // set 5 minutes Timer
    let time = 300;

  // call timer every 1 second
    tick()
    const timer = setInterval(tick,1000)
    return timer;
}

// Login logic
let currentAccount,timer;

// fake logged in
// currentAccount = account1
// updateUi(currentAccount)
// containerApp.style.opacity = 100;


btnLogin.addEventListener('click',function(e){
  // Stops form from dissapear
  e.preventDefault();
  const user = inputLoginUsername.value.toLowerCase();
  const userPin = +inputLoginPin.value;
  currentAccount = accounts.find(cur => cur.userName === user && cur.pin == userPin); 
  if(currentAccount){
    // styling
    containerApp.style.opacity = 1;
    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''; 
    inputLoginPin.blur();
    // Display

    // timer
    if(timer) clearInterval(timer)
    timer = logOutTimer();
    updateUi(currentAccount)
    labelWelcome.textContent = `🙋‍♂️ MR. ${currentAccount.owner.split(' ')[0]}`
    // creating date
    const simdi = new Date();
    const option = {
      hour:'numeric',
      minute:'numeric',
      day:'numeric',
      month:'long',
      year:'numeric',
      weekday:'short',
    }
    const local = navigator.language;
    console.log(local);
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale,option).format(simdi);
  }
})

// Transfer money

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const transferAccount = accounts.find(cur => cur.userName === inputTransferTo.value);
  if(amount <= currentAccount.balance && transferAccount && amount > 0 && transferAccount?.userName !== currentAccount.userName){
    // currentAccount.movements.push(new Date().toISOString().slice(0,10))
    currentAccount.movements.push(-amount)

    // currentAccount.movements.push(new Date().toISOString().slice(0,10))
    transferAccount.movements.push(amount);

    // update Date
    currentAccount.movementsDates.push(new Date().toISOString());
    transferAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUi(currentAccount)

    // Timer
    clearInterval(timer);
    timer = logOutTimer()
  
  }else{
    alert('wrong user Name or balance insufficient 🚫');
  }
  inputTransferAmount.blur();
  inputTransferTo.value = inputTransferAmount.value = ''; 
})
console.log(accounts);


btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const loan = Math.floor(+inputLoanAmount.value);
  const rule = currentAccount.movements.some(mov => mov >= loan * 0.1)

  if(loan > 0 && rule){
    currentAccount.movements.push(loan)
    currentAccount.movementsDates.push(new Date().toISOString());
    // currentAccount.movements.push(new Date().toISOString().slice(0,10))
    setTimeout(()=>{
      updateUi(currentAccount)
    },4000)
    // Timer
    clearInterval(timer);
    timer = logOutTimer();
  
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
  const closeUserPin = +inputClosePin.value;
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
  display(currentAccount,!sorted)

  sorted = !sorted;
})



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


// 1.converting and checking numbers

console.log(23 === 23.0); //true

// base 10: 0 to 9
// binary base 2: 0 1

console.log(0.1 + 0.2); // this will give us a wrong thing 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); //false

// converting
console.log(Number('23'));
console.log(+'23'); //works same thing cleaner code

// Parsing 

console.log(Number.parseInt('30px',10)); // this takes only the numbers from the string it works only if it starts with number
console.log(Number.parseInt("65mn",2)); //after the comma we put base 2 or 10 what ever base we are working at so this will be Nall

console.log(Number.parseFloat('2.43rem')); // parseFloat takes also the numbers after the dot
console.log(Number.parseInt('2.45rem')); // but this does not take them

// isNan if the number is NAN => true if it's not NAN => false

console.log(Number.isNaN(20));//false
console.log(Number.isNaN('20'));//false
console.log(Number.isNaN(+'20x'));//true

// checks if the value is a number

console.log(Number.isFinite(20));//true
console.log(Number.isFinite('20'));//false
console.log(Number.isFinite(+'20x'));//false

// isInteger

console.log(Number.isInteger(20));//true
console.log(Number.isInteger(20.0));//true
console.log(Number.isInteger(30 / 0));//true


// 2.Math and Ronding

console.log(Math.sqrt(25)); //sqrt => sqaure root
console.log(25 ** (1/2)); //same result

console.log(Math.max(1,4,3,65,4,78));
console.log(Math.max(1,4,3,65,4,'78')); //it takes numbers inside strings but if it does not containe any words

console.log(Math.min(1,4,3,65,4,78,-10)); //works same as max

console.log(Math.PI * Number.parseFloat('10px') ** 2); // calculate area of circle

console.log(Math.trunc(Math.random() * 6) + 1);

const randomNum = (min,max) => Math.floor(Math.random() * (max - min +1)) + min
   
console.log(randomNum(10,20));

// Rounding integers

console.log(Math.round(23.4));//rounds to the closer number => 23
console.log(Math.round(23.9)); // => 24

console.log(Math.ceil(23.3));// this turnes the number to the bigger => 24
console.log(Math.ceil(23.9));// => 24

console.log(Math.floor(23.3));// this only reomoves the inegers
console.log(Math.floor(23.9));

console.log(Math.trunc(23.4)); // like floor

console.log(Math.trunc(-23.2)); // => -23
console.log(Math.floor(-23.3)); // => -24

// Rounding decimals

console.log((2.7).toFixed(0)); // => 3
console.log((2.7).toFixed(3)); // => 2.700
console.log((2.345).toFixed(2)); // => 2.35
console.log(+(2.345).toFixed(2)); // => 2.35


// Reminder operator

console.log(5 % 2); // => 1
console.log(5 / 2); // 5 = 2 * 2 +1 => 1 is the reminder of 5%2 

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 +2 Reminder => 2

const isEO = (num) => {
  if(num % 2 === 0) console.log(`your number is even: ${num}`);
  else{
    console.log(`your number is odd: ${num}`);
  }
}

isEO(3)
isEO(800)
isEO(333)

labelBalance.addEventListener('click',function(){
  const row = [...document.querySelectorAll('.movements__row')].forEach(function(n,i,){ 
  
    if(i % 2 ===0){
      n.style.backgroundColor = 'aqua';
    }else{
      n.style.backgroundColor = 'green';
    }
  });
  
})


// Numeric separators

// 234.45.000.000

const balanceRich = 234_45_000_000; // we use the _ to make the number clear 
console.log(balanceRich); // but the _ does not appear in console

const fee = 15_00;
const fee2 = 1_500; // ass we see there are the same numbers but we reed it diffrent
console.log(fee,fee2);



// Working with bigInt

console.log(2 ** 53 - 1); // this is the biggest number that js repesents => 9007199254740991 any number bigger than this can somtimes make bugs

console.log(Number.MAX_SAFE_INTEGER); // this gives the same 🤞

console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4); // somtimes true but usullay bugges

console.log(366748624464894973546377482654254298653n); // js will show this diffrent but when we put n it will quate be fixed
console.log(BigInt(366748624464894973546377482654254298653)); // same but without n

// operations 

console.log(100n + 3452n);

console.log(34124857619591564912765497n * 754923458643725543257n); // we can use the n for somthings like this 

// but we can not join big integers with small but we can do same ass down

const huge = 41486587456893764565234726545928n;
const small = 24;

// console.log(huge * small); // if we do it like this error
console.log(huge * BigInt(small)); // if we use BigInt then it works

// Exeptions

// booleans
console.log(20n > 12); // true
console.log(20n === 20); // false: because '20n' is BigInt and 20 is a normall
console.log(typeof 20n);
console.log(20n == 20); // true: because 2 '='

// string
console.log(huge + 'this is a large number');

// Devisions

console.log(10n / 3n); // it will give it for us without decimals => 3n
console.log(10 / 3); // => 3.333335


// Creating Dates

const now = new Date();
console.log(now);

console.log(new Date('March 06,2008')); // we can also pass strings
console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(year,month,day,hour,minute,second));
console.log(new Date(2027,2,6,5,30,3));

const dat = new Date(2027,2,6,5,30)

console.log(dat.getFullYear());
// console.log(dat.getMonth());
// console.log(dat.getDate());
// console.log(dat.getDay());
// console.log(dat.getHours());
// console.log(dat.getMinutes());
// console.log(dat.getSeconds());
console.log(dat.toISOString()); //this gives the date ass a logical way hard to read
console.log(dat.toDateString());//normal date
console.log(dat.getTime()); //this gives us the time since 1970 => 1804300200000
console.log(new Date(1804300200000)); // this will give us the same date of dat because it the same number from line 431
console.log(Date.now());// this will give us the number until owr date since 1970

dat.setFullYear(2040)//this will set a date base on our dat variable with the enterd year
console.log(dat);

// more of Dates 

// like we see below we can do also math with dates

const calcDaysPassed = (date1,date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
const result = calcDaysPassed(new Date(2025,5,12),new Date(2025,5,21))
console.log(result);


// formatting numbers

const num = 3987480;
const optionNum ={
  style:'currency',//unit,percent,currency
  unit:'celsius',
  currency:'TRY',
}

console.log('ARABIC  ', new Intl.NumberFormat('ar-EG',optionNum).format(num));
console.log('USA     ', new Intl.NumberFormat('en-US',optionNum).format(num));
console.log('GERMANY ', new Intl.NumberFormat('de-DE',optionNum).format(num));
console.log('Navigator language ', new Intl.NumberFormat(navigator.language,optionNum).format(num));

// Timeout

const ingredients = ['olives','mashroom'];
const pizzaTimer = setTimeout((ing1,ing2)=> console.log(`here is your pizza with ${ing1} and ${ing2}`),3000,...ingredients);//after the timeout we can enter arguments for the function

console.log('Waiting for my pizza');// the timeout execuits after the time is up and the lines after it execuits before it until it time is up

// we can also clear the timer or stop it
if(ingredients.includes('olives')) clearTimeout(pizzaTimer)

//second type of setInterval it runs every what ever time we put

setInterval(function(){
  const now2 = new Date();
  // console.log(`${now2.getHours()}:${now2.getMinutes()}:${now2.getSeconds()}`);
},1000)

const responsive = function(){
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    document.querySelector('.balance__date').textContent = '';
  }
}


responsive()
window.addEventListener('resize',responsive)
