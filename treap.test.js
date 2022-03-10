import { Node, Treap } from './treap.js'

test('right rotation', () => {
    const flour = new Node ('Flour', 10)
    const cabbage = new Node ('Cabbage', 77)
    const beer = new Node ('Beer', 76)
    const eggs = new Node ('Eggs', 129)
    const bacon = new Node ('Bacon', 95)
    const butter = new Node ('Butter', 86)

    const treap = new Treap()
    treap.root = flour
    flour.left = cabbage
    cabbage.left = beer
    cabbage.right = eggs
    beer.left = bacon
    beer.right = butter

    treap.right_rotate(beer)

    expect(treap.root).toBe(flour)
    expect(treap.root.left).toBe(beer)
    expect(treap.root.left.left).toBe(bacon)
    expect(treap.root.left.right).toBe(cabbage)
    expect(treap.root.left.right.left).toBe(butter)
    expect(treap.root.left.right.right).toBe(eggs)
})

test('right and left rotations are symmetrical', () => {
    const flour = new Node ('Flour', 10)
    const cabbage = new Node ('Cabbage', 77)
    const beer = new Node ('Beer', 76)
    const eggs = new Node ('Eggs', 129)
    const bacon = new Node ('Bacon', 95)
    const butter = new Node ('Butter', 86)

    const treap = new Treap()
    treap.root = flour
    flour.left = cabbage
    cabbage.left = beer
    cabbage.right = eggs
    beer.left = bacon
    beer.right = butter

    treap.right_rotate(beer)
    treap.left_rotate(cabbage)

    expect(treap.root).toBe(flour)
    expect(treap.root.left).toBe(cabbage)
    expect(treap.root.left.right).toBe(eggs)
    expect(treap.root.left.left).toBe(beer)
    expect(treap.root.left.left.left).toBe(bacon)
    expect(treap.root.left.left.right).toBe(butter)
})
