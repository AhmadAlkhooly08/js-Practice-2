"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");


class Workout{
    
    date = new Date();
    #id = (Date.now() + '').slice(-12);

    constructor(coords,distance,duration){
        this.coords = coords;//[lat,lng]
        this.distance = distance;
        this.duration = duration;
    }

}

class Running extends Workout{
    constructor(coords,distance,duration,cadence){
        super(coords,distance,duration);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace(){
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout{
    constructor(coords,distance,duration,elavation){
        super(coords,distance,duration);
        this.elavation = elavation;
        this.calcSpeed();
    }

    calcSpeed(){
        // km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

//? /////////////////////////////////////////////
//? //////////////////////////////////////
//! App Arcitecture
class App{

    #map;
    #clicked;
    #workouts = [];
    #type;
    constructor(){
        this._getPosition();
        form.addEventListener('submit',this._newWorkout.bind(this))        
        inputType.addEventListener('change',this._toggleElavationField)

    }

    _getPosition(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function () {
                alert("couldnt accsess your position");
            })
        }
          
    }

    _loadMap(position){
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    
        const coords = [latitude, longitude];
        this.#map = L.map("map").setView(coords,13);
    
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);
    
        // & Handlingclicks on map
        this.#map.on('click',this._showForm.bind(this))       
    }

    _showForm(e){
        const {lat,lng} = e.latlng;
        this.#clicked = [lat,lng];
        form.classList.remove('hidden');
        inputDistance.focus();
        // clear input fields
        inputDuration.value = inputDistance.value = inputCadence.value = inputElevation.value = '' 
    }

    _toggleElavationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    }
    
    _newWorkout(e){
        e.preventDefault();
        
        // Get data from form
            let allData,check,workout;
            this.#type = inputType.value;
            const distanceData =  +inputDistance.value;
            const durationData =  +inputDuration.value;
            
        // check if data is valid
    
        // if workout Running => Running object
            if(this.#type === 'running'){
                const cadenceData =  +inputCadence.value;
                allData = [distanceData,durationData,cadenceData];

                check = allData.every(val => val > 0 && Number.isFinite(val));
                if (!check) return alert("You have to enter positive numbers");

                workout = new Running(this.#clicked,...allData)
            }
            
        // if workout cycling => cycling object
            if(this.#type === 'cycling'){
                const elavationData =  +inputElevation.value;
                allData = [distanceData,durationData,elavationData];

                check = allData.every(val => val > 0 && Number.isFinite(val));
                if (!check) return alert("You have to enter positive numbers");

                workout = new Cycling(this.#clicked,...allData)

            }
            
        // Add new object to workout array
            this.#workouts.push(workout)
            console.log(this.#workouts);

        // Runder workout on map as marker
            if(check) this._renderWorkoutMarker();
    }

    _renderWorkoutMarker(){
        // Display Marker
        L.marker(this.#clicked)
        .addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth:200,
            minWidth:100,
            autoClose:false,
            closeOnClick:false,
            className: `${this.#type}-popup`,
        }))
        .setPopupContent(this.#type)
        .openPopup();
        
        form.classList.add('hidden')    
    }
}

const OOP = new App();


