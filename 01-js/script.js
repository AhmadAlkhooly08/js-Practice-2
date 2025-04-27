//video 1 to 4

/*
let js = 'amazing';
console.log(50 + 654 - 143 + 1094 - 800 + 45)
let FirstName = 'AHMAD';
console.log(FirstName)
let PI = 3.45 * 55 + 60;
let PI2 = 45 + 44 - 34;
console.log(PI - PI2)
let country = 'egypt';
let containet = 'afrika';
let popolation = '90 million'
console.log(country)
console.log(containet)
console.log(popolation)
*/

// video 5

/*
let jsIsFun = true;
let jsIsboring = false;
console.log(jsIsFun)
console.log(jsIsboring)
console.log(typeof jsIsboring)
console.log(typeof 32)
console.log(typeof 'Ahmad')
jsIsFun = 'Yes!'
console.log(jsIsFun)
let year;
console.log(year)
console.log(typeof null)
*/

// video 6

/*
// let: is enable to be changed it can be emrty
let age = 16;
age = 17;
let cc;
// const: it can not be changed and it can not be empty
const name = 'Ahmad'
name = 'mohammed' //error x
const birth; //error x
// var: it is the old way to defined veribals it works like let it is not good to use
*/

/*
//video 7
// math: * = çarpma  / = bölme  2 ** 3 = 2 x 2 x 2
const now = 2025;
const ahmadAge = now - 2008;
const mamaAge = now - 1972;
console.log(ahmadAge, mamaAge)
console.log(ahmadAge * 3, mamaAge / 3)
const firstName = 'Ahmad';
const lastName = 'Alkhooly';
console.log(firstName + ' ' + lastName)
// Asigment operaters : =,+=,
let x = 10 + 5; //15
x += 10; //x = x + 10 = 25
x *= 2;  //x = x * 2 = 50
x++;     //x = x + 1 =51
x--;
console.log(x)

// comparison operators
console.log(ahmadAge < mamaAge) // >,<,>=,<=
console.log(ahmadAge >= 18)
*/

/*
const now = 2025;
const ahmadAge = now - 2008;
const mamaAge = now - 1972;
console.log(now - 2008 < now - 1972)
let x, y;
x = y = 10 - 3 + 6;
console.log(x, y)
// let avregeAge = ahmadAge + mamaAge/2 this is rong it will devide first the one in the bottom is true
let avregeAge = (ahmadAge + mamaAge) / 2
console.log(ahmadAge + '+' + mamaAge + '/2' + '=' + avregeAge)
*/
/*
const firstName = 'Ahmad';
const job = 'student';
const age = 2008;
const year = 2025;
const Ahmad = "hello I'm " + firstName + ' I am a ' + job + ' and i am ' + (year - age) + ' years old';
console.log(Ahmad)
const newAhmad = `hello I'm ${firstName} I am a ${job} and i am ${year - age} years old`
console.log(newAhmad)
console.log('Ahmad \n\
is the \n\
boos')
console.log(`Ahmad
is the
boss`)
*/
/*
const age = 16;
if (age >= 18) {
                         console.log('you can start driving 🚗')
} else {
                         const yearLeft = 18 - age;
                         console.log(`you are to young come back after ${yearLeft} years :)`)
}
let birthYear = 2909;
let century;
if (birthYear <= 2000) {
                         century = 20;
} else {
                         century = 21;
}
console.log(century)
// type convertion : we covert numbers to strings but we can not convert strings to number it will give us NAN and the same thing to boolean
const a = '2122';
console.log(Number(a), a)
console.log(Number('Ahmad'))
console.log(String(123), 123)

// type coercion :
console.log('I am ' + 17 + ' years');
console.log('I am ' + '17 ' + 'years');
console.log('23' - '10' - 3, '23' + '10' + 3)
console.log('10' * '3', '234' / '4')
let n = '1' + 1;
n -= 1;
console.log(n)
console.log(2 + 3 + 4 + '5', '10' - '4' - '3' - 2 + '5')
*/
/*
// 5 falsy values : 0,'',undifeind,NAN,null. they will be false when we convert them to boolean 
console.log(Boolean(undefined))
console.log(Boolean(0))
console.log(Boolean('ahmad'))
console.log(Boolean(''))
console.log(Boolean({}))
const money = 1200;
if (money <= 990) {
  console.log(`don't spent it invest it`)
} else if (money !== 1000) {
    console.log('you much have 1000 thousend')
} else {
  console.log(`you don't have any mony get an job`)
}
const favriot = Number(prompt('guess what is the 3 numbers between 1 & 20'));
if (favriot === 7) {
  console.log(`oohh ${favriot} you guessed it`);
} else if (favriot == 10) {
  console.log(`oohh ${favriot} you guessed it`);
} else if (favriot == 16) {
  console.log(`oohh ${favriot} you guessed it`);
} else {
  console.log(`you couldn't guess it it was 7,10,16`)
}
*/
const lisens = false;
const eyes = true;
console.log(lisens && eyes) //false
console.log(lisens || eyes)// true
console.log(!lisens)//true 
// if (lisens && eyes) {
//                          console.log(' you can drive')
// } else {
//                          console.log('you can not drive')
// }
const tierd = false;
if (lisens && eyes && !tierd) {
  console.log(' you can drive')
} else {
  console.log('you can not drive')
}

const scoreDolphinst = 96 + 108 + 89;
const scoreKoalas = 880 + 91 + 110;
if (scoreDolphinst > scoreKoalas && scoreDolphinst >= 100) {
  console.log('Dolphins win the trophy')
} else if (scoreKoalas > scoreDolphinst && scoreKoalas >= 100) {
  console.log('Koalas win the trophy')
} else if (scoreDolphinst === scoreKoalas && scoreDolphinst >= 100 && scoreKoalas >= 100) {
  console.log('Both win the trophy')
} else {
  console.log('no one wen the chalenge')
}
const day = 'Friday';
switch (day) {
  case 'monday':
    console.log('coding');
    break;
  case 'tuesday':
  case 'wednesday':
    console.log('school')
    break;
  case 'thursday':
  case 'Friday':
    console.log('Quran');
    break;
  case 'saturday':
  case 'sunday':
    console.log('sport');
  default:
    console.log('there is no days selected')
}
if (day === 'monday') {
  console.log('coding');
} else if (day === 'tuesday' || day === 'wednesday') {
  console.log('school');
} else if (day === 'thursday' || day === 'Friday') {
  console.log('Quran');
} else if (day === 'saturday' || day === 'sunday') {
  console.log('sport');
} else {
  console.log('there is no days selected')
}
const relogine = 'muslim';
(relogine === 'muslim') ? console.log('i love you') : console.log('you have to be muslim')
let compair = relogine === 'muslim' ? 'i love you' : 'you have to be muslim';
console.log(compair)
console.log(`to go to jannah we have to be a real musilms ${(relogine === 'muslim') ? 'i love you' : 'you have to be muslim'}`);

const bill = 400;
const tip = bill <= 300 && bill >= 30 ? 15 / 100 * bill : 20 / 100 * bill;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`)