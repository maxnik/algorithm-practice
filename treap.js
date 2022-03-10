export class Node {
    parent = null
    _left = null
    _right = null

    constructor(key, priority) {
        this.key = key
        this.priority = priority
    }

    get left() { return this._left }
    set left(node) {
        this._left = node
        if (node !== null) {
            node.parent = this
        }
    }

    get right() { return this._right }
    set right(node) {
        this._right = node
        if (node !== null) {
            node.parent = this
        }
    }
}

export class Treap {
    root = null

    right_rotate(x) {
        if (x === null || x.parent === null) {
            throw new Error ('cannot rotate an empty Node or the root one')
        }

        const y = x.parent
        if (y.left !== x) {
            throw new Error ('can only perform a right rotation on a left child')
        }

        const p = y.parent
        if (p !== null) {
            if (p.left === y) {
                p.left = x
            } else {
                p.right = x
            }
        } else {
            this.root = x
        }
        y.left = x.right
        x.right = y
    }

    left_rotate(x) {
        if (x === null || x.parent === null) {
            throw new Error ('cannot rotate an empty Node or the root one')
        }

        const y = x.parent
        if (y.right !== x) {
            throw new Error ('can only perform a left rotation on a right child')
        }

        const p = y.parent
        if (p !== null) {
            if (p.left === y) {
                p.left = x
            } else {
                p.right = x
            }
        } else {
            this.root = x
        }
        y.right = x.left
        x.left = y
    }
}
