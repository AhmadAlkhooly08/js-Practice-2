"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const inputInformation = document.querySelector(".input");
const form = document.querySelector(".information");
const back = document.querySelector(".remove");
const h1 = document.querySelector(".h1");
inputInformation.focus();

const renderCard = function (data, neghbor = "") {
  const html = `
        <article class="country ${neghbor}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
            </div>
        </article>

    `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// function countrieCards(country){
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load',() => {
//         const [data] = JSON.parse(request.responseText);
//         console.log(data);
//         const html = `
//         <article class="country">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//             </div>
//         </article>

//         `;
//         countriesContainer.insertAdjacentHTML("beforeend",html);
//         countriesContainer.style.opacity = 1;

//     })
// }

// countrieCards('egypt');
// countrieCards('turkey');
// countrieCards('saudi arabia');

//! displaying neighbor country
// function countieandNeghibor(country){
//     // Ajax call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load',() => {
//         const [data] = JSON.parse(request.responseText);
//         console.log(data);

//         // Render country
//         renderCard(data);

//         // get neghibor country

//         // Ajax call country 1
//         const neghiborcountry = data?.borders[3];
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v2/alpha/${neghiborcountry}`);
//         request2.send();

//         request2.addEventListener('load',function(){
//             const data2 = JSON.parse(request2.responseText);
//             renderCard(data2,'neighbour')
//         })
//     })
// }

// countieandNeghibor('jordan');
// countieandNeghibor('turkey');
// countieandNeghibor('saudi arabia');

//! Promises and the Fetch API

// const getCountryData = function(country){
//     fetch(`https://restcountries.com/v2/name/${country}`).then(function(promise){
//         console.log(promise);
//         return promise.json();
//     }).then(function(data){
//         console.log(data);
//         renderCard(data[0]);
//     })
// }

// const getCountryData = function(country){
//     fetch(`https://restcountries.com/v2/name/${country}`)
//     .then((promise) =>{
//         if(!promise.ok){
//             throw new Error(`couldn't found Country Name. ${promise.status}`)
//         }
//         return promise.json()
//     })
//     .then((data) =>{
//         renderCard(data[0])
//         const neighbor = data[0]?.borders[0];

//         return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
//     })
//     .then(promise => promise.json())
//     .then(data => renderCard(data,'neighbour'))
//     .catch((err) =>{
//         renderError(`Something went wrong 💥💥 ${err.message}. try again`)
//     })
//     .finally(() =>{
//         // ! the finally it works on the both sides then and catch
//         countriesContainer.style.opacity = 1;
//     })
// }
// const getJson = function(url,error = ''){
//     return  fetch(url).then((promise) =>{
//                 if(!promise.ok){
//                     throw new Error(`${error} (${promise.status})`)
//                 }
//                 return promise.json()
//             })
// }
// const getCountryData = function(country){
//     getJson(`https://restcountries.com/v2/name/${country}`,'country not found')
//     .then((data) =>{
//         renderCard(data[0])
//         const neighbor = data[0]?.borders?.[0];
//         if(!neighbor) throw new Error('no neighbor found!!')
//         return getJson(`https://restcountries.com/v2/alpha/${neighbor}`,'Neighbor not found')
//     })
//     .then(data => renderCard(data,'neighbour'))
//     .catch((err) =>{
//         renderError(`Something went wrong 💥💥 ${err.message}. try again`)
//     })
//     .finally(() =>{
//         // ! the finally it works on the both sides then and catch
//         countriesContainer.style.opacity = 1;
//     })
// }

// back.addEventListener('click',function(e){
//     e.preventDefault();
//     countriesContainer.innerHTML = '';
//     form.classList.remove('hidden');
//     back.classList.add('hidden');
//     inputInformation.value = '';
//     inputInformation.focus();
// })
// form.addEventListener('submit',function(e){
//     e.preventDefault();
//     const country = inputInformation.value;
//     if(!country) return;

//     form.classList.add('hidden')
//     getCountryData(country);
//     back.classList.remove('hidden');
// })

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const getcountry = function(url,err =''){
//     return fetch(url).then(promise =>{
//         if(!promise.ok){
//             throw new Error(`${err}`)
//         }
//         return promise.json();
//     })
// }

// const whereAmI = function(lat,lng){
//     getcountry(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,'coudnt reach to position')
//     .then(data => {
//         console.log(`you live in ${data.city},${data.countryName} adress: ${data.countryName},${data.city},Beylikduzu,${data.locality} with postcode:${data.postcode}`);
//         const getdataposition = data.countryCode;
//         return getcountry(`https://restcountries.com/v2/alpha/${getdataposition}`,'coudnt find country')
//     })
//     .then(data => {
//         renderCard(data)
//     })
//     .catch(err =>{
//         renderError(`Something went wrong 💥💥 . try again`)
//     })
//     .finally(()=>{
//         countriesContainer.style.opacity = 1;
//     })
// }
// const position = function(){
//     navigator.geolocation.getCurrentPosition(positin =>{
//         const {latitude,longitude} = positin.coords;
//         console.log(latitude,longitude);
//         btn.addEventListener('click',function(){
//             btn.classList.add('hidden');
//             whereAmI(latitude,longitude);
//         })

//     },()=>{
//         console.error('position undefiend');
//     });
// }
// position();

// The Event Loop in Practice

// console.log('Teste Start');
// setTimeout(()=> console.log('0 seconds passed'),0);
// Promise.resolve('Resolved Promise 1').then(res => console.log(res));
// Promise.resolve('Resolved Promise 2').then(res =>{
//     for(let i =0; i < 10000; i++){}
//     console.log(res);
// });
// console.log('Test End');

//

// const discountPromis = new Promise(function(resolve,reject){
//     console.log('checking for discounts');
//     setTimeout(() =>{
//         if(Math.random() * 1 <= 0.5){
//             resolve('congrajulations you won a discount')
//         }else{
//             reject(new Error('you did not won a discount'));
//         }

//     },2000);
// });

// discountPromis.then(res => console.log(res)).catch(err => console.error(err));

// const wait = function(sec){
//     return new Promise(resolve => {
//         setTimeout(() =>{
//             resolve()
//         },sec * 1000);
//     })
// }

// wait(2).then(res =>{
//     console.log('waited 2 seconds');
//     return wait(1)
// }).then(res => console.log('waited 1 second '));

//! To let promise run immediatly with fullfield or reject
// Promise.resolve('abc').then(x => console.log(x))
// Promise.reject( new Error('!!!Problem')).catch(x => console.log(x))

// !Promisifying the Geolocation API

// const getPosition = function(){
//     return new Promise(function(resolve,reject){
//         // navigator.geolocation.getCurrentPosition(
//         //     position => console.log(resolve(position)),
//         //     err => console.error(reject(err))
//         // );
//         navigator.geolocation.getCurrentPosition(resolve,reject);
//     })
// }

// const renderWhere = function(){
//     getPosition()
//     .then(res => {
//         const {latitude,longitude} = res.coords;
//         console.log(latitude,longitude);
//         return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`)
//     })
//     .then(promise => promise.json())
//     .then(data => {
//         console.log(data);
//         const countryCode = data.countryCode;
//         return fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
//     })
//     .then(res => res.json())
//     .then(data =>{
//         btn.classList.add('hidden');
//         renderCard(data);
//     })
//     .catch(err => console.error(err))
//     .finally(()=> countriesContainer.style.opacity = 1)
// };

// btn.addEventListener('click',renderWhere);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const createImage = function(imglink){
//     return new Promise(function(resolve,reject){
//         const img = document.createElement('img');
//         img.src = imglink;
//         img.addEventListener('load',function(){
//             const father = document.querySelector('.images');
//             father.append(img);

//             resolve(img);
//         });

//         img.addEventListener('error',function(){
//             reject(new Error('somthing went wrong while loading the image'))
//         })
//     })
// }

// const wait = function(){
//     return new Promise(function(resolve){
//         setTimeout(()=> resolve(),3000)
//     })
// }

// createImage('./img/img-1.jpg')
// .then(img=>{
//     return wait().then(()=> img.style.display = 'none');
// })
// .then(img => createImage('./img/img-2.jpg'))
// .then(img => wait().then(()=> img.style.display = 'none'))
// .then(img => createImage('./img/img-3.jpg'))
// .then(img => wait().then(()=> img.style.display = 'none'))
// .catch(err => console.log(err))

// Async & Await

const position = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const getCountry = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v2/name/${country}`);

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();
    renderCard(data[0]);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);
  }
};

const whereUser = async function () {
  try {
    const pos = await position();
    const { latitude, longitude } = pos.coords;

    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    );

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();
    const code = data.countryCode;
    const poscountry = await fetch(
      `https://restcountries.com/v2/alpha/${code}`
    );
    if (!poscountry.ok) throw new Error("Something went wrong");
    const get = await poscountry.json();
    renderCard(get);
    return `you live in ${data.city},${data.countryName}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`Something went wrong 💥 ${err.message}`);

    // reject the promise returned from the async function
    throw err;
  }
};

back.addEventListener("click", function (e) {
  e.preventDefault();
  countriesContainer.innerHTML = "";
  form.classList.remove("hidden");
  btn.classList.remove("hidden");
  h1.classList.remove("hidden");
  back.classList.add("hidden");
  inputInformation.value = "";
  inputInformation.focus();
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const country = inputInformation.value;
  if (!country) return;

  form.classList.add("hidden");
  btn.classList.add("hidden");
  h1.classList.add("hidden");

  getCountry(country);
  back.classList.remove("hidden");
});

btn.addEventListener("click", function () {
  form.classList.add("hidden");
  btn.classList.add("hidden");
  h1.classList.add("hidden");
  back.classList.remove("hidden");
  whereUser();
});

//! async Function always returns a promise so  if we returned a other value it will be the Fulfield value of the promise

// console.log(1);
// // const d = getCountry();
// // console.log(d);
// whereUser().then(city => console.log(city)).catch(err => console.error()).finally(()=>console.log(3))

// (async function(){
//     try{
//         console.log(1);
//         const city = await whereUser();
//         console.log(city);
//         console.log(3);
//     } catch(err){
//         throw console.error(`2: ${err.message} 💥`);
//     }
// })();

const getData = function (country) {
  return fetch(country).then((res) => {
    if (!res.ok) {
      throw new Error("something wrong");
    }
    return res.json();
  });
};

//! Prmise.all
const get3countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getData(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getData(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getData(`https://restcountries.com/v2/name/${c3}`);
    // console.log([data1.capital,data2.capital,data3.capital]);

    const data = await Promise.all([
      getData(`https://restcountries.com/v2/name/${c1}`),
      getData(`https://restcountries.com/v2/name/${c2}`),
      getData(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map((data) => data[0].capital));
  } catch (err) {
    console.log(`!!!${err}`);
  }
};

get3countries("egypt", "turkey", "saudi arabia");

//! Promise.race
//^ Promis.race: it's like a race wich promise resolves or rejects the first it will be the returned Promise

(async function () {
  const race = await Promise.race([
    getData(`https://restcountries.com/v2/name/egypt`),
    getData(`https://restcountries.com/v2/name/italy`),
    getData(`https://restcountries.com/v2/name/china`),
  ]);
  console.log(race[0]);
})();

const waitReject = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(console.error("tooked to long"));
    }, sec * 1000);
  });
};

Promise.race([
  getData(`https://restcountries.com/v2/name/tanzania`),
  waitReject(5),
])
  .then((data) => console.log(data[0]))
  .catch((err) => console.error(err));


//! Promise.allSettled
//^ Promise.allSettled: returns all the results even if there is an rejected promise

Promise.allSettled([
    Promise.resolve('sucssed'),
    Promise.reject('faild'),
    Promise.resolve('sucssed'),
]).then(res => console.log(res));

//! diffrence between allSettled and all that all dosent complete if there is an rejected Promise
// Promise.all([
//     Promise.resolve('sucssed'),
//     Promise.reject('faild'),
//     Promise.resolve('sucssed'),
// ]).then(res => console.log(res))

//! Promise.any
// ^Promise.any: similar to race but this returns only the first resolved Promise and ignores the rejected ones 

(async function () {
    const race = await Promise.any([
      getData(`https://restcountries.com/v2/name/egypt`),
      getData(`https://restcountries.com/v2/name/italyhvh`),
      getData(`https://restcountries.com/v2/name/turkey`),
    ]);
    console.log(race[0]);
})();
  

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

// const createImage = function(imglink){
//     return new Promise(function(resolve,reject){
//         const img = document.createElement('img');
//         img.src = imglink;
//         img.addEventListener('load',function(){
//             const father = document.querySelector('.images');
//             father.style.opacity = 1;
//             father.append(img);

//             resolve(img);
//         });

//         img.addEventListener('error',function(){
//             reject(new Error('somthing went wrong while loading the image'))
//         })
//     })
// }

// const wait = function(){
//     return new Promise(function(resolve){
//         setTimeout(()=> resolve(),3000)
//     })
// }
// const loadNPause = async function(){
//     try{
//         let img = await createImage('./img/img-1.jpg');
//         await wait();
//         img.style.display = 'none';

//         img = await createImage('./img/img-2.jpg');
//         await wait();
//         img.style.display = 'none';

//         img = await createImage('./img/img-3.jpg');
//         await wait();
//         img.style.display = 'none';
//     } catch(err){
//         console.error(err);
//         throw err;
//     }
// }
// loadNPause();

// const loadAll = async function(imgArr){
//     try{
//         const imgs = imgArr.map(async img => await createImage(img));
//         console.log(imgs);
//         const combinator = await Promise.all(imgs);
//         combinator.forEach(img => img.classList.add('parallel')) 
    
//     } catch(err){
//         console.error(`💥 ${err}`);
//         throw err;
//     }
// }


// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'])