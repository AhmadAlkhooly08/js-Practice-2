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


console.log('-------Edabi-code------------------------');
function checkEquals(arr1, arr2) {
    let check;
    arr1.forEach(e => {
        for(let i =0; i< arr2.length; i++){
            if(e === arr2[i]) check = true;
            else check = false;
        }
    });
    console.log(check);
}
checkEquals([1, 2], [1, 3])
checkEquals([1, 2], [1, 2])
checkEquals([4, 5, 6], [4, 5, 6])
checkEquals([4, 7, 6], [4, 5, 6])