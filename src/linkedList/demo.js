const {LList, LoopList} = require('./index')

const ll = new LList()
const loopL = new LoopList()

ll.insert(1)
ll.insert(2)
ll.insert(3)
ll.insert(4)

loopL.insert(1)
loopL.insert(2, 1)
loopL.insert(3, 2)
loopL.insert(4, 3)


console.log('ll', ll.getElements());
console.log('loopL', loopL.getElements());
