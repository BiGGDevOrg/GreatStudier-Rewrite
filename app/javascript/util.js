import levenshtein from "damerau-levenshtein";

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function validate_answer(guess, answer) {
    if (guess === answer) {
        return 0;
    }
    let mistakes_allowed = Math.min(guess.length/4, 4)
    if (levenshtein(guess, answer).steps <= mistakes_allowed) {
        return 1;
    }
    return 2;
}
