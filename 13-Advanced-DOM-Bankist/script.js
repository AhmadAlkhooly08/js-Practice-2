'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScroll = document.querySelector('.btn--scroll-to')
const section_1 = document.querySelector('#section--1')

btnScroll.addEventListener('click',function(e){
  const s1Coord = section_1.getBoundingClientRect();
  console.log(s1Coord);
  
  console.log(e.target.getBoundingClientRect());
  console.log('cureent scroll (x,y', window.scrollX,window.scrollY);
  console.log('view Height,Width',document.documentElement.clientHeight,document.documentElement.clientWidth);

  // Scrolling
  // window.scrollTo(s1Coord.left + window.scrollX,s1Coord.top+window.scrollY)

  // window.scrollTo({
  //   left: s1Coord.left + window.scrollX,
  //   top: s1Coord.top+window.scrollY,
  //   behavior:'smooth',
  // })

  // this is the best way to do
  section_1.scrollIntoView({behavior:'smooth'})
})

// Scrolling with Nav section

// document.querySelectorAll('.nav__link').forEach(link =>{
//   link.addEventListener('click',function(e){
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     const select = document.querySelector(id)
//     select.scrollIntoView({behavior:'smooth'})
//   })
// })

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    const select = document.querySelector(id)
    select.scrollIntoView({behavior:'smooth'})
  }
})

///lectures
// ////////////////////////////////////////

//Selecting, Creating, and Deleting Elements

// Selecting
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const allSections = document.querySelectorAll('.section');//this is a node list
console.log(allSections);

const header = document.querySelector('.header')
document.getElementById('section--1')

const allBtn = document.getElementsByTagName('button');//this returns htmlCollection wich is live if we delete a btn it will automaticly ben deleted from here
console.log(allBtn);
console.log(document.getElementsByClassName('btn'));//this also returns a live html collection

// Creating

// insertAdjecentHtml

const message = document.createElement('div');

message.classList.add('cookie-message');

message.innerHTML = 'We use cookies for improved functionality and analyitics. <button class="btn btn--close--cookie">Got it!</button>';

// header.prepend(message) this puts it in the first of the header
header.append(message) // and this in the last
// header.append(message.cloneNode(true)) // this makes a copy

// header.before(message)
// header.after(message) these are the same

// Deleting Elements

document.querySelector('.btn--close--cookie').addEventListener('click',function(){
  message.remove();
})


// Styles, Attributes and Classes

// Styles
message.style.backgroundColor = '#37383d'
message.style.width = '50%'
message.style.height = '70px'
message.style.borderRadius = '8px';

console.log(message.style.color);//this will not appear because we can not take data from css

console.log(message.style.backgroundColor);//but this will appear because we gived it a value here

console.log(getComputedStyle(message).fontSize);//with this function we can take css data

// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px'; //we use parseFloat because getComputedStyle returns string so we can not decrease string from a number

// document.documentElement.style.setProperty('--color-primary','orangered')//we can change properties like this⁡

// Attributes

// Note:Attributes are class,src,id and more

const logo = document.querySelector('.nav__logo');

console.log(logo.className);

logo.alt = 'beautiful design by Ahmad'
console.log(logo.alt);

// NON
console.log(logo.desiner);
console.log(logo.getAttribute('desiner')); //this works

logo.setAttribute('company','Bankist')

console.log(logo.src);//when we do this it will not give us the real url
console.log(logo.getAttribute('src'));//but this will give us

const link = document.querySelector('.nav__link--btn')

console.log(link.href);
console.log(link.getAttribute('href'));

// Data Attributes
console.log(logo.dataset.valueNumber);

// Classes

logo.classList.add('c','j')
logo.classList.remove('c','j')
logo.classList.toggle('c','j');
logo.classList.contains('c','j');

// EventLiteners

const h1 = document.querySelector('h1');
const alertH1 = function(e){
  alert('AddEventListener: Great your reading')

  h1.removeEventListener('mouseenter',alertH1);//this removes the Event if it runs 1 time
}

// h1.addEventListener('mouseenter',alertH1);

// thi is another way that also works
// h1.onmouseenter = function(e){
//   alert('Good!')
// }⁡

// this is a way we use at html
// <!-- <h1 onclick="alert('Html alert')"> --⁡

const randomInt = (min,max) => {
  return Math.floor(Math.random() * (max - min +1) + min)
}
const randomColor = ()=> `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
console.log(randomColor(0,255));

// Example of how Event Listeners works

document.querySelectorAll('.nav__link').addEventListener('click',function(e){
  e.preventDefault();
  // this.style.backgroundColor = randomColor(
  console.log('Link',e.target,e.currentTarget);
  console.log(e.currentTarget === this);

  // if we want to stop it run to the parents 
  // e.stopPropagation();
})  

document.querySelector('.nav__links').addEventListener('click',function(e){
  // this.style.backgroundColor = randomColor()
  console.log('Container',e.target,e.currentTarget);
})

document.querySelector('.nav').addEventListener('click',function(e){
  // this.style.backgroundColor = randomColor();
  console.log('Nav',e.target,e.currentTarget);
})