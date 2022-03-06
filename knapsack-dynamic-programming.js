export class Item {
	constructor(name, weight, value) {
		this.name = name
		this.weight = weight
		this.value = value
	}
}

class Cell {
	constructor() {
		this.items = []
		this.value = 0
	}
}

export class KnapsackDynamicSolver {
	grid = []

	constructor(items, capacity) {
		this.items = items
		this.capacity = capacity
	}

	solve() {
		for (let i = 0; i < this.items.length; i++) {

			const current_item = this.items[i]
			const row = []
			for (let j = 0; j < this.capacity; j++) {
				row.push(new Cell ())

				const previous_max_value = i === 0 ? 0 : this.grid[i - 1][j].value

				if (current_item.weight <= (j + 1)) {
					// if the current item fits in the smaller knapsack				
					let value_of_the_remaining_weight = 0
					const remaining_weight = j + 1 - current_item.weight
					if (remaining_weight > 0) {
						value_of_the_remaining_weight = i === 0 ? 0 : this.grid[i - 1][remaining_weight - 1].value
					}
					const possible_value = current_item.value + value_of_the_remaining_weight
					if (possible_value > previous_max_value) {
						if (i > 0 && remaining_weight > 0) {
							const remaining_weight_cell = this.grid[i - 1][remaining_weight - 1]
							row[j].items.push(...remaining_weight_cell.items)
						}					
						row[j].items.push(current_item)
						row[j].value = possible_value
					} else {
						if (i > 0) {
							const above_cell = this.grid[i - 1][j]
							row[j].items = [...above_cell.items]
							row[j].value = above_cell.value
						}						
					}
				} else {
					if (i > 0) {
						const above_cell = this.grid[i - 1][j]
						row[j].items = [...above_cell.items]
						row[j].value = above_cell.value
					}
				}				
			}
			this.grid.push(row)
		}

		return this.grid
	}
}
