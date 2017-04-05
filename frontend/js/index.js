import DayPanelComponent from './components/day-panel';
import CitiesPanelComponent from './components/cities-panel';
import WeatherPanelComponent from './components/weather-panel';
window.addEventListener('load', ()=>{
    console.log('ok');
    let dayPanel = new DayPanelComponent({
        container: '.dates-panel'
    });
    let citiesPanel = new CitiesPanelComponent({
        container: '.cities-panel'
    });
    let weatherPanel = new WeatherPanelComponent({
        container: '.weather-panel'
    });
    dayPanel.dayChangeStream.subscribe((time)=>{
        weatherPanel.selectedOptions.date = new Date(time);
        weatherPanel.checkIfNeedUpdateDisplay();
    });
    citiesPanel.cityChangeStream.subscribe((city)=>{
        weatherPanel.selectedOptions.city = city;
        weatherPanel.checkIfCanFetchWeatherData();
    });
    dayPanel.render();
    citiesPanel.render();
    citiesPanel.selectSelectCurrentCity();
    dayPanel.selectToday();
});