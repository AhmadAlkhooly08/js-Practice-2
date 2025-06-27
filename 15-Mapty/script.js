"use strict";


const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const btnHistory = document.querySelector('.btn-history ')

class App{
  #map;
  #clicked;
  constructor(){
    this._getPosition();

    inputType.addEventListener('change',this._toggleElavationField.bind(this))
  }

  _getPosition(){
    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),()=> alert('couldnt accses your position'))
  }
  _loadMap(position){
    const {latitude} = position.coords;
    const {longitude} = position.coords;
    this.#map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);
    this._showForm();
  }

  _showForm(){
    this.#map.on('click',this._mapOnclick.bind(this))
  }
  _mapOnclick(e){
    const {lat,lng} = e.latlng;
    this.#clicked = [lat, lng]; 
    form.classList.remove('hidden');
    inputDistance.focus();
    L.marker(this.#clicked).addTo(this.#map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();
  }

  _toggleElavationField(){
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }
}

const app = new App();