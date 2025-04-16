import { events } from "../scripts.js";

const codeElement = document.querySelector("pre");
const currentCodeAmountElement = document.querySelector(".current-code-amount");
const maxCodeAmountElement = document.querySelector(".max-code-amount");

export default class Codes {
    codes = [];
    constructor(codes) {
        this.codes = codes;
    }

    randomizeCodes() {
        const randomIndex = Math.floor(Math.random() * this.codes.length);
        return this.codes[randomIndex];
    }

    updateCode() {
        const code = this.randomizeCodes(this.codes);
        codeElement.textContent = code;
    }
}