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
const getCountryData = function(country){
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then((promise) => promise.json())
    .then((data) =>{
        renderCard(data[0])
        const neighbor = data[0]?.borders[0];

        return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
    })
    .then(promise => promise.json())
    .then(data => renderCard(data,'neighbour'))
    .catch((err) =>{
        renderError(`Something went wrong 💥💥 ${err.message}. try again`)
    })
    .finally(() =>{
        // ! the finally it works on the both sides then and catch
        countriesContainer.style.opacity = 1;
    })
}

back.addEventListener('click',function(e){
    e.preventDefault();
    countriesContainer.innerHTML = '';
    form.classList.remove('hidden');
    back.classList.add('hidden');
    inputInformation.value = '';
    inputInformation.focus();
})
form.addEventListener('submit',function(e){
    e.preventDefault();
    const country = inputInformation.value;
    if(!country) return;

    form.classList.add('hidden')
    getCountryData(country);
    back.classList.remove('hidden');
})

// btn.addEventListener('click',function(){
//     form.classList.add('hidden')
//     getCountryData('jordan');
//     btn.classList.add('hidden');
// })