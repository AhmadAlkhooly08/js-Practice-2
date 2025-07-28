"use strict";
let budget = Object.freeze([
  { value: 250, description: "Sold old TV 📺", user: "matilda" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.ahmad = 800; //!because Object.freeze this wont work

// const limit = spendingLimits[user] ? spendingLimits[user] : spendingLimits[user] = 0;
const getLimit = (limit, user) => limit?.[user] ?? 0;

// Pure Function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = "jonas"
) {
  // if (!user) user = 'jonas';
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
console.log(newBudget1);
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  "Going to movies 🍿",
  "Matilda"
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, "Stuff", "Jay");

console.log(newBudget1);
console.log(newBudget2);
console.log(newBudget3);

const checkExpenses = function (state, limit) {
  return state.map((entry) => {
    return entry.value < -getLimit(limit, entry.user)
      ? { ...entry, flag: "limit" }
      : entry;
  });
};
const finalBudget = checkExpenses(newBudget3, spendingLimits);

console.log(finalBudget);

const bigExpenses = function (state, limit) {
  const bigExpence = state
    .filter((entry) => entry.value <= -limit)
    .map((entry) => entry.description.slice(-2))
    .join(" / ");
    //! .reduce((str,cur) => `${str} / ${cur.description.slice(-2)}`,'')


  // let output = "";
  // budget.forEach((el) => {
  //   output += el.value >= -limit ? `${el.description.slice(-2)} / ` : "";
  // });
  // output = output.slice(0, -2); // Remove last '/ '
  console.log(bigExpence);
};
bigExpenses(finalBudget, 500);
console.log(finalBudget);

let usersBalance = {};
const totalBalance = function(){
  finalBudget.forEach(entry =>{
    const user = entry.user.toLowerCase();

    if(!usersBalance[user]){
      usersBalance[user] ={
        user: entry.user,
        TotalIncom:0,
        TotalExport:0,
        Balance:0
      }
    }
    if(entry.value > 0) usersBalance[user].TotalIncom += entry.value;
    if(entry.value < 0) usersBalance[user].TotalExport += entry.value;

    usersBalance[user].Balance= usersBalance[user].TotalIncom + usersBalance[user].TotalExport;
  })
}
totalBalance();
console.log(usersBalance);