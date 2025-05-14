'use strict';

///////////////////////////////////////
// Modal window

const header = document.querySelector('.header')
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const navContainer = document.querySelector('.nav')
const NavLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab')
const componentContainer = document.querySelector('.operations__tab-container');
const componentContent = document.querySelectorAll('.operations__content');
const btnScroll = document.querySelector('.btn--scroll-to')
const section_1 = document.querySelector('#section--1')
const allSections = document.querySelectorAll('.section');
const section1_img = document.querySelectorAll('.features__img')
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

NavLinks.addEventListener('click',function(e){
  e.preventDefault();
  
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    const select = document.querySelector(id)
    select.scrollIntoView({behavior:'smooth'})
  }
})

// Tab component

componentContainer.addEventListener('click',function(e){

  const clicked = e.target.closest('.operations__tab');
  if(!clicked) return;

  // removing classes
  componentContent.forEach(e => e.classList.remove('operations__content--active'))
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  
  // Adding classes
  document.querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`).classList.add('operations__content--active')

  clicked.classList.add('operations__tab--active')
})

// Menu fade animation

const refekter = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const sibilings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');

    sibilings.forEach(tar => {
      if(tar !== link) tar.style.opacity = this;
    })
    logo.style.opacity = this;
  }  
}

navContainer.addEventListener('mouseover',refekter.bind(0.5))

navContainer.addEventListener('mouseout',refekter.bind(1))

// Nav Fixed in scroll

// window.addEventListener('scroll',function(e){
//   if(section_1.getBoundingClientRect().top <= 1){
//     navContainer.classList.add('sticky')
//   }
//   if(window.scrollY == 0) navContainer.classList.remove('sticky')
// })


// sticky navigation: The Intersection Observer API

const navHeight = navContainer.getBoundingClientRect().height;
console.log(navHeight);
const headerCall = function(entries){
  const [entry] = entries; // this is same if we do = entries[0]
  if(!entry.isIntersecting) navContainer.classList.add('sticky')
  else navContainer.classList.remove('sticky')
}
const headerOption = {
  root:null,
  threshold:0,
  rootMargin: `-${navHeight}px`,
}
const headerObserver = new IntersectionObserver(headerCall,headerOption);
headerObserver.observe(header)

// Revealing Elements on Scroll
const revealSection = function(entries,observe){
  entries.forEach(entry =>{

    if(entry.isIntersecting) {
      entry.target.classList.remove('section--hidden')
      observe.unobserve(entry.target)
    }
  })
}

const allObserve = new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15,
})

allSections.forEach(section => {
  allObserve.observe(section)
  section.classList.add('section--hidden')
});

// Lazy Loading Images
section1_img.forEach(img => {

  const lazy = function(entries,observe){
    const [entry] = entries;
  
    if(entry.isIntersecting){
      entry.target.src = entry.target.getAttribute('data-src');
      entry.target.addEventListener('load',()=> {
        entry.target.classList.remove('lazy-img');
      })
      observe.unobserve(entry.target)
    }
  }
  const imgLazy = new IntersectionObserver(lazy,{
    root:null,
    threshold:0,
    rootMargin: '-200px',
  })  

  imgLazy.observe(img)
});

// Slider Section
const sliderSection = function(){
  const sliders = document.querySelectorAll('.slide');
  const slide = document.querySelector('.slider');
  const dotContainer = document.querySelector('.dots');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRihgt = document.querySelector('.slider__btn--right');
  let currentSlide = 0;
  const maxSlide= sliders.length -1;
  // Functions
  const goSlide = function(curSlid){
    sliders.forEach((slide,i)=>{
      slide.style.transform = `translateX(${100 *(i- curSlid)}%)`
    })
  }

  // Next right
  const creatDots = function(){
    sliders.forEach((_,i) =>{
      dotContainer.insertAdjacentHTML("beforeend",`<button class="dots__dot" data-slide="${i}"></button>`);
    })
  }
  const activatDots = function(slide){
    document.querySelectorAll('.dots__dot').forEach(e=> e.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  }
  const nextSlide = function(){
    if(currentSlide === maxSlide) currentSlide = 0;
    else currentSlide++;
    goSlide(currentSlide)
    activatDots(currentSlide)
  }
  const previoseSlide = function(){
    if(currentSlide === 0) currentSlide = maxSlide
    else currentSlide--;
    goSlide(currentSlide)
    activatDots(currentSlide)
  }

  const init = function(){
    goSlide(currentSlide)
    creatDots();
    activatDots(0);
  }
  init()
  // Events
  btnRihgt.addEventListener('click',nextSlide)
  // before left
  btnLeft.addEventListener('click',previoseSlide)

  document.addEventListener('keydown',function(e){
    console.log(e);
    if(e.key === 'ArrowRight') nextSlide()

    e.key === 'ArrowLeft' && previoseSlide()
  })

  dotContainer.addEventListener('click',function(e){
    if(e.target.classList.contains('dots__dot')){
      currentSlide = e.target.getAttribute('data-slide')
      goSlide(currentSlide)
      activatDots(currentSlide)
    }
  })

}  
sliderSection();
///lectures
// ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

//Selecting, Creating, and Deleting Elements

// Selecting
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

console.log(allSections);

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

document.querySelector('.nav__link').addEventListener('click',function(e){
  e.preventDefault();
  // this.style.backgroundColor = randomColor(
  console.log('Link',e.target,e.currentTarget);
  console.log(e.currentTarget === this);

  // if we want to stop it run to the parents 
  // e.stopPropagation();
})  

NavLinks.addEventListener('click',function(e){
  // this.style.backgroundColor = randomColor()
  console.log('Container',e.target,e.currentTarget);
})

document.querySelector('.nav').addEventListener('click',function(e){
  // this.style.backgroundColor = randomColor();
  console.log('Nav',e.target,e.currentTarget);
})


// DOM Traversing

  // Going Downwords: Child
const H1 = document.querySelector('h1');

console.log(H1.querySelectorAll('.highlight'));
console.log(H1.childNodes);
console.log(H1.children);

// H1.firstElementChild.style.color = 'white';
// H1.lastElementChild.style.color = 'white';

// Going Upwords : Parent

console.log(H1.parentNode);  
console.log(H1.parentElement);

// H1.closest('.header').style.background = 'var(--gradient-primary)';//the closest method if there is 2 parents with the same class name it choices the closest one 

// H1.closest('h1').style.background = 'var(--gradient-secondary)';

// Going sideways: siblings 

console.log(H1.parentElement.children);

console.log(H1.previousElementSibling); //if there is not any elemnts before it will give null
console.log(H1.nextElementSibling);

[...H1.parentElement.children].forEach(function(el){

  // if(el !== H1) el.style.transform = 'scale(0.5)'
})

document.addEventListener('DOMContentLoaded',function(e){
  console.log('Html paresd and dom tree build',e);
})
window.addEventListener('load',function(e){
  console.log('page finished loading',e);
})

window.addEventListener('Beforeunload',function(e){
  e.preventDefault()
  console.log(e);
  e.returnValue = ''
})
