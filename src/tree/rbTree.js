// 红黑树是一颗二叉查找树，一般的二叉查找树最差的情况下会退化成线性表导致查找性能下降，红黑树利用某些约束条件，使得这棵树尽可能地平衡。而AVL树是更严格的二叉查找树，因为他要求左右子树的高度差不能超过1，保证了树的平衡。红黑树没有AVL树平衡，但是在增删节点的时候，需要调整的次数比较少。下面是红黑树的约束条件。
// 1.所有的节点必须是红色或黑色。
// 2.根节点必须是黑色。
// 3.所有叶子节点必须是黑色，叶子节点是空节点，不包括数据。
// 4.红节点的孩子必须是黑节点。
// 5.从任一节点开始到所有叶子节点的路径都包含相同数目的黑色节点。
// https://www.bilibili.com/video/BV1AK4y1S7yz?p=2
function RedBlackNode(value) {
    this.value = value;
    this.color = '';
    this.parent = null;
    this.left = null;
    this.right = null;
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
    isRoot(node) {
        return node.parent === null;
    }
    isRedSibling(node) {
        const sibling = this.getSibling(node);
        return this.isRed(sibling);
    }
    isBlackSibling(node) {
        return !this.isRedSibling(node)
    }
    getSibling(node) {
        const parent = node.parent;
        if (node === parent.left) {
            return parent.right;
        } else {
            return parent.left;
        }
    }
    insert(value) {
        const newNode = new RedBlackNode(value)
        // 默认新增添加的结点为红色结点
        this.red(newNode)
        // 情况1  树为空
        if (!this.root) {
            this.black(newNode)
            this.root = newNode;
            return;
        }
        
        let currentNode = this.root;
        while(true) {
            if (newNode.value < currentNode.value) {
                if (currentNode.left === null) {
                    // 情况2 父结点为黑色 - 直接插入，并且不会破坏红黑树的规则
                    if (this.isBlack(currentNode)) {
                        currentNode.left = newNode;
                        newNode.parent = currentNode;
                        return;
                    } else {
                        // 情况3 父结点为红色 - 需要重新调整
                        currentNode.left = newNode;
                        newNode.parent = currentNode;
                        this.balanceInsert(newNode);
                    }
                    return;
                }
                currentNode = currentNode.left;
            } else {
                if (currentNode.right === null) {
                    // 情况2 父结点为黑色 - 直接插入，并且不会破坏红黑树的规则
                    if (this.isBlack(currentNode)) {
                        currentNode.right = newNode;
                        newNode.parent = currentNode;
                        return;
                    } else {
                        // 情况3 父结点为红色 - 需要重新调整
                        currentNode.right = newNode;
                        newNode.parent = currentNode;
                        this.balanceInsert(newNode);
                    }
                    return;
                }
                currentNode = currentNode.right;
            }
        }
    }
    balanceInsert(node) {
        // 父结点 和 爷爷结点必定不为空
        // 父结点必定为红色
        const parent = node.parent;
        const grandParent = parent.parent;
        const uncle = this.getSibling(parent);
        // 情况4 叔叔结点为红色
        if (uncle !== null && this.isRed(uncle)) {
            // 先将 父结点 和 叔叔结点换成黑色，爷爷结点换成红色
            this.black(parent)
            this.black(uncle)
            this.red(grandParent);
            // 如果爷爷结点是根结点，直接把爷爷结点变黑
            if (this.isRoot(grandParent)) {
                this.black(grandParent)
            } else {
                // 曾祖父结点
                const greatGrandParent = grandParent.parent;
                // 如果曾祖父也为红色，就递归了
                if (this.isRed(greatGrandParent)) {
                    this.balanceInsert(grandParent);
                }
            }
        } else {
            // 情况5 叔叔结点为黑色
            const shape = this.getShape(node);
            if (shape === '<') {
               this.shapeHandle1(node)
            } else if (shape === '/') {
                this.shapeHandle2(node.parent)
            } else if (shape === '>') {
                this.shapeHandle3(node)
            } else {
                this.shapeHandle4(node.parent)
            }
        }

        this.black(this.root)
    }
    shapeHandle1(node) {
        // 左旋转为 /
        this.leftRotate(node.parent);
        this.shapeHandle2(node);
    }
    shapeHandle2(node) {
        // 左旋后，node结点变成了parent结点了
        const parentAfterLeftRotate = node;
        // 父结点和爷爷结点变色
        this.black(parentAfterLeftRotate)
        this.red(parentAfterLeftRotate.parent)
        // 然后右旋转
        this.rightRotate(parentAfterLeftRotate);
    }
    shapeHandle3(node) {
        // 右旋转为 \
        this.rightRotate(node)
        this.shapeHandle4(node)
    }
    shapeHandle4(node) {
        // 右旋后，node结点变成了parent结点了
        const parentAfterRightRotate = node;
        // 父结点和爷爷结点变色
        this.black(parentAfterLeftRotate)
        this.red(parentAfterLeftRotate.parent)
        // 然后左旋转
        this.leftRotate(parentAfterLeftRotate.parent);
    }
    getDirection(node, parent) {
        return node === parent.left ? 'left' : 'right';
    }
    // @return < / > \    
    getShape(node) {
        const parent = node.parent;
        const grandParent = parent.parent;
        const childDirection = this.getDirection(node, parent);
        const parentDirection = this.getDirection(parent, grandParent);
        if (childDirection === 'right' && parentDirection === 'left') {
            return '<'
        } else if (childDirection === 'right' && parentDirection === 'right') {
            return '\\'
        } else if (childDirection === 'left' && parentDirection === 'left') {
            return '/'
        } else {
            return '>';
        }
    }
    leftRotate(node) {
        const right = node.right;
        const parent = node.parent;
        // 子结点替换父结点的位置
        parent.left = right;
        right.parent = parent;
        // 父结点替换子结点的左结点
        const leftNode = right.left;
        node.parent = right;
        right.left = node;
        // 子结点的左结点挂到父结点的右边
        node.right = leftNode;
        if (leftNode !== null) {
            leftNode.parent = node;
        }
    }
    rightRotate(node) {
        const parent = node.parent;
        const grandParent = parent.parent;
        const parentDirection = this.getDirection(parent, grandParent)
        const right = node.right;
        // 父结点替换右子结点
        node.right = parent;
        parent.parent = node;
        node.parent = grandParent;
        parentDirection === 'left' ? grandParent.left = node : grandParent.right = node;
        // 原来右子结点替换parent左结点
        parent.left = right;
        if (right !== null) {
            right.parent = parent;
        }
    }
}


module.exports = {RedBlackTree};
