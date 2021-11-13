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

        return top;
    }

    // push the new element into the heap at the appropriate location
    push(element){

        console.log("push request received for " + JSON.stringify(element));

        // add to the end and let it rise
        this.heap.push(element);
        this.bubbleUp(this.heap.length-1);

        console.log(JSON.stringify(this.heap));
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

            // only compare if the child actually exists
            if (childLeftIndex < this.heap.length) {
                if(this.sortFunction(this.heap[childLeftIndex],this.heap[index]) < 0){
                    [this.heap[index], this.heap[childLeftIndex]] = [this.heap[childLeftIndex], this.heap[index]];
                    index = childLeftIndex;
                    continue;
                }
            }

            // check the right if left didnt need to bubble

            // Do the same checks for the right child.
            if (childRightIndex < this.heap.length) {
                if(this.sortFunction(this.heap[childRightIndex],this.heap[index]) < 0){
                    [this.heap[index], this.heap[childRightIndex]] = [this.heap[childRightIndex], this.heap[index]];
                    index = childRightIndex;
                    continue;
                }
            }

            // If neither side swapped, that means we are done bubbling, exit
            return;
        }
    }
}

module.exports = Heap;