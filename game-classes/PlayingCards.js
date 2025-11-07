class PlayingCards {
  constructor(numDecks, shuffled = true) {
    this.cards = [];
    for (let i = 0; i < numDecks; i++) {
      const suits = ["s", "h", "d", "c"]; // spades, hearts, diamonds, clubs
      const ranks = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
        "A",
      ];

      for (const suit of suits) {
        for (const rank of ranks) {
          this.cards.push(`${rank}${suit}`);
        }
      }
    }

    if (shuffled == true) {
      this.shuffle();
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  drawOne() {
    return this.cards.pop();
  }

  drawMultiple(num) {
    return this.cards.splice(-num, num);
  }

  draw(num) {
    if (num == 1) {
      return this.drawOne();
    } else {
      return this.drawMultiple(num);
    }
  }

  burn() {
    this.cards.pop();
  }

  getCards() {
    return this.cards;
  }
}

let cards = new PlayingCards(1);
console.log(cards.getCards());
console.log(cards.draw(1));
console.log(cards.getCards());
console.log(cards.draw(6));
console.log(cards.getCards());
