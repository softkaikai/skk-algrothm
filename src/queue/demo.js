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

function calcRainWater(arr) {
    const maxY = arr.length;
    const maxX = arr[0].length;

    const qL = new PriorityQueue();
    const qR = new PriorityQueue();
    const qT = new PriorityQueue();
    const qB = new PriorityQueue();
    let result = 0;

    for(let y = 1; y < maxY - 1; y++) {
        qL.clear()
        qR.clear()
        qT.clear()
        qB.clear()
        for (let x = 1; x < maxX - 1; x++) {
            const currentHeight = arr[y][x];
            // left
            for (let i = 0; i < x; i++) {
                if (arr[y][i] > currentHeight) {
                    qL.enqueue(new Priority(arr[y][i], arr[y][i]))
                }
            }
            // right
            for (let i = x + 1; i < maxX; i++) {
                if (arr[y][i] > currentHeight) {
                    qR.enqueue(new Priority(arr[y][i], arr[y][i]))
                }
            }
            // top
            for (let i = 0; i < y; i++) {
                if (arr[i][x] > currentHeight) {
                    qT.enqueue(new Priority(arr[i][x], arr[i][x]))
                }
            }
            // bottom
            for (let i = y + 1; i < maxY; i++) {
                if (arr[i][x] > currentHeight) {
                    qB.enqueue(new Priority(arr[i][x], arr[i][x]))
                }
            }
            if (qL.length() && qR.length() && qT.length() && qB.length()) {
                const l = qL.dequeue().data;
                const r = qR.dequeue().data;
                const t = qT.dequeue().data;
                const b = qB.dequeue().data;

                result += (Math.min(l, r, t, b) - currentHeight)
            }
        }
    }

    return result;
}

console.log('getKMaxNum', getKMaxNum([3, 5, 2, 9, 8], 2));
console.log('getKMaxNum', getKMaxNum([3, 5, 2, 9, 8], 4));

moveWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)

console.log('calcRainWater ', calcRainWater([
    [1,4,3,1,3,2],
    [3,2,1,3,2,4],
    [2,3,3,2,3,1]
  ]));
