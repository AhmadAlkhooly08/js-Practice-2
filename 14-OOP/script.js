'use strict';


// Constructor Functions and the new Operator


const Person = function(firstName,birtYear){
    // Instance properties
    this.firstName = firstName
    this.birtYear = birtYear

    this.age = 2025 - birtYear
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

