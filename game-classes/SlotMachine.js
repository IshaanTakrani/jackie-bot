export class SlotMachine {
  constructor(numReels) {
    this.numReels = numReels;
    this.reelsArray = [];
    this.reelsSymbolString = "";
    this.score = 0;
  }

  spin() {
    for (let i = 0; i < this.numReels; i++) {
      let max = Math.floor(5);
      this.reelsArray.push(Math.floor(Math.random() * (max - 1 + 1)) + 1);
    }
    this.numToSymbol();
  }

  numToSymbol() {
    // let reelsSymbolArray = [];

    for (let i = 0; i < this.reelsArray.length; i++) {
      if (this.reelsArray[i] == 1) {
        this.reelsSymbolString += ":apple:  ";
      } else if (this.reelsArray[i] == 2) {
        this.reelsSymbolString += ":lemon:  ";
      } else if (this.reelsArray[i] == 3) {
        this.reelsSymbolString += ":bell:  ";
      } else if (this.reelsArray[i] == 4) {
        this.reelsSymbolString += ":cherries:  ";
      } else if (this.reelsArray[i] == 5) {
        this.reelsSymbolString += ":watermelon:  ";
      }
    }
    return this.reelsSymbolString;
  }

  getRepeats(arr) {
    const frequencyMap = {};

    for (const num of arr) {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }

    let maxOccurrences = 0;
    for (const count of Object.values(frequencyMap)) {
      maxOccurrences = Math.max(maxOccurrences, count);
    }

    return maxOccurrences;
  }

  calculateScore(bet) {
    let repeats = this.getRepeats(this.reelsArray);
    if (repeats == 1) {
      this.score = -1 * bet;
    } else if (repeats == 2) {
      this.score = bet;
    } else if (repeats == 3) {
      this.score = bet * 5;
    }
    console.log(this.score);
  }

  getScore() {
    return this.score;
  }
  getReelsSymbolString() {
    return this.reelsSymbolString;
  }
}

// let myMachine = new SlotMachine(3);
// let numTrials = 1000;
// let bank = 1000;
// let bet = 100;

// let spin = myMachine.spin();
// let score = myMachine.calculateScore(spin, 100);
// console.log(spin);
// console.log(myMachine.numToSymbol(spin));

// for (let i = 0; i < 200; i++) {
// 	let spin = myMachine.spin();
// 	let score = myMachine.calculateScore(spin, bet);
// 	console.log(spin);

// 	console.log(myMachine.getRepeats(spin));
// }
// for (let i = 0; i < numTrials; i++) {
// 	let spin = myMachine.spin();
// 	let score = myMachine.calculateScore(spin, bet);
// 	bank -= score;
// 	console.log(score);

// 	// console.log(myMachine.numToSymbol(spin));
// }

// console.log(bank);
