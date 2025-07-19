// exporting Modules
console.log('exporting Modules');

// block code 
//! console.log('start fetching');
//! await fetch('https://jsonplaceholder.typicode.com/users');
//! console.log('finished` fatching');

const shippingCost = 10;
export const cart = [];


//! exports only work on top level code like we can not put it into if statment or other block code
export const addToCart = function(product,quantity){
    cart.push({product,quantity});
    console.log(`${quantity} ${product} added to your basket`);
}

const totalPrice = 276;
const totalCount = 12;

//!to shortcut then name we use as and set the name we want
export {totalPrice,totalCount as tq,shippingCost};

// export default function(product,quantity){
//     cart.push({product,quantity});
//     console.log(`${quantity} x ${product} added to your basket`)
// } 

// wheather

export default function(city){
    if(!city){
        console.error('coudnt find city');
    }
    console.log(`The weather in ${city} tomorow probobly will be sunny`);
}