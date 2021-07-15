function LListNode(element) {
    return {
        element,
        next: null,
        previous: null
    }
}

class LList {
    constructor() {
        this.firstNode = null;
        this.lastNode = null;
    }
    find(element) {
        let next = this.firstNode;
        while(next && next.element !== element) {
            next = next.next;
        }

        return next;
    }
    insert(element, afterElementInsert) {
        const newNode = LListNode(element);
        const afterNodeInsert = this.find(element)
        if (afterNodeInsert) {
            const afterNodeInsertNext = afterNodeInsert.next;
            newNode.previous = afterNodeInsert;
            if (afterNodeInsertNext) {
                afterNodeInsertNext.previous = newNode;
                newNode.next = afterNodeInsertNext;
            }

        } else {
            if (!this.lastNode) {
                this.lastNode = this.firstNode = newNode;
            } else {
                newNode.previous = this.lastNode;
                this.lastNode.next = newNode;
                this.lastNode = newNode;
            }
        }
    }
    remove(element) {
        let next = this.firstNode;
        while(next && next.element !== element) {
            next = next.next;
        }

        const pre = next.previous;
        const nextNext = next.next;
        if (pre) {
            pre.next = nextNext;
        }
        if (nextNext) {
            nextNext.previous = pre;
        }
        next.next = null;
        next.previous = null;
    }
    getElements() {
        const result = []
        let next = this.firstNode;
        while(next) {
            result.push(next.element)
            next = next.next;
        }

        return result;
    }

}

function LoopListNode(element) {
    return {
        element,
        next: null
    }
}

class LoopList {
    constructor() {
        this.head = LoopListNode('head')
        this.head.next = this.head;
    }
    find(element) {
        let next = this.head;
        let count = 0;
        while(next && next.element !== element) {
            if (next.element === 'head') {
                count++;
                if (count > 1) {
                    return null;
                }
            }
            next = next.next;
        }

        return next;
    }
    insert(element, afterElementInsert) {
        afterElementInsert = afterElementInsert || 'head';
        const afterNodeInsert = this.find(afterElementInsert);
        if (!afterNodeInsert) return;
        const newNode = LoopListNode(element)
        newNode.next = afterNodeInsert.next;
        afterNodeInsert.next = newNode;
    }
    remove(element) {
        let pre = this.head;
        let next = this.head.next;
        while(next  && next.element !== 'head') {
            if (next.element === element) {
                pre.next = next.next;
                return;
            }
            pre = next;
            next = next.next;
        }
    }
    getElements() {
        const result = []
        let next = this.head;
        let count = 0;
        while(next) {
            if (next.element === 'head') {
                count++;
                if (count > 1) {
                    return result.slice(1);
                }
            }
            result.push(next.element)
            next = next.next;
        }

        return result.slice(1);
    }
}


module.exports = {
    LoopList,
    LList
}
