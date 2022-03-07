export class DaryHeap {
    constructor(pairs, d) {
        this.pairs = pairs
        this.d = d
    }

    bubble_up(index) {
        let parent_index = index
        while (parent_index > 0) {
            let current_index = parent_index
            parent_index = this.get_parent_index_of(parent_index)
            if (this.pairs[parent_index].priority < this.pairs[current_index].priority) {
                this.swap(current_index, parent_index)
            } else {
                break
            }
        }
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
