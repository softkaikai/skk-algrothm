const {LList, LoopList, List} = require('./index')

const ll = new LList()
const l = new List()
const loopL = new LoopList()

ll.insert(1)
ll.insert(2)
ll.insert(3)
ll.insert(4)

l.insert(1)
l.insert(2)
l.insert(3)
l.insert(4)
l.insert(5)
l.insert(6)

loopL.insert(1)
loopL.insert(2, 1)
loopL.insert(3, 2)
loopL.insert(4, 3)


console.log('l', l.getElements());
console.log('ll', ll.getElements());
console.log('loopL', loopL.getElements());



function rotateRight(k) {
    const l = new List();
    l.insert(1)
    l.insert(2)
    l.insert(3)
    l.insert(4)
    l.insert(5)

    const n = k % 5;
    const start = 5 - n;
    const startNode = l.getNode(start);
    l.tail.next = l.head;
    l.head = startNode.next;
    l.tail = startNode;
    startNode.next = null;

    return l.getElements()
}

console.log('rotateRight', rotateRight(2));

function reverseList(list, head) {
    let nodes = []
    let next = head || list.head;
    while(next) {
        nodes.push(next);
        next = next.next;
    }
    nodes = nodes.reverse();
    const lastIndex = nodes.length - 1;
    nodes.forEach((node, index) => {
        if (index === 0) {
            list.head  = node;
            node.next = nodes[index + 1];
        } else if (index === lastIndex) {
            list.tail = node;
            node.next = null;
        } else {
            node.next = nodes[index + 1];
        }
    })

    return list;
}

function reverseKGroup(list, k) {
    const needReverseLists = [];
    let needReverseNodes = [];

    let next = list.head;
    let count = 0;
    while(next) {
        needReverseNodes.push(next);
        next = next.next;
        count++;
        if (count >= k) {
            count = 0;
            needReverseLists.push(needReverseNodes.reverse());
            needReverseNodes = [];
        }
    }

    needReverseLists.push(needReverseNodes)

    const allNodes = needReverseLists.reduce((pre, curr) => {
        return pre.concat(curr)
    }, [])

    return getList(allNodes);

    function getList(nodes) {
        const l = new List();
        nodes.forEach(i => {
            l.insert(i.element);
        })

        return l;
    }

}

// console.log('reverseList', reverseList(l).getElements());
console.log('reverseKGroup', reverseKGroup(l, 4).getElements());
