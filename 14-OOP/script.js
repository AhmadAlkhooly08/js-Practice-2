'use strict';


// Constructor Functions and the new Operator


const Person = function(firstName,birtYear){
    // Instance properties
    this.firstName = firstName
    this.birtYear = birtYear

}
// with constructure function  we use the (new) methode. and arrow functions doesnt work
const Ahmad = new Person('Ahmad',2008);
console.log(Ahmad);

const Matilda = new Person('Matilda',2010);
const mehmed = new Person('mehmed',1453)
console.log(Matilda,mehmed);

const jay = 'jay';

console.log(Ahmad instanceof Person);//true
console.log(jay instanceof Person);//false
// in Constructor Functions when we call it with (new) method it runs in 4 steps

// 1. New empty object({}) is created
// 2. function is called, this = {}
// 3. {} is linked to a prototype
// 4. function automatically return {}⁡

// Prototypes

Person.hey= function(){
    console.log('hy there 👋🏿');
}

Person.hey() // ? we can do this

//! Ahmad.hey() But this no figure way

console.log(Person.prototype);

Person.prototype.calcAge = function(){
    console.log(2025 - this.birtYear);
}

Ahmad.calcAge()

console.log(Ahmad.__proto__);
console.log(Ahmad.__proto__ === Person.prototype); // true

// Not: Person.prototype is not the prototype of person but it will be used as a prototype for all the objects created by the contructure function

console.log(Person.prototype.isPrototypeOf(mehmed)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //False

Person.prototype.country = 'egypt';
console.log(Ahmad,mehmed);

console.log(Ahmad.country = 'egypt',mehmed.country = 'osmanli');
console.log(Ahmad,mehmed);

console.log(Matilda.hasOwnProperty('birtYear'));//true
console.log(Matilda.hasOwnProperty('country'));//False because it is in the Person prototype


console.log(Ahmad.__proto__);
// Object.prototype(top of prototype chain)
console.log(Ahmad.__proto__.__proto__);

console.log(Ahmad.__proto__.__proto__.__proto__);//null

console.dir(Person.prototype.constructor);
console.log(Person.prototype.constructor);

const arr = [1,1,2,2,3,3];

console.log(arr.__proto__);

console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function(){
    return [...new Set(this)]
}

console.log(arr.unique());

const h1 = document.querySelector('h1')
console.dir(h1);
console.dir(x => x + 1);


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

const Car = function(make,speed){
    this.make = make,
    this.speed = speed
}

const bmw = new Car('BMW',120)
const Mercedes = new Car('Mercedes',95)
console.log(bmw);
console.log(Mercedes);


Car.prototype.accelerate = function(){
    console.log(`${this.make} going at ${this.speed += 10} km/h`);
}
Car.prototype.brak = function(){
    console.log(`${this.make} going at ${this.speed -= 5} km/h`);
}

bmw.accelerate()
bmw.brak()

Mercedes.accelerate()
Mercedes.brak()


// ES6 Classes

// class expretion

const PersonCl1 = class{}

// class decaloration

class PersonCl{
    constructor(fullName,birthYear){
        this.fullName =fullName,
        this.birthYear = birthYear
    }

    //* Instance method
    //* Methods will be added to .prototype property
    calcAge(){
        console.log(2025 - this.birthYear);
    }

    greet(){
        console.log(`Hey ${this.fullName}`);
    }

    get country(){
        return 'Egypt'
    }

    // set a property that alredy exists
    set fullName(name){
        if(name.includes(' ')) this._fullName = name
        else alert('this is not a full name')
    }
    get fullName(){
        return this._fullName
    }

    // ! Static Method
    static hey(){
        console.log('Hy there 👋🏿');
    }
}

const mahmoud = new PersonCl('Mahmoud Elazhary',1950);
console.log(mahmoud);
mahmoud.calcAge()
console.log(mahmoud.__proto__ === PersonCl.prototype,mahmoud.country);

const walter = new PersonCl('walter new',1980)

// PersonCl.prototype.greet = function(){
//     console.log(`Hey ${this.firstName}`);
// }
mahmoud.greet()

// ! 1. clases are not hoisted
// ? 2. clases are first class citizes
// ^ 3. clases are executed in strict mode

PersonCl.hey()
// ! it will not work on child proto it is linked on PersonCl prototype

// Setters and Getters

const account = {
    owner:'Ahmad',
    movements: [234,5431,5,8765,765],

    get latest(){
        return this.movements.slice(-1).pop()
    },

    set setter(mov){
        return this.movements.push(mov)
    }//it must contain a (mov)
}

account.setter = 50

console.log(account.latest);