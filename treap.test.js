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

test('leaves don\'t have children', () => {
    const butter = new Node ('Butter', 111)
    const bread = new Node ('Bread', 222)
    butter.left = bread
    
    expect(butter.is_leaf).toBe(false)
    expect(bread.is_leaf).toBe(true)
})

test('a root doesn\'t have a parent', () => {
    const butter = new Node ('Butter', 111)
    const bread = new Node ('Bread', 222)
    butter.left = bread

    expect(butter.is_root).toBe(true)
    expect(bread.is_root).toBe(false)
})

test('deleting a key', () => {
    const flour = new Node ('Flour', 10)
    const beer = new Node ('Beer', 20)
    const water = new Node ('Water', 32)
    const milk = new Node ('Milk', 55)
    const pork = new Node ('Pork', 56)
    const butter = new Node ('Butter', 76)
    const beet = new Node ('Beet', 81)
    const eggs = new Node ('Eggs', 129)
    const cabbage = new Node ('Cabbage', 159)

    const treap = new Treap()
    treap.root = flour
    flour.right = water
    water.left = milk
    milk.right = pork
    flour.left = beer
    beer.right = butter
    butter.left = beet
    butter.right = eggs
    eggs.left = cabbage

    treap.remove('Butter')

    expect(treap.root).toBe(flour)
    expect(treap.root.left).toBe(beer)
    expect(treap.root.left.right).toBe(beet)
    expect(treap.root.left.right.right).toBe(eggs)
    expect(treap.root.left.right.right.left).toBe(cabbage)
    expect(cabbage.is_leaf).toBe(true)
})

test('min and max keys', () => {
    const flour = new Node ('Flour', 10)
    const butter = new Node ('Butter', 76)
    const water = new Node ('Water', 32)
    const bacon = new Node ('Bacon', 77)
    const eggs = new Node ('Eggs', 129)
    const beer = new Node ('Beer', 95)
    const milk = new Node ('Milk', 55)
    const pork = new Node ('Pork', 56)

    const treap = new Treap()
    treap.root = flour
    flour.right = water
    water.left = milk
    milk.right = pork
    flour.left = butter
    butter.left = bacon
    bacon.right = beer
    butter.right = eggs
    
    expect(treap.min()).toBe('Bacon')
    expect(treap.max()).toBe('Water')
})