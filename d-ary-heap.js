export class DaryHeap {
    constructor(pairs, d) {
        this.pairs = pairs
        this.d = d
    }

    bubble_up(index) {
        const current = this.pairs[index]
        while (index > 0) {
            const parent_index = this.get_parent_index_of(index)
            if (this.pairs[parent_index].priority < current.priority) {
                this.pairs[index] = this.pairs[parent_index]
                index = parent_index
            } else {
                break
            }
        }
        this.pairs[index] = current
    }

    get_parent_index_of(index) {
        return Math.floor((index - 1) / this.d)
    }

    swap(a, b) {
        const temp = this.pairs[a]
        this.pairs[a] = this.pairs[b]
        this.pairs[b] = temp
    }
}
