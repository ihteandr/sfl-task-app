import SFLComponent from '../classes/Component';
import Subject from '../classes/Subject';

export default class DayPanelComponent extends SFLComponent{
    constructor(options){
        let events = {
            'click .date': 'selectDate'
        };
        super(Object.assign(options, {
            events: events
        }));
        this.dayChangeStream = new Subject();
        this.selectedDay = null;

    }
    getToday(){
        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setMinutes(0);
        today.setMilliseconds(0);
        return today;
    }
    selectToday(){
        let today = this.getToday();
        this.unselectAll();
        this.selectedDay = today.getTime();
        this.container.querySelector('.date[date="' + today.getTime() + '"]').classList.add('date_selected');
        this.dayChangeStream.next(this.selectedDay);
    }
    unselectAll(){
        let dayElements = this.container.querySelectorAll('.date');
        for(let i = 0; i < dayElements.length; i++){
            dayElements[i].classList.remove('date_selected');
        }
    }
    selectDate(event){
        this.unselectAll();
        event.currentTarget.classList.add('date_selected');
        this.selectedDay = parseInt(event.currentTarget.getAttribute('date'));
        this.dayChangeStream.next(this.selectedDay);
    }
    getUpcomingDates(){
        let today = this.getToday();
        let upcomingDates = [];
        for(var i = 0; i < 7; i++){
            let date = new Date(today.getTime() + i*24*60*60*1000);
            upcomingDates.push({
                day: date.getDate(),
                weekDay: [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                ][date.getDay()],
                time: date.getTime(),
                month: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ][date.getMonth()]
            })
        }
        return upcomingDates;
    }
    render(){
        this.dettachEvents();
        this.container.innerHTML = '';
        let dates = this.getUpcomingDates();
        dates.forEach((date)=>{
            let dateEl = document.createElement('div'),
                dayLabel = document.createElement('label'),
                monthLabel = document.createElement('label'),
                weekDayLabel = document.createElement('label');
            dateEl.classList.add('date');
            dayLabel.classList.add('date_day');
            monthLabel.classList.add('date_month');
            weekDayLabel.classList.add('date_week');
            dayLabel.innerText = date.day;
            monthLabel.innerText = date.month;
            weekDayLabel.innerText = date.weekDay;
            dateEl.setAttribute('date', date.time);
            dateEl.appendChild(dayLabel);
            dateEl.appendChild(monthLabel);
            dateEl.appendChild(weekDayLabel);
            this.container.appendChild(dateEl);
        });
        this.attachEvents();
    }
}