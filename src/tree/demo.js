const {BST} = require('./index')

const bst = new BST();

const arr = [23, 45, 16, 37, 3, 99, 22]
arr.forEach(i => {
    bst.insert(i)
})
console.log('pre', bst.preOrder(bst.root));
console.log('in', bst.inOrder(bst.root));
console.log('post', bst.postOrder(bst.root));
console.log('min', bst.getMin());
console.log('max', bst.getMax());
console.log('find', bst.find(16));
console.log('remove', bst.remove(16));
console.log('pre', bst.root);