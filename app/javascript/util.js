import levenshtein from "damerau-levenshtein";


const SPACED_REPETITION = [
    -2147483648,
    0,
    14400,
    86400,
    259200,
    604800,
    1209600,
    1814400,
    2592000,
    3888000,
    5184000,
    5184000,
    5184000,
    5184000,
    5184000,
    5184000,
    5184000,
    5184000,
    5184000,
    5184000,
    5184000,
    5184000,
    2147483647
]

const AFTER_WRONG_RETURN_REP_TO = 1


export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function validate_answer(guess, answer) {
    guess = guess.toLowerCase().trim()
    answer = answer.toLowerCase().trim()
    if (guess === answer) {
        return 0;
    }
    let mistakes_allowed = Math.min(guess.length/4, 4)
    if (levenshtein(guess, answer).steps <= mistakes_allowed) {
        return 1;
    }
    return 2;
}

export function get_studyable(list, set_id) {
    let new_words = []
    let review_words = []
    if (!("sets" in window.localStorage)) {
        window.localStorage.setItem("sets", JSON.stringify({}))
    }
    let sets = JSON.parse(window.localStorage.getItem("sets"))
    if (!(set_id in sets)) {
        sets[set_id] = {}
        window.localStorage.setItem("sets", JSON.stringify(sets))
        return [list, review_words]
    }
    for (let i = 0; i < list.length; i++) {
        let id = list[i].id
        let set = sets[set_id]
        if (!(id in set)) {
            new_words.push(list[i])
            continue
        }
        if (set[id]["last_covered"] + SPACED_REPETITION[set[id]["repetition_spot"]] <= Date.now() / 1000) {
            if (set[id]["repetition_spot"] === 0) {
                new_words.push(list[i])
            } else {
                review_words.push(list[i])
            }
        }
    }
    return [new_words, review_words]
}

export function get_time_to_next_review(list, set_id) {
    if (list.length === 0) {
        return null
    }
    let sets = JSON.parse(window.localStorage.getItem("sets"))
    let set = sets[set_id]
    let min_time = 2147483647
    let repetition = 2147483647
    for (let i = 0; i < list.length; i++) {
        let id = list[i].id
        if (!(id in set)) {
            return null
        }
        repetition = Math.min(repetition, set[id]["repetition_spot"])
        min_time = Math.min(min_time, set[id]["last_covered"] + SPACED_REPETITION[set[id]["repetition_spot"]] - Date.now() / 1000)
    }
    return repetition === 0 ? null : [min_time / 3600 | 0, (min_time % 3600) / 60 | 0, (min_time % 3600) % 60 | 0]
}

export function increment_knowledge(key, set_id, correctness = true) {
    let sets = JSON.parse(window.localStorage.getItem("sets"))
    let set = sets[set_id]
    if (!(key.id in set)) {
        set[key.id] = {"last_covered": 0, "repetition_spot": 0}
    }
    set[key.id]["last_covered"] = correctness ? Math.trunc(Date.now() / 1000) : set[key.id]["last_covered"]
    set[key.id]["repetition_spot"] = correctness ? set[key.id]["repetition_spot"] + 1 : Math.min(AFTER_WRONG_RETURN_REP_TO, set[key.id]["repetition_spot"])
    window.localStorage.setItem("sets", JSON.stringify(sets))
}
