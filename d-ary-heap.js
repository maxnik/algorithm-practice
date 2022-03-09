export class Pair {
    constructor(priority, element) {
        this.priority = priority
        this.element = element
    }
}

export class DaryHeap {
    constructor(pairs, d, compare) {
        this.pairs = pairs
        this.d = d
        this.compare = compare
    }

    insert(priority, element) {
        this.pairs.push(new Pair (priority, element))
        this.bubble_up(this.pairs.length - 1)
    }

    top() {
        if (this.pairs.length === 0) {
            return null
        }
        const p = this.pairs.pop()
        if (this.pairs.length === 0) {
            return p.element
        } else {
            const top_element = this.pairs[0]
            this.pairs[0] = p
            this.push_down(0)
            return top_element.element
        }
    }

    bubble_up(index) {
        const current = this.pairs[index]
        while (index > 0) {
            const parent_index = this.get_parent_index_of(index)
            if (this.compare(current.priority, this.pairs[parent_index].priority)) {
                this.pairs[index] = this.pairs[parent_index]
                index = parent_index
            } else {
                break
            }
        }
        this.pairs[index] = current
    }

    push_down(index) {
        const current = this.pairs[index]
        while (index < this.first_leaf_index()) {
            const child_index = this.highest_priority_child(index)
            if (this.compare(this.pairs[child_index].priority, current.priority)) {
                this.pairs[index] = this.pairs[child_index]
                index = child_index
            } else {
                break
            }
        }
        this.pairs[index] = current
    }

    get_parent_index_of(index) {
        return Math.floor((index - 1) / this.d)
    }

    first_leaf_index() {
        return Math.floor((this.pairs.length - 2) / this.d) + 1
    }

    highest_priority_child(index) {
        // for d = 3 the child elements are d*i + 1, d*i + 2, d*i + 3
        let max_index = this.d * index + 1
        for (let i = 2; i <= this.d; i++) {
            let current_index = this.d * index + i
            if (current_index < this.pairs.length - 1) {
                if (this.compare(this.pairs[current_index].priority, 
                                 this.pairs[max_index].priority)) {
                    max_index = current_index
                }
            }            
        }
        return max_index
    }
}
