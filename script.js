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

const shopCart2 =  (function(){
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 276;
    const totalQuantity = 23;

    const addToCart = function(product,quantity){
        cart.push({product,quantity});
        console.log(`${quantity} ${product} added to your basket`);
    }

    const orderStock = function(product,quantity){
        cart.push({product,quantity});
        console.log(`${quantity} ${product} ordered from supplier`);
    }

    return {
        cart,
        shippingCost,
        totalPrice,
        totalQuantity,
        addToCart
    }
})();

console.log(shopCart2);
shopCart2.addToCart('pizza',3);
shopCart2.addToCart('apple juice',3);

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state ={
    cart:[
        {product:'milk', quantity: 3},
        {product:'juice', quantity: 2},
        {product:'burger', quantity: 4},
    ],
    user:{gotlogin:true}
}

const checkStateCopy = Object.assign({},state);

const checkDeepCopy = cloneDeep(state);

state.user.gotlogin = false;
console.log(checkStateCopy);
console.log(checkDeepCopy);