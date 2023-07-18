import { Controller } from "@hotwired/stimulus"
import * as util from "../util"

// Connects to data-controller="study"
export default class extends Controller {
  static values = {
    cards: Array,
    index: Number
  }

  static targets = ["term", "guess"]

  connect() {
    this.randomize_card()
    this.current_index = this.indexValue
    this.current_card = this.random_cards[this.current_index]
    this.print_card()
  }

  print_card() {
    this.termTarget.textContent = this.current_card.term
  }

  check(event) {
    util.validate_answer(this.guessTarget.value.trim(), this.current_card.definition)
    this.next_card()
  }

  next_card() {
    if (this.current_index + 1 === this.random_cards.length) {
      // TODO: show results and return to card_set_path
      return
    }
    this.current_index += 1
    this.current_card = this.random_cards[this.current_index]
    this.print_card()
  }


  randomize_card() {
    this.random_cards = util.shuffle(this.cardsValue)
  }
}
