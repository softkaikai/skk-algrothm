function BSTNode(data) {
    return {
        data,
        left: null,
        right: null
    }
}
class BST {
    constructor() {
        this.root = null;
    }
    insert(data) {
        const newNode = BSTNode(data);

        let currentNode = this.root;
        let parentNode = null;
        while(true) {
            if (currentNode === null) {
                return this.root = newNode;
            } else {
                parentNode = currentNode;
                if (data < currentNode.data) {
                    currentNode = currentNode.left;
                    if (currentNode === null) {
                        return parentNode.left = newNode;
                    }
                } else {
                    currentNode = currentNode.right;
                    if (currentNode === null) {
                        return parentNode.right = newNode;
                    }
                }
            }
        }
    }
    preOrder(node, arr = []) {
        if (node) {
            arr.push(node.data)
            this.preOrder(node.left, arr)
            this.preOrder(node.right, arr)
        }

        return arr;
    }
    inOrder(node, arr = []) {
        if (node) {
            this.inOrder(node.left, arr)
            arr.push(node.data)
            this.inOrder(node.right, arr)
        }

        return arr;
    }
    postOrder(node, arr = []) {
        if (node) {
            this.postOrder(node.left, arr)
            this.postOrder(node.right, arr)
            arr.push(node.data)
        }

        return arr;
    }
    getMin() {
        let current = this.root;
        while(current.left !== null) {
            current = current.left;
        }

        return current.data;
    }
    getMax() {
        let current = this.root;
        while(current.right !== null) {
            current = current.right;
        }

        return current.data;
    }
    find(data) {
        let current = this.root;
        while(current !== null) {
            if (data === current.data) {
                return current;
            } else {
                if (data < current.data) {
                    current = current.left;
                } else {
                    current = current.right;
                }
            }
        }

        return null;
    }
    remove(data) {
        this.root = this.removeNode(this.root, data)
    }
    removeNode(node, data) {
        if (node === null) {
            return null;
        } else {
            if (node.data === data) {
                if (node.left === null && node.right === null) {
                    return null;
                } else if (node.left === null && node.right !== null) {
                    return node.right;
                } else if (node.right === null && node.left !== null) {
                    return node.left;
                } else if (node.right !== null && node.left !== null) {
                    const tempNodeData = this.getMin(node.right);
                    node.data = tempNodeData;
                    node.right = this.removeNode(node.right, tempNodeData)
                    return node;
                }

                return null;

            } else {
                if (data < node.data) {
                    node.left = this.removeNode(node.left, data);
                    return node;
                } else {
                    node.right = this.removeNode(node.right, data);
                    return node;
                }
                
            }
        }
    }
    getNodeNum(node) {
        if (!node) {
            return 0;
        }

        return this.getNodeNum(node.left) + this.getNodeNum(node.right) + 1;
    }
}


module.exports = {
    BST
}