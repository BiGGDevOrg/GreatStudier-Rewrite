import { Controller } from "@hotwired/stimulus"
import * as util from "../util"


const REVIEW_CHUNK_SIZE = 15

// Connects to data-controller="quiz"
export default class extends Controller {
  static values = {
    cards: Array,
    isReview: Boolean,
    id: String
  }

  static targets = ["label", "term", "guess", "button", "overwriteButton", "correctness"]

  ended = false
  correct = 0
  incorrect = 0
  correctness = true

  nextAvailable = false  

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
    this.reset_fields()
    this.update_label()
    const input = document.getElementById('input');
    input.focus();
    input.select();
  }

  check() {
    if (this.ended) return
    if (this.nextAvailable) {
      this.next_card()
      return
    }

    switch (util.validate_answer(this.guessTarget.value, this.current_card.definition)) {
      case 0:
        this.correctnessTarget.textContent = "Correct!"
        this.correct += 1
        break
      case 1:
        this.correctnessTarget.textContent = "Mostly Correct!"
        this.correctnessTarget.textContent += ` The correct answer is "${this.current_card.definition}"`
        this.correct += 1
        break
      case 2:
        this.correctnessTarget.textContent = "Incorrect!"
        this.correctnessTarget.textContent += ` The correct answer is "${this.current_card.definition}"`
        this.incorrect += 1
        this.correctness = false
        this.overwriteButtonTarget.hidden = false 
        break
    }
    this.nextAvailable = true
    this.buttonTarget.textContent = "Next" 
    this.guessTarget.disabled = true
    this.update_label()
  }
  
  overwrite() {
    this.correct += 1
    this.incorrect -= 1
    this.correctness = true
    this.next_card()
  }

  async next_card() {
    await new Promise(r => setTimeout(r, 100));
    if (this.isReviewValue) {
      util.increment_knowledge(this.current_card, this.idValue, this.correctness)
    }

    if (this.current_index + 1 === this.random_cards.length) {
      this.end()
      return
    }
    this.current_index += 1
    this.current_card = this.random_cards[this.current_index]
    this.buttonTarget.textContent = "Check"
    this.print_card()
  }

  update_label() {
    this.labelTarget.textContent = `Question ${this.current_index + 1}/${this.random_cards.length} Correct: ${this.correct}, Incorrect: ${this.incorrect}`
  }

  reset_fields() {
    this.buttonTarget.disabled = false
    this.guessTarget.disabled = false
    this.nextAvailable = false
    this.correctness = true
    this.overwriteButtonTarget.hidden = true
    this.guessTarget.value = ""
    this.correctnessTarget.textContent = ""
  }

  end() {
    this.ended = true
    this.labelTarget.textContent = this.isReviewValue ? "Nothing new to review!" : "Finished study!"

    // don't display the correct/incorrect if there are no cards
    if (this.random_cards.length === 0) {
      this.termTarget.hidden = true
    } else {
      this.termTarget.textContent = `Correct: ${this.correct}, Incorrect: ${this.incorrect}`
      this.correctnessTarget.textContent = ""
    }

    // displays when you can review if in review mode
    if (this.isReviewValue) {
      let times = util.get_time_to_next_review(this.cardsValue, this.idValue)
      if (times === null) {
        this.correctnessTarget.textContent = "You have new words to learn before reviewing!"
      } else {
        this.correctnessTarget.textContent = times[0] + times[1] + times[2] <= 0 ? "You can review again!" :
            `Come back for your next review in ${times[0]} hours, ${times[1]} minutes, and ${times[2]} seconds.`
      }
    }

    this.guessTarget.hidden = true
    this.buttonTarget.hidden = true 
    this.overwriteButtonTarget.hidden = true
  }

  set_cards() {
    if (this.isReviewValue) {
      let reviewable = util.shuffle(util.get_studyable(this.cardsValue, this.idValue)[1])
      return reviewable.slice(0, Math.min(REVIEW_CHUNK_SIZE, reviewable.length))
    }
    return util.shuffle(this.cardsValue)
  }
}
