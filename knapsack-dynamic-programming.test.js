import { KnapsackDynamicSolver, Item } from './knapsack-dynamic-programming.js'

test('the last cell of the grid has the answer', () => {
	const guitar = new Item ('guitar', 1, 1500)
	const stereo = new Item ('stereo', 4, 3000)
	const laptop = new Item ('laptop', 3, 2000)
	const iphone = new Item ('iphone', 1, 2000)
	const mp3 = new Item ('mp3', 1, 1000)
	const items = [guitar, stereo, laptop, iphone, mp3]
	const knapsack_capacity = 4
	const solver = new KnapsackDynamicSolver(items, knapsack_capacity)
	const solution = solver.solve()

	const answer = solution[items.length - 1][knapsack_capacity - 1]
	expect(answer.items).toContain(guitar)
	expect(answer.items).toContain(iphone)
	expect(answer.items).toContain(mp3)
	expect(answer.value).toBe(4500)
})

test('the order of the rows of the grid doesn\'t matter', () => {
	const guitar = new Item ('guitar', 1, 1500)
	const stereo = new Item ('stereo', 4, 3000)
	const laptop = new Item ('laptop', 3, 2000)
	const items = [stereo, laptop, guitar]
	const knapsack_capacity = 4
	const solver = new KnapsackDynamicSolver(items, knapsack_capacity)
	const solution = solver.solve()

	const answer = solution[items.length - 1][knapsack_capacity - 1]
	expect(answer.items).toContain(guitar)
	expect(answer.items).toContain(laptop)
	expect(answer.value).toBe(3500)	
})