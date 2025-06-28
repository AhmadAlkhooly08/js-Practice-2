"use strict";


class Workout{
  #date = new Date();
  #id = Math.floor(100000 + Math.random() * 900000);


  constructor(coords,duration,distance){
    this.coords = coords
    this.duration = duration;
    this.distance = distance;
    this.setDes();
  }

  get id(){
    return this.#id;
  }

  setDes(){
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return this.discription = `${this.type} on ${months[this.#date.getMonth()]} ${this.#date.getDate()}`

  }
}

class Running extends Workout{
  type = 'running';

  constructor(coords,duration,distance,cadence){
    super(coords,duration,distance);
    this.cadence = cadence;
    this.calcPace();
    this.setDes();

  }

  calcPace(){
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout{
  type = 'cycling';

  constructor(coords,duration,distance,elevation){
    super(coords,duration,distance);
    this.elevation = elevation;
    this.calcSpeed();
    this.setDes();
  }

  calcSpeed(){
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

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
  #workout;
  #workouts = [];
  constructor(){
    this._getPosition();

    inputType.addEventListener('change',this._toggleElavationField.bind(this))
    form.addEventListener('submit',this._newWorkout.bind(this))
    
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
  }

  _toggleElavationField(){
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e){
    e.preventDefault();
    let allData,check;
    const durationData = +inputDuration.value;
    const distanceData = +inputDistance.value;
    const type = inputType.value;

    if(type === 'running'){
      const cadenceData = +inputCadence.value;
      allData = [durationData,distanceData,cadenceData];
      check = allData.every(data => data > 0 && data !== undefined);
      this.#workout = new Running(this.#clicked,...allData)
    }
    if(type === 'cycling'){
      const elevationData = +inputElevation.value;
      allData = [durationData,distanceData,elevationData];
      check = [durationData,distanceData].every(data => data > 0 && data !== undefined);
      this.#workout = new Cycling(this.#clicked,...allData);
    }
    console.log(this.#workout);

    if(check){
      this.#workouts.push(this.#workout)

      // render Workout maker
        this._renderWorkoutMarker();
    
      // render Workout List
       this._renderWorkoutList()
  
      // hide form
      form.classList.add('hidden');
      inputDuration.value = inputDistance.value = inputCadence.value = inputElevation.value = '';
  
    }    

    if(!check){
      alert('data must be a number bigger than zero ')
    }


  }

  _renderWorkoutMarker(){
    L.marker(this.#clicked).addTo(this.#map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: `${this.#workout.type}-popup`,
      })
    )
    .setPopupContent(
      `${this.#workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${this.#workout.discription}`
    )
    .openPopup()

  }
  _renderWorkoutList(){
    let html = `
    <li class="workout workout--${this.#workout.type}" data-id="${this.#workout.id}">
        <h2 class="workout__title">${this.#workout.discription}</h2>
        <div class="workout__details">
          <span class="workout__icon">${this.#workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
          <span class="workout__value">${this.#workout.duration}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${this.#workout.distance}</span>
          <span class="workout__unit">min</span>
        </div>
  `;

  if(this.#workout.type === 'running'){
    html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${this.#workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${this.#workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li> 

    `
  }
  if(this.#workout.type === 'cycling'){
    html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${this.#workout.speed.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${this.#workout.elevation}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li> 

    `
  }
  form.insertAdjacentHTML("afterend",html)

  }
}

const app = new App();