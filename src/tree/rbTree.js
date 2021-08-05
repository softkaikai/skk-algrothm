// 红黑树是一颗二叉查找树，一般的二叉查找树最差的情况下会退化成线性表导致查找性能下降，红黑树利用某些约束条件，使得这棵树尽可能地平衡。而AVL树是更严格的二叉查找树，因为他要求左右子树的高度差不能超过1，保证了树的平衡。红黑树没有AVL树平衡，但是在增删节点的时候，需要调整的次数比较少。下面是红黑树的约束条件。
// 1.所有的节点必须是红色或黑色。
// 2.根节点必须是黑色。
// 3.所有叶子节点必须是黑色，叶子节点是空节点，不包括数据。
// 4.红节点的孩子必须是黑节点。
// 5.从任一节点开始到所有叶子节点的路径都包含相同数目的黑色节点。
function RedBlackNode(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.color = '';
}

class RedBlackTree {
    constructor() {
        this.root = null;
    }
    red(node) {
        node.color = 'red'
    }
    black(node) {
        node.color = 'black'
    }
    isRed(node) {
        return node.color === 'red'
    }
    isBlack(node) {
        return node.color === 'black'
    }
    insert(value) {
        const newNode = new RedBlackNode(value)
        if (!this.root) {
            this.black(newNode)
            this.root = newNode;
        }
    }
}