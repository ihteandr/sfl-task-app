

/*
* SFLComponent
*
* Constructor take options
* options.event
*     {
*       'event selector': 'eventHandler'
*     }
* options.container
     DOMNode or selector
*
* */
export default class SFLComponent{
    constructor(options){
        this.events = options.events;
        this.container = typeof options.container === 'string' ? document.querySelector(options.container) : options.container;
        this.prepareEventsListeners();
    }
    prepareEventsListeners(){
        for(let key in this.events){
            if(this.events.hasOwnProperty(key)){
                this[this.events[key]] = this[this.events[key]].bind(this);
            }
        }
    }
    attachEvents(){
        for(let key in this.events){
            if(this.events.hasOwnProperty(key)){
                let keyParts = key.split(' ')
                let event = keyParts[0];
                let selector = keyParts.slice(1).join(' ');
                let elements = this.container.querySelectorAll(selector);
                for(let i = 0; i < elements.length; i++){
                    elements[i].addEventListener(event, this[this.events[key]]);    
                }
            }
        }
    }
    dettachEvents(){
        for(let key in this.events){
            if(this.events.hasOwnProperty(key)){
                let keyParts = key.split(' ');
                let event = keyParts[0];
                let selector = keyParts.slice(1).join(' ');
                let elements = this.container.querySelectorAll(selector);
                for(let i = 0; i < elements.length; i++){
                    elements[i].removeEventListener(event, this[this.events[key]]);
                }
            }
        }
    }
}