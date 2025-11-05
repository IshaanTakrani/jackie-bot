export class Die {
	constructor(number) {
		this.number = number;
	}

	roll() {
		return Math.floor(Math.random() * this.number) + 1;
	}

	rollMultiple(numDie) {
		return Array.from({ length: numDie }, () => this.roll());
	}

	rollMultipleSum(numDie) {
		return this.rollMultiple(numDie).reduce((a, b) => a + b, 0);
	}
}
