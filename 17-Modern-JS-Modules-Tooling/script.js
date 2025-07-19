// importing Modules
// import { addToCart,totalPrice,tq} from './shopCart.js';

console.log('importing Modules');

// addToCart('Protien bar','10');
// console.log(totalPrice,tq);

// import everything (*) as name from exporting file
import * as shoppingCart from './shopCart.js';

shoppingCart.addToCart('EGG',30);
console.log(shoppingCart.cart);
console.log('Total Price:', shoppingCart.totalPrice);

// import default

// import add , { addToCart,totalPrice,tq} from './shopCart.js';
// console.log(tq);
// add('dfd',10);


// import add,{cart} from './shopCart.js';

// add('Pizza',3)
// add('yogurt',1)
// add('patato',12);
// console.log(cart);

// import wheather from './shopCart.js';

// wheather('istanbul');
// wheather();

//! Top level Await only works in modules  
//^ NOT: top level await makes the execution slower or blockes it
// console.log('start feching');
// const res = await fetch('https://jsonplaceholder.typicode.com/users');
// const data = await res.json();
// console.log(data); 
// console.log('finish fetching');

const getRandomUser = async function(){
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();

    const random = Math.floor(Math.random() * data.length);

    return data[random];
}

//! Not clean code
// const getPromise = getRandomUser();
// getPromise.then(res => console.log(res);)

const getPromise = await getRandomUser();
console.log(getPromise);