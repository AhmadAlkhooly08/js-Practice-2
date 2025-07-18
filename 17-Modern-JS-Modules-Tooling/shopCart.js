// exporting Modules
console.log('exporting Modules');

const shippingCost = 10;
const cart = [];


//! exports only work on top level code like we can not put it into if statment or other block code
export const addToCart = function(product,quantity){
    cart.push({product,quantity});
    console.log(`${quantity} ${product} added to your basket`);
}

const totalPrice = 276;
const totalCount = 12;

//!to shortcut then name we use as and set the name we want
export {totalPrice,totalCount as tq}