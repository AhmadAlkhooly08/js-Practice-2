'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const inputInformation = document.querySelector('.input');
const form = document.querySelector('.information');
const back = document.querySelector('.remove');
inputInformation.focus();

const renderCard = function(data, neghbor = ''){
    const html = `
        <article class="country ${neghbor}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
        </article>

    `;
        countriesContainer.insertAdjacentHTML("beforeend",html);
        // countriesContainer.style.opacity = 1;

}

const renderError = function(msg){
    countriesContainer.insertAdjacentText("beforeend",msg);
    // countriesContainer.style.opacity = 1;
}

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

const getcountry = function(url,err =''){
    return fetch(url).then(promise =>{
        if(!promise.ok){
            throw new Error(`${err}`)
        }
        return promise.json();
    })
}
let coords;

const whereAmI = function(lat,lng){
    getcountry(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,'coudnt reach to position')
    .then(data => {
        console.log(`you live in ${data.city},${data.countryName} adress: ${data.countryName},${data.city},Beylikduzu,${data.locality} with postcode:${data.postcode}`);  
        const getdataposition = data.countryCode;
        return getcountry(`https://restcountries.com/v2/alpha/${getdataposition}`,'coudnt find country')
    })
    .then(data => {
        renderCard(data)
    })
    .catch(err =>{
        renderError(`Something went wrong 💥💥 . try again`)
    })
    .finally(()=>{
        countriesContainer.style.opacity = 1;
    })
}
const position = function(){
    navigator.geolocation.getCurrentPosition(positin =>{
        const {latitude,longitude} = positin.coords;
        console.log(latitude,longitude);
        btn.addEventListener('click',function(){
            btn.classList.add('hidden');
            whereAmI(latitude,longitude);
        })
        
    },()=>{
        console.error('position undefiend');
    });
}
position();


