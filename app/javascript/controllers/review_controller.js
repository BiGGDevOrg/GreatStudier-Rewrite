import { Controller } from "@hotwired/stimulus";
import * as util from "../util";

// Connects to data-controller="review"

export default class extends Controller {
    static values = {
        cards: Array
    }

}