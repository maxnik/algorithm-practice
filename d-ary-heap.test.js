import { DaryHeap } from './d-ary-heap.js'

class Pair {
    constructor(priority, text) {
        this.priority = priority
        this.text = text
    }
}

test('bubble_up() for an element with a higher priority than its parent', () => {
    const unencrypted_password = new Pair (10, 'Unencrypted password on DB')
    const optional_form = new Pair (8, 'Optional form field blocked')
    const memory_leak = new Pair (9, 'Memory leak')
    const pairs = [
        unencrypted_password,
        new Pair (9, 'UI breaks on browser X'),
        optional_form,
        new Pair (8, 'CSS style causes misalignment'),
        new Pair (7, 'Page load takes 2+ seconds'),
        new Pair (5, 'CSS style causes 1px'),
        new Pair (3, 'Refactor CSS using SASS'),
        memory_leak
    ]
    const heap = new DaryHeap (pairs, 3)
    heap.bubble_up(heap.pairs.length - 1)
    
    expect(heap.pairs[0]).toBe(unencrypted_password)
    expect(heap.pairs[2]).toBe(memory_leak)
    expect(heap.pairs[7]).toBe(optional_form)
})

test('bubble_up() for the last element of a binary heap', () => {
    const top = new Pair (9, '')
    const eight = new Pair (8, '')
    const pairs = [
        top,
        new Pair (7, ''),
        new Pair (5, ''),
        new Pair (6, ''),
        new Pair (2, ''),
        new Pair (4, ''),
        new Pair (3, ''),
        eight
    ]
    const heap = new DaryHeap (pairs, 2)
    heap.bubble_up(heap.pairs.length - 1)

    expect(heap.pairs[0]).toBe(top)
    expect(heap.pairs[1]).toBe(eight)
})

test('push_down() for the root with lower priority', () => {
    const ui_breaks = new Pair (9, 'UI breaks on browser X')
    const unencrypted_password = new Pair (10, 'Unencrypted password on DB')
    const pairs = [
        ui_breaks,
        unencrypted_password,
        new Pair (9, 'Memory leak'),
        new Pair (8, 'CSS style causes misalignment'),
        new Pair (7, 'Page load takes 2+ seconds'),
        new Pair (5, 'CSS style causes 1px'),
        new Pair (3, 'Refactor CSS using SASS'),
        new Pair (8, 'Optional form field blocked')
    ]
    const heap = new DaryHeap (pairs, 3)
    heap.push_down(0)

    expect(heap.pairs[0]).toBe(unencrypted_password)
    expect(heap.pairs[1]).toBe(ui_breaks)
})