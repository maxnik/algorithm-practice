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

    get is_leaf() {
        return this._left === null && this._right === null
    }

    get is_root() {
        return this.parent === null
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

    search(node, target_key) {
        if (node === null) {
            return null
        }
        if (node.key === target_key) {
            return node
        } else if (target_key.localeCompare(node.key) < 0) {
            return this.search(node.left, target_key)
        } else {
            return this.search(node.right, target_key)
        }
    }

    insert(key, priority) {
        let node = this.root
        let parent = null
        const new_node = new Node (key, priority)

        while (node !== null) {
            parent = node
            if (key.localeCompare(node.key) <= 0) {
                node = node.left
            } else {
                node = node.right
            }
        }
        if (parent === null) {
            this.root = new_node
            return
        } else if (key.localeCompare(parent.key) <= 0) {
            parent.left = new_node
        } else {
            parent.right = new_node
        }

        while (new_node.parent !== null && new_node.priority < new_node.parent.priority) {
            if (new_node === new_node.parent.left) {
                this.right_rotate(new_node)
            } else {
                this.left_rotate(new_node)
            }
        }
        if (new_node.parent === null) {
            this.root = new_node
        }
    }

    remove(key) {
        const node = this.search(this.root, key)
        if (node === null) {
            return false
        }
        if (node.is_root && node.is_leaf) {
            this.root = null
            return true
        }
        while (! node.is_leaf) {
            if (node.left !== null && 
                (node.right === null || node.left.priority < node.right.priority)) {
                this.right_rotate(node.left)
            } else {
                this.left_rotate(node.right)
            }
            if (node.parent.is_root) {
                this.root = node.parent
            }
        }
        if (node.parent.left === node) {
            node.parent.left = null
        } else {
            node.parent.right = null
        }
        node.parent = null
        return true
    }
}
