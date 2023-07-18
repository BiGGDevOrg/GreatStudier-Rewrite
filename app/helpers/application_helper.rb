require 'damerau-levenshtein'

module ApplicationHelper

  ValidationResult = {
    correct: 0,
    mostly_correct: 1,
    incorrect: 2
  }

  def validate_answer(guess, correct_answer)
    if guess == correct_answer
      return ValidationResult[:correct]
    end
    mistakes_allowed = [guess.length/4, 4].min
    if DamerauLevenshtein.distance(guess, correct_answer) <= mistakes_allowed
      return ValidationResult[:mostly_correct]
    end
    ValidationResult[:incorrect]
  end

end
