'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
        countriesContainer.style.opacity = 1;

}
function countieandNeghibor(country){
    // Ajax call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener('load',() => {
        const [data] = JSON.parse(request.responseText);
        console.log(data);
        
        // Render country
        renderCard(data);

        // get neghibor country

        // Ajax call country 1
        const neghiborcountry = data?.borders[0];
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v2/alpha/${neghiborcountry}`);
        request2.send();

        request2.addEventListener('load',function(){
            const data2 = JSON.parse(request2.responseText);
            renderCard(data2,'neighbour')
        })
    })
}

// countieandNeghibor('jordan');
// countieandNeghibor('turkey');
countieandNeghibor('saudi arabia');
