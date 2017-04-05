import SFLComponent from '../classes/Component';
import Subject from '../classes/Subject';
import HttpProvider from '../classes/HttpProvider';
export default class WeatherPanelComponent extends SFLComponent{
    constructor(options){
        super(Object.assign(options, {}));
        this.http = new HttpProvider();
        this.dayChangeStream = new Subject();
        this.selectedOptions = {
            city: null,
            date: null
        };
        this.fetchedData = null;
        this.checkIfCanFetchWeatherData = this.checkIfCanFetchWeatherData.bind(this);
    }
    checkIfNeedUpdateDisplay(){
        if(this.selectedOptions.date){
            this.render();
        }
    }
    checkIfCanFetchWeatherData(){
        if(this.selectedOptions.city){
            this.fetchWeatherData();
        }
    }
    fetchWeatherData(){
        this.http.doGet('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast', {
            appid: 'a9bcf4f4899aaab6b7194e3f674f162b',
            q: this.selectedOptions.city,
            units: 'metric'
        }).then((data)=>{
            this.fetchedData = data;
            this.checkIfNeedUpdateDisplay();
        }, (err)=>{
            console.error(err);
        })
    }
    render(){
        this.dettachEvents();
        this.container.innerHTML = '';
        let display = document.createElement('h1');
        if(this.fetchedData && this.selectedOptions.date){
            //find weather data for selected date
            let data = this.fetchedData.list.filter((data)=>{
                let time = this.selectedOptions.date.getTime();
                return data.dt*1000 > time && time < data.dt*1000 + 23.9*60*60*1000;
            });
            let sum = 0;

            data.forEach((singleData)=>{
                sum+=singleData.main.temp;
            });
            if(data.length > 0){
                display.innerText = (sum/data.length).toFixed(1) + 'C';
            } else {
                display.innerText = 'Unknown';
            }
        }

        this.container.appendChild(display);
        this.attachEvents();
    }
}