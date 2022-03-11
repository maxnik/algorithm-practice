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

test('searching by key', () => {
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

    expect(treap.search(treap.root, butter.key)).toBe(butter)
    expect(treap.search(treap.root, bacon.key)).toBe(bacon)
    expect(treap.search(treap.root, 'Nonexistent')).toBe(null)
})

test('insert a new node', () => {
    const flour = new Node ('Flour', 10)
    const butter = new Node ('Butter', 76)
    const water = new Node ('Water', 32)
    const bacon = new Node ('Bacon', 77)
    const eggs = new Node ('Eggs', 129)
    const cabbage = new Node ('Cabbage', 159)
    const milk = new Node ('Milk', 55)
    const pork = new Node ('Pork', 56)

    const treap = new Treap()
    treap.root = flour
    flour.right = water
    water.left = milk
    milk.right = pork
    flour.left = butter
    butter.left = bacon
    butter.right = eggs
    eggs.left = cabbage

    treap.insert('Beer', 20)

    expect(treap.root.left.key).toBe('Beer')
    expect(treap.root.left.priority).toBe(20)
    expect(treap.root.left.left).toBe(bacon)
    expect(treap.root.left.right).toBe(butter)
})