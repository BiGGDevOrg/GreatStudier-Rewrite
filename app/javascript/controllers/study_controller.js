import { Controller } from "@hotwired/stimulus"
import * as util from "../util"

// Connects to data-controller="study"
export default class extends Controller {
  static values = {
    cards: Array,
    index: Number
  }

  static targets = ["label", "term", "guess", "button", "correctness"]

  correct = 0
  incorrect = 0

  connect() {
    this.randomize_card()
    this.current_index = this.indexValue
    this.current_card = this.random_cards[this.current_index]
    this.print_card()
    this.update_label()
  }

  print_card() {
    this.guessTarget.value = ""
    this.correctnessTarget.textContent = ""
    this.termTarget.textContent = this.current_card.term
  }

  async check(event) {
    switch (util.validate_answer(this.guessTarget.value.trim(), this.current_card.definition.trim())) {
      case 0:
        this.correctnessTarget.textContent = "Correct!";
        this.correct += 1;
        break;
      case 1:
        this.correctnessTarget.textContent = "Mostly Correct!";
        this.correct += 1;
        break;
      case 2:
        this.correctnessTarget.textContent = "Incorrect!";
        this.incorrect += 1;
        break;
    }
    this.buttonTarget.disabled = true
    this.guessTarget.disabled = true
    this.update_label()
    await new Promise(r => setTimeout(r, 1000));
    this.next_card()
  }

  next_card() {
    if (this.current_index + 1 === this.random_cards.length) {
      return
    }
    this.buttonTarget.disabled = false
    this.guessTarget.disabled = false
    this.current_index += 1
    this.current_card = this.random_cards[this.current_index]
    this.update_label()
    this.print_card()
  }

  update_label() {
    this.labelTarget.textContent = `Question ${this.current_index + 1}/${this.random_cards.length} Correct: ${this.correct}, Incorrect: ${this.incorrect}`
  }


  randomize_card() {
    this.random_cards = util.shuffle(this.cardsValue)
  }
}
