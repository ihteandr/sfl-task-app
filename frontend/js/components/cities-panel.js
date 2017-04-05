import SFLComponent from '../classes/Component';
import Subject from '../classes/Subject';

export default class CitiesPanelComponent extends SFLComponent{
    constructor(options){
        let events = {
            'change .cities': 'selectCity'
        };
        super(Object.assign(options, {
            events: events
        }));
        this.cityChangeStream = new Subject();
        this.selectedCity = null;
        this.citiesData = ['Moscow', 'Yerevan', 'London', 'Kiev', 'Amsterdam'];

    }
    selectSelectCurrentCity(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                let geocoder = new google.maps.Geocoder();
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                let latlng = new google.maps.LatLng(lat, lng);
                geocoder.geocode({'latLng': latlng}, (results, status)=> {
                    if (status == google.maps.GeocoderStatus.OK) {
                        let city;
                        if (results[1]) {
                            //formatted address
                            //find country name
                            for (var i=0; i<results[0].address_components.length; i++) {
                                for (var b=0;b<results[0].address_components[i].types.length;b++) {

                                    //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                                    if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                        //this is the object you are looking for
                                        city= results[0].address_components[i];
                                        break;
                                    }
                                }
                            }
                            this.selectedCity = city.short_name;
                            this.cityChangeStream.next(this.selectedCity);
                            this.container.querySelector('select').value = this.selectedCity;
                        } else {
                            console.log("No results found");
                        }
                    } else {
                        onsole.log("Geocoder failed due to: " + status);
                    }
                });
            }, (err)=>{
                console.error(err);
            });
        }
    }
    selectCity(event){
        this.selectedCity = event.target.value;
        this.cityChangeStream.next(this.selectedCity);
    }
    render(){
        this.dettachEvents();
        this.container.innerHTML = '';
        let selectEl = document.createElement('select');
        selectEl.classList.add('cities');
        this.citiesData.forEach((city)=>{
            let optionEl = document.createElement('option');
            optionEl.setAttribute('value', city);
            optionEl.innerText = city;
            selectEl.appendChild(optionEl);
        });
        this.container.appendChild(selectEl);
        this.attachEvents();
    }
}