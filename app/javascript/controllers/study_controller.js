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
    this.random_cards = util.shuffle(this.cardsValue)
    this.current_index = this.indexValue
    this.current_card = this.random_cards[this.current_index]
    this.print_card()
  }

  print_card() {
    this.termTarget.textContent = this.current_card.term
    this.update_label()
    this.reset_fields()
    const input = document.getElementById('input');
    input.focus();
    input.select();
  }

  async check(event) {
    switch (util.validate_answer(this.guessTarget.value.toLowerCase().trim(), this.current_card.definition.toLowerCase().trim())) {
      case 0:
        this.correctnessTarget.textContent = "Correct!";
        this.correct += 1;
        break;
      case 1:
        this.correctnessTarget.textContent = "Mostly Correct!";
        this.correctnessTarget.textContent += ` The correct answer is "${this.current_card.definition}"`;
        this.correct += 1;
        break;
      case 2:
        this.correctnessTarget.textContent = "Incorrect!";
        this.correctnessTarget.textContent += ` The correct answer is "${this.current_card.definition}"`;
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
    this.current_index += 1
    this.current_card = this.random_cards[this.current_index]
    this.print_card()
  }

  update_label() {
    this.labelTarget.textContent = `Question ${this.current_index + 1}/${this.random_cards.length} Correct: ${this.correct}, Incorrect: ${this.incorrect}`
  }

  reset_fields() {
    this.guessTarget.value = ""
    this.correctnessTarget.textContent = ""
    this.buttonTarget.disabled = false
    this.guessTarget.disabled = false
  }
}
