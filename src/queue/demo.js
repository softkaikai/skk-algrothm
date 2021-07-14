const { Queue, Priority, PriorityQueue, Deque } = require('./index')


function getKMaxNum(arr, k) {
    const pq = new PriorityQueue();
    arr.forEach(i => {
        pq.enqueue({data: i, priority: i})
    })
    let result = null;
    while(k > 0) {
        result = pq.dequeue().data;
        k--;
    }

    return result;
}

function moveWindow(arr, windowLength) {
    if (windowLength > arr.length) {
        return null;
    }

    const q = new Deque();
    const qTemp = new Deque();
    arr.forEach(i => q.pushBack(i));

    while(windowLength <= q.length()) {
        for (let i = 0; i < windowLength; i++) {
            qTemp.pushBack(q.popFront())
        }
        const arr = qTemp.getData();
        console.log('max num: ', Math.max.apply(null, arr));
        // 右移动一格
        qTemp.popFront()
        while(qTemp.length()) {
            q.pushFront(qTemp.popBack())
        }
    }
}

console.log('getKMaxNum', getKMaxNum([3, 5, 2, 9, 8], 2));
console.log('getKMaxNum', getKMaxNum([3, 5, 2, 9, 8], 4));

moveWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)
