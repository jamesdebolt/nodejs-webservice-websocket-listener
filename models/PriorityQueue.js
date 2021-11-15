const Heap = require('./Heap');

class PriorityQueue {
 
    // higher priority number > smaller priority number
    // tiebreaker is whichever came first
    compareCalls = (a,b) => {
        if(a.priority === b.priority){
        return Date.parse(a.timestamp) - Date.parse(b.timestamp);
        } else {
        return b.priority - a.priority;
        }
    }
    
    // valid inputs are json objects that at least have priority/timestamp
    validInput = (input) => {
        let parsedEvent = JSON.parse(input);
    
        if(typeof parsedEvent === "object" && parsedEvent != null && typeof parsedEvent.priority == 'number' && parsedEvent.timestamp){
            return true;
        }
    }

    constructor(){
        this.heap = new Heap(this.compareCalls);
    }

    // remove and return the top of the heap
    pop(){
        return this.heap.pop();
    }

    // validate and add new item to the heap
    push(item){
        try{
            if(this.validInput(item)){
                this.heap.push(JSON.parse(item));
            }
            } catch (e){
                console.log("bad data receieved, disregarded " + e);
            }
    }
}

module.exports = PriorityQueue;