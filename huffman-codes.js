import { Pair, DaryHeap } from './d-ary-heap.js'

function min_heap_comparator(x, y) { return x < y }

class TreeNode {
    left = null
    right = null

    constructor(chars, frequency) {
        this.chars = chars
        this.frequency = frequency
    }
}

export function huffman(data) {
    const char_frequencies = compute_frequencies(data)

    const heap = new DaryHeap([], 2, min_heap_comparator)
    for (const char in char_frequencies) {
        const node = new TreeNode (char, char_frequencies[char] / data.length)
        heap.insert(node.frequency, node)
    }

    while (heap.pairs.length > 1) {
        const left = heap.top()
        const right = heap.top()
        const parent = new TreeNode (left.chars + right.chars, left.frequency + right.frequency)
        parent.left = left
        parent.right = right
        heap.insert(parent.frequency, parent)
    }

    return build_tables(heap.top(), '', {}, {})                    
}

function compute_frequencies(data) {
    const frequencies = {}
    for (const c of data) {
        const freq = frequencies[c] || 0
        frequencies[c] = freq + 1
    }
    return frequencies
}

function build_tables(node, sequence, encoder, decoder) {
    if (node.chars.length === 1) {
        encoder[node.chars] = sequence
        decoder[sequence] = node.chars
    } else {
        if (node.left !== null) {
            build_tables(node.left, sequence + '0', encoder, decoder)
        }
        if (node.right !== null) {
            build_tables(node.right, sequence + '1', encoder, decoder)
        }
    }
    return [encoder, decoder]
}


export function encode(data, encoder) {
    let encoded = ''
    for (const char of data) {
        encoded += encoder[char]
    }
    return encoded    
}

export function decode(encoded, decoder) {
    let decoded = ''
    let remainder = ''
    for (const bit of encoded) {
        remainder += bit
        const decoded_char = decoder[remainder]

        if (decoded_char) {
            decoded += decoded_char
            remainder = ''
        } 
    }
    return decoded    
}
