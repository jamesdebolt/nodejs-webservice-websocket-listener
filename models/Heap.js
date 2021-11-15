// Returning the "highest priority" so we need to implement a max heap
class Heap{
    
    constructor(sortFunction){
        this.heap = [];
        this.sortFunction = sortFunction;
    }

    // remove and return the top of the heap
    pop(){

        // no elements to pop return an empty obj
        if(this.heap.length === 0){
            return {};
        }

        // save the top element
        let top = this.heap[0];

        // pop the bottom element off the bottom
        let bottom = this.heap.pop();

        // if length is now 0 there was only 1 element, the top, and no other action is necessary
        // otherwise, move the bottom to the top, bubble it down, and the heap will fill out as needed
        if(this.heap.length > 0){
            this.heap[0] = bottom;
            this.bubbleDown(0);
        }

        
        console.log("==============");
        this.heap.forEach( (element) => { console.log(element.priority) });

        return top;
    }

    // push the new element into the heap at the appropriate location
    push(element){

        // add to the end and let it rise
        this.heap.push(element);
        this.bubbleUp(this.heap.length-1);

        console.log("==============");
        this.heap.forEach( (element) => { console.log(element.priority) });
    }

    // take the given element and bubble it up as far as necessary
    bubbleUp(index){

        // breakout if we've bubbled to the top
        while(index > 0){

            // Heap math magic - use this equation to get the parent of index
            let parentIndex = Math.floor((index + 1) / 2) - 1;
            let parent = this.heap[parentIndex];

            if(this.sortFunction(parent,this.heap[index]) <= 0){
                // if parent should come before index, no more bubbling
                break;
            }

            // otherwise swap and update index (also destructuring to swap variables saves us from having to use a temp)
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }

    }

    // take the given element and bubble it down as far as necessary
    bubbleDown(index){

        while(true) {

            let childLeftIndex = 2 * (index + 1) - 1;
            let childRightIndex = childLeftIndex + 1;
            
            let shouldSwapLeft = false;
            let shouldSwapRight = false;

            if(childLeftIndex < this.heap.length          // left must be a valid index
                && this.sortFunction(this.heap[childLeftIndex],this.heap[index]) < 0    // left must be a higher prio
                && (childRightIndex >= this.heap.length || this.sortFunction(this.heap[childLeftIndex],this.heap[childRightIndex]) <= 0)     // left must be bigger than/equal to right or right doesnt exist
            ) {
                shouldSwapLeft = true;
            } else if(childRightIndex < this.heap.length          // right must be a valid index
                && this.sortFunction(this.heap[childRightIndex],this.heap[index]) < 0    // right must be a higher prio
                && (childLeftIndex >= this.heap.length || this.sortFunction(this.heap[childLeftIndex],this.heap[childRightIndex]) > 0)     // right must be bigger than left or left doesnt exist
            ) {
                shouldSwapRight = true;
            }

            if (shouldSwapLeft) {
                [this.heap[index], this.heap[childLeftIndex]] = [this.heap[childLeftIndex], this.heap[index]];
                index = childLeftIndex;
                continue;   
            }

            if (shouldSwapRight) {
                [this.heap[index], this.heap[childRightIndex]] = [this.heap[childRightIndex], this.heap[index]];
                index = childRightIndex;
                continue;
            }

            // If neither side swapped, that means we are done bubbling, exit
            return;
        }
    }
}

module.exports = Heap;