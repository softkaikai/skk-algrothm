class Queue {
    constructor() {
        this.dataStore = []
    
    }
    enqueue(data) {
        this.dataStore.push(data)
    }
    dequeue() {
        return this.dataStore.shift()
    }
    length() {
        return this.dataStore.length;
    }
    clear() {
        this.dataStore.length = 0;
    }
    toString() {
        let result = ''
        this.dataStore.forEach(i => {
            result += i;
        })

        return result;
    }
}

class Priority {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
    }
}

class PriorityQueue extends Queue {
    constructor() {
        super()
    }
    dequeue() {
        let maxPriority = 0;
        let maxPriorityIndex = 0;
        this.dataStore.forEach((i, index) => {
            if (i.priority > maxPriority) {
                maxPriority = i.priority;
                maxPriorityIndex = index;
            }
        })
        return this.dataStore.splice(maxPriorityIndex, 1)[0]
    }
}

class Deque {
    constructor() {
        this.dateStore = []
    }
    popFront() {
        return this.dateStore.shift()
    }
    popBack() {
        return this.dateStore.pop()
    }
    pushFront(data) {
        this.dateStore.unshift(data)
    }
    pushBack(data) {
        this.dateStore.push(data)
    }
    length() {
        return this.dateStore.length;
    }
    clear() {
        this.dateStore.length = 0;
    }
    getData() {
        return Object.assign([], this.dateStore)
    }
}


module.exports = {
    Priority,
    Queue,
    PriorityQueue,
    Deque
}