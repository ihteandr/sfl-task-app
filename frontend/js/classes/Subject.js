export default class Subject{
    constructor(){
        this.subcribers = [];
    }
    subscribe(func){
        this.subcribers.push(func);
        return {
            unsubscribe: ()=>{
                this.subcribers.splice(this.subcribers.indexOf(func), 1);
            }
        }
    }
    next(data){
        this.subcribers.forEach((subscriber)=>{
            subscriber(data);
        });
    }
}

