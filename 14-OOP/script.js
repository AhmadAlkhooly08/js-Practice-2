"use strict";

// Constructor Functions and the new Operator

const Person = function (firstName, birtYear) {
  // Instance properties
  this.firstName = firstName;
  this.birtYear = birtYear;
};
// with constructure function  we use the (new) methode. and arrow functions doesnt work
const Ahmad = new Person("Ahmad", 2008);
console.log(Ahmad);

const Matilda = new Person("Matilda", 2010);
const mehmed = new Person("mehmed", 1453);
console.log(Matilda, mehmed);

const jay = "jay";

console.log(Ahmad instanceof Person); //true
console.log(jay instanceof Person); //false
// in Constructor Functions when we call it with (new) method it runs in 4 steps

// 1. New empty object({}) is created
// 2. function is called, this = {}
// 3. {} is linked to a prototype
// 4. function automatically return {}⁡

// Prototypes

Person.hey = function () {
  console.log("hy there 👋🏿");
};

Person.hey(); // ? we can do this

//! Ahmad.hey() But this no figure way

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2025 - this.birtYear);
};

Ahmad.calcAge();

console.log(Ahmad.__proto__);
console.log(Ahmad.__proto__ === Person.prototype); // true

// Not: Person.prototype is not the prototype of person but it will be used as a prototype for all the objects created by the contructure function

console.log(Person.prototype.isPrototypeOf(mehmed)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //False

Person.prototype.country = "egypt";
console.log(Ahmad, mehmed);

console.log((Ahmad.country = "egypt"), (mehmed.country = "osmanli"));
console.log(Ahmad, mehmed);

console.log(Matilda.hasOwnProperty("birtYear")); //true
console.log(Matilda.hasOwnProperty("country")); //False because it is in the Person prototype

console.log(Ahmad.__proto__);
// Object.prototype(top of prototype chain)
console.log(Ahmad.__proto__.__proto__);

console.log(Ahmad.__proto__.__proto__.__proto__); //null

console.dir(Person.prototype.constructor);
console.log(Person.prototype.constructor);

const arr = [1, 1, 2, 2, 3, 3];

console.log(arr.__proto__);

console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir(h1);
console.dir((x) => x + 1);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  (this.make = make), (this.speed = speed);
};

const bmw = new Car("BMW", 120);
const Mercedes = new Car("Mercedes", 95);
console.log(bmw);
console.log(Mercedes);

Car.prototype.accelerate = function () {
  console.log(`${this.make} going at ${(this.speed += 10)} km/h`);
};
Car.prototype.brak = function () {
  console.log(`${this.make} going at ${(this.speed -= 5)} km/h`);
  return this;
};

bmw.accelerate();
bmw.brak();

Mercedes.accelerate();
Mercedes.brak();

// ES6 Classes

// class expretion

const PersonCl1 = class {};

// class decaloration

class PersonCl {
  constructor(fullName, birthYear) {
    (this.fullName = fullName), (this.birthYear = birthYear);
  }

  //* Instance method
  //* Methods will be added to .prototype property
  calcAge() {
    console.log(2025 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get country() {
    return "Egypt";
  }

  // set a property that alredy exists
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert("this is not a full name");
  }
  get fullName() {
    return this._fullName;
  }

  // ! Static Method
  static hey() {
    console.log("Hy there 👋🏿");
  }
}

const mahmoud = new PersonCl("Mahmoud Elazhary", 1950);
console.log(mahmoud);
mahmoud.calcAge();
console.log(mahmoud.__proto__ === PersonCl.prototype, mahmoud.country);

const walter = new PersonCl("walter new", 1980);

// PersonCl.prototype.greet = function(){
//     console.log(`Hey ${this.firstName}`);
// }
mahmoud.greet();

// ! 1. clases are not hoisted
// ? 2. clases are first class citizes
// ^ 3. clases are executed in strict mode

PersonCl.hey();
// ! it will not work on child proto it is linked on PersonCl prototype

// Setters and Getters

const account = {
  owner: "Ahmad",
  movements: [234, 5431, 5, 8765, 765],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set setter(mov) {
    return this.movements.push(mov);
  }, //it must contain a (mov)
};

account.setter = 50;

console.log(account.latest);

// Object.creat

const PersonProto = {
  calcAge() {
    console.log(2025 - this.birthYear);
  },
  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};

const steve = Object.create(PersonProto);

console.log(steve);
steve.init("steve", 2008);
steve.calcAge();

console.log(steve.__proto__ === PersonProto);

const Muslim = Object.create(PersonProto);

Muslim.init("Muslim", 2000);
console.log(Muslim);
Muslim.calcAge();

class acc {
  constructor(name, currency, pin) {
    (this.name = name),
      (this.currency = currency),
      (this.pin = pin),
      (this.movements = []);
  }

  deposit(d) {
    this.movements.push(d);
    // console.log(this.movements);
  }
  withdraw(w) {
    this.movements.push(-w);
    // console.log(this.movements);
  }

  get latest() {
    console.log(this.movements.slice(-1).pop());
  }

  set Setlatest(mov) {
    this.movements.push(mov);
  }

  static helper() {
    console.log(
      "we can not help you from here call us with your variable name"
    );
  }
}

const ahmad = new acc("Ahmad", "USD", 7191);

ahmad.deposit(300);
ahmad.deposit(100);
ahmad.withdraw(70);
ahmad.withdraw(30);
ahmad.deposit(400);
console.log(ahmad);

ahmad.Setlatest = Math.trunc(Math.random() * 100);
ahmad.latest;
acc.helper();

const vipAccount = Object.create(acc.prototype);

vipAccount.init = function (name, currency, pin) {
  (this.name = name), (this.currency = currency), (this.pin = pin);
};
vipAccount.init("VIP Account", "EUR", 9999);
vipAccount.movements = [];

vipAccount.deposit = acc.prototype.deposit;
vipAccount.deposit(1000);
vipAccount.deposit(500);

console.log(vipAccount);

///////////////////////////////////////
// Coding Challenge #2

//* 1. Re-create challenge 1, but this time using an ES6 class;

//& 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);

//* 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);

//& 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

//* DATA CAR 1: 'Ford' going at 120 km/h

//& GOOD LUCK 😀

class Return {
  constructor(make, plate, speed) {
    (this.make = make), (this.speed = speed), (this.plate = plate);
  }

  accelerate() {
    console.log(
      `${this.make} car with ${this.plate} went on ${(this.speed += 10)}speed`
    );
  }

  brak() {
    console.log(`${(this.speed -= 5)}`);
  }

  get speedUS() {
    console.log(`${this.speed / 1.6} mi/h`);
  }

  set speedUS(s) {
    this.speed = s * 1.6;
  }
}

const Ford = new Return("Ford", 345094923, 120);
Ford.speedUS = 90;
Ford.speedUS;
Ford.accelerate();

const toyotta = new Return("Toyotta", 245236743, 84);
toyotta.speedUS = 130;
toyotta.speedUS;
toyotta.accelerate();

console.log(Ford);
console.log(toyotta);

// Inheritance Between "Classes": Constructor Functions

const PersonF = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonF.prototype.calcAge = function () {
  console.log(2025 - this.birthYear);
};

const child = function (firstName, birthYear, course) {
  PersonF.call(this, firstName, birthYear);
  this.course = course;
};

child.prototype = Object.create(PersonF.prototype);
//! child.prototype = PersonF.prototype; this doesnt work at all
child.prototype.introduce = function () {
  console.log(
    `Hy My name is ${this.firstName} and i'm studiying ${this.course}`
  );
};

const hassan = new child("hassan", 2005, "computer scines");

hassan.introduce();
hassan.calcAge();
console.log(hassan.__proto__);
console.log(hassan.__proto__.__proto__);
console.log(hassan instanceof child);
console.log(hassan instanceof PersonF);
child.prototype.constructor = child;
console.dir(child.prototype.constructor);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};
const Tesla = new EV("Tesla", 120, 23);

Tesla.chargeBattery(90);
Tesla.accelerate();
console.log(Tesla.__proto__);

Tesla.chargeBattery(90);
Tesla.accelerate();
Tesla.brak();

// Class inheritance with ES6 classes

class PersonEC {
  constructor(fullName, birthYear) {
    (this.fullName = fullName), (this.birthYear = birthYear);
  }

  //* Instance method
  //* Methods will be added to .prototype property
  calcAge() {
    return 2025 - this.birthYear;
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get country() {
    return "Egypt";
  }

  // set a property that alredy exists
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert("this is not a full name");
  }
  get fullName() {
    return this._fullName;
  }

  // ! Static Method
  static hey() {
    console.log("Hy there 👋🏿");
  }
}

class studentEC extends PersonEC {
  constructor(fullName, birthYear, course) {
    // ! this always need to happen first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(
      `My name is ${
        this.fullName
      } im ${this.calcAge()} years old i'm studiying ${this.course}`
    );
  }

  calcAge() {
    return 2026 - this.birthYear;
  }
}

const ahmadY = new studentEC("Ahmad yaser", 2008, "cyber security");

ahmadY.introduce();

// *Inheritance Between "Classes": Object.create

const Person_Proto = {
  in(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
  calcAge() {
    return 2025 - this.birthYear;
  },
};

const mustafa = Object.create(Person_Proto);
console.log(mustafa);

const student = Object.create(Person_Proto);
student.in = function (firstName, birthYear, course) {
  Person_Proto.in.call(this, firstName, birthYear);
  this.course = course;
};
student.introduce = function () {
  console.log(
    `My name is ${
      this.firstName
    } im ${this.calcAge()} years old i'm studiying ${this.course}`
  );
};
console.log(student);

const ali = Object.create(student);
ali.in("Ali", 2000, "farmecy");
console.log(ali);
ali.calcAge();
ali.introduce();

// /////////////////////////////////////////
//! Encapsulation: Private Class Fields and Methods

//? 1) Public Fields
//? 2) Private Fields
//* 3) Public Methods
//* 4) Private Methods
class Account {
  //? 1) Public Fields
  locale = navigator.language;
  Bank = "Bankist";

  //? 2) Private Fields
  #movements = [];
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // this.movements = [];
    // this.locale = navigator.language;
    console.log(`thanks for oppening an account ${owner}`);
  }

  // public interFace (API)

  get movements() {
    return this.#movements;
    // Not chaininable
  }
  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  #approveLone(val) {
    return true;
  }

  emplementLoan(val) {
    if (this.#approveLone(val)) {
      this.deposit(val);
      console.log("loan improved");
    }
    return this;
  }
  #Balance() {
    return this.#movements.reduce((acc, cur) => acc + cur, 0);
  }

  get Balance() {
    return this.#Balance;
  }
}

const acc1 = new Account("Mehmed", "USD", 7191);

acc1
  .deposit(345)
  .deposit(645)
  .deposit(145)
  .withdraw(323)
  .withdraw(32)
  .emplementLoan(2000);
console.log(acc1.Balance());
console.log(acc1);

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class EVCl extends Car {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const Rivian = new EVCl("Rivian", 120, 23);

Rivian.chargeBattery(70).brak().accelerate();
Rivian.console.log(Rivian);
