class Stack {
    constructor() {
        this.dataStore = []
        this.top = 0;
    }

    push(data) {
        this.dataStore.push(data)
        this.top++
    }
    pop() {
        if (this.top > 0) {
            const result = this.dataStore.pop()
            --this.top;
            return result;
        }

        return undefined
    }
    peek() {
        return this.dataStore[this.top - 1];
    }
    clear() {
        this.dataStore.length = 0;
        this.top = 0;
    }
    length() {
        return this.top;
    }
    toString() {
        let result = ''
        this.dataStore.forEach(i => {
            result += i;
        })

        return result;
    }
}

module.exports = Stack;
