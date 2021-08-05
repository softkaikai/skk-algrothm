const {BST} = require('./index')

const bst = new BST();

const arr = [23, 45, 16, 37, 3, 99, 22]
arr.forEach(i => {
    bst.insert(i)
})
console.log('isBST', isBST(bst));
console.log('pre', bst.preOrder(bst.root));
console.log('in', bst.inOrder(bst.root));
console.log('post', bst.postOrder(bst.root));
console.log('min', bst.getMin());
console.log('max', bst.getMax());
console.log('find', bst.find(16));
console.log('getNodeNum', bst.getNodeNum(bst.root));
// console.log('remove', bst.remove(16));
// console.log('pre', bst.root);

function createBSTByArray(arr) {
    const bst = new BST();

    arr.forEach(i => {
        bst.insert(i)
    })

    return bst;
}

function isBST(node) {
    if (!node) {
        return true;
    }
    if (node.left) {
        if (node.left >= node) {
            return false;
        }
    }
    if (node.right) {
        if (node.right < node) {
            return false;
        }
    }

    return isBST(node.left) && isBST(node.right);
}

function getMinHeightTree(arr, bst) {
    if (!bst) {
        bst = new BST();
    }
    if (arr.length) {
        const mid = Math.floor(arr.length/2);
        bst.insert(arr[mid])
        arr.splice(mid, 1)
        return getMinHeightTree(arr, bst)
    } else {
        return bst;
    }
}

console.log('getMinHeightTree', JSON.stringify(getMinHeightTree([-10,-3,0,5,9])));