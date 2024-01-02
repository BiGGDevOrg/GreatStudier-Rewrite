import { Controller } from "@hotwired/stimulus"
import * as util from "../util"


const NEW_CHUNK_SIZE = 8

// Connects to data-controller="learn"
export default class extends Controller {
  static values = {
    cards: Array,
    id: String
  }

  static targets = ["label", "term", "definition", "guess", "button"]

  connect() {
    this.random_cards = this.set_cards()
    if (this.random_cards.length === 0) {
      this.end()
      return
    }
    this.current_index = 0
    this.current_card = this.random_cards[this.current_index]
    this.print_card()
  }

  print_card() {
    this.termTarget.textContent = this.current_card.term
    this.definitionTarget.textContent = this.current_card.definition
    this.update_label()
    this.reset_fields()
    const input = document.getElementById("input")
    input.focus()
    input.select()
  }

  check() {
    if (this.guessTarget.value.toLowerCase().trim() !== this.current_card.definition.toLowerCase().trim()) {
      this.guessTarget.value = ""
      return
    }
    util.increment_knowledge(this.current_card, this.idValue)
    this.buttonTarget.disabled = true
    this.guessTarget.disabled = true
    this.update_label()
    this.next_card()
  }

  next_card() {
    if (this.current_index + 1 === this.random_cards.length) {
      window.location.replace(`/s/${this.idValue}/review`)
      return
    }
    this.current_index += 1
    this.current_card = this.random_cards[this.current_index]
    this.print_card()
  }

  update_label() {
    let percent = this.current_index / this.random_cards.length * 100
    let header = `Question ${this.current_index + 1}/${this.random_cards.length}`
    this.labelTarget.innerHTML = ` 
      <br>
      <p>${header}</p>
      <div class="progress" role="progressbar" aria-label="Correct Progress" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"> 
        <div class="progress-bar bg-primary" style="width: ${percent}%"></div>
      </div>
    `
  }

  reset_fields() {
    this.guessTarget.value = ""
    this.buttonTarget.disabled = false
    this.guessTarget.disabled = false
  }

  end() {
    this.termTarget.textContent = "Nothing new to learn!"
    this.definitionTarget.textContent = ""
    this.guessTarget.style.display = "none"
    this.buttonTarget.style.display = "none"
  }

  set_cards() {
    let learnable = util.shuffle(util.get_studyable(this.cardsValue, this.idValue)[0])
    return learnable.slice(0, Math.min(NEW_CHUNK_SIZE, learnable.length))
  }
}
