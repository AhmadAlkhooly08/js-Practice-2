"use strict";

class Workout {
  date = new Date();
  id = Math.floor(100000 + Math.random() * 900000);
  clicks = 0;

  constructor(coords, distance, duration) {
    // this.date = ...
    // this.id = ...
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    // this.type = 'cycling';
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

///////////////////////////////////////
// APPLICATION ARCHITECTURE
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const btnHistory = document.querySelector('.btn-history ');
const btnDropDown = document.querySelector('.dot-button');
const btnSort = document.querySelector('.btn-sort');
class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];
  #workoutMarkers= [];
  #editingWorkout = null;
  #sortAscending = true

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    btnHistory.addEventListener('click',this.reset.bind(this));
    btnSort.addEventListener('click',this._sortWorkouts.bind(this))
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
      '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    if (!this.#mapEvent) return;
    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;

      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    if(this.#editingWorkout){
      const index = this.#workouts.findIndex(w=>{
        return w.id === this.#editingWorkout.id;
      })
      workout.id = this.#editingWorkout.id;
      this.#workouts[index] = workout;

      // Add higlight on the editing workout

      const smooth = document.querySelector(`.workout[data-id="${workout.id}"]`);
      if(smooth){
        smooth.classList.add('fade-out');

        setTimeout(()=>{
          smooth.remove();
          this._renderWorkout(workout);

          const highlight = document.querySelector(`.workout[data-id="${workout.id}"]`);
          if(workout.type === 'running'){
            highlight.classList.add('highlighted-running');
            setTimeout(()=> highlight.classList.remove('highlighted-running'),2000)
          }
          if(workout.type === 'cycling'){
            highlight.classList.add('highlighted-cycling');
            setTimeout(()=> highlight.classList.remove('highlighted-cycling'),2000)
          }    
        },300);
      }
      this.#editingWorkout = null;

      this._hideForm();
      this._setLocalStorage();
      return;
    }else{
      // Add new object to workout array
      this.#workouts.push(workout);
    }


    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
   const marker = 
    L.marker(workout.coords)
    .addTo(this.#map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: `${workout.type}-popup`,
      })
    )
    .setPopupContent(
      `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
    )
    .openPopup(); 
    
    this.#workoutMarkers.push({id:workout.id,marker})
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description} 
          <span class="dot-wrapper">
            <button class="dot-button">⋮</button>
            <ul class="dropdown hidden">
              <li class="dropdown__item edit">Edit</li>
              <li class="dropdown__item delete">Delete</li>
            </ul>
          </span>
        </h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    // BUGFIX: When we click on a workout before the map has loaded, we get an error. But there is an easy fix:
    if (!this.#map) return;
    let dropDown;
    if(e.target.classList.contains('dot-button')){
      dropDown = e.target.nextElementSibling;
      dropDown.classList.toggle('hidden');
      return
    }

    if(e.target.classList.contains('dropdown__item') && e.target.classList.contains('edit')){
      const workoutElEdit = e.target.closest('.workout');
      if(!workoutElEdit) return;

      
      const workoutEdit = this.#workouts.find(work =>{
        return work.id === +workoutElEdit.dataset.id;
      });
      if(!workoutEdit) return;
      form.classList.remove('hidden')
      inputDistance.focus();
      this._threeDotBtn();

      inputType.value = workoutEdit.type;
      inputDuration.value = workoutEdit.duration;
      inputDistance.value = workoutEdit.distance

      this.#mapEvent ={
        latlng: {
          lat: workoutEdit.coords[0],
          lng: workoutEdit.coords[1],
        },
      }

      if(workoutEdit.type === 'running'){
        inputCadence.value = workoutEdit.cadence;

        inputElevation.closest('.form__row').classList.add('form__row--hidden');
        inputCadence.closest('.form__row').classList.remove('form__row--hidden');
      }
      if(workoutEdit.type === 'cycling'){
        inputElevation.value = workoutEdit.elevationGain;
        inputCadence.closest('.form__row').classList.add('form__row--hidden')
        inputElevation.closest('.form__row').classList.remove('form__row--hidden')
      }

      this.#editingWorkout = workoutEdit;

    }

    if(e.target.classList.contains('dropdown__item') && e.target.classList.contains('delete')){
      const selectWorkout = e.target.closest('.workout');
      if(!selectWorkout) return;

      const find = this.#workouts.findIndex((workout) =>{
        return workout.id === +selectWorkout.dataset.id;
      });
      const findMarker = this.#workoutMarkers.findIndex((marker)=>{
        return marker.id === this.#workouts[find].id;
      })
      selectWorkout.classList.add('fade-out')
      setTimeout(()=> selectWorkout.remove(),2000);
      this.#workoutMarkers[findMarker].marker.remove();
      this.#workoutMarkers.splice(findMarker,1);
      this.#workouts.splice(find,1);
      this._setLocalStorage();
      return;
    }

    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === +workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    

    // using the public interface
    // workout.click();
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data.map(obj => {
      if (!obj || !obj.type) return null;
      if (obj.type === 'running') {
        const run = new Running(obj.coords, obj.distance, obj.duration, obj.cadence);
        run.id = obj.id;
        run.date = new Date(obj.date);
        return run;
      }
  
      if (obj.type === 'cycling') {
        const cycle = new Cycling(obj.coords, obj.distance, obj.duration, obj.elevationGain);
        cycle.id = obj.id;
        cycle.date = new Date(obj.date);
        return cycle;
      }
  
      return null;
    }).filter(Boolean); // remove any nulls
  
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }
  reset(){
    localStorage.removeItem('workouts');
    location.reload();
  }

  _threeDotBtn(){
    const dropdownMenu = document.querySelectorAll('.dropdown');
    dropdownMenu.forEach(menu => menu.classList.add('hidden'));
  }

  _sortWorkouts(e){
    this.#sortAscending = !this.#sortAscending;

    this.#workouts.sort((a,b) => this.#sortAscending ? b.distance - a.distance : a.distance - b.distance);
    console.log(this.#workouts);
    
    document.querySelectorAll('.workout').forEach(el=> el.remove());

    this.#workouts
      .filter(run=> run.type === 'running' )
      .forEach(work => this._renderWorkout(work));

    this.#workouts
      .filter(cycle=> cycle.type === 'cycling' )
      .forEach(work => this._renderWorkout(work));
  
  }
}

const app = new App();
