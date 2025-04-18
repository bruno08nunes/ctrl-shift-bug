const codeElement = document.querySelector("pre");

export default class Codes {
    static codes = [];

    static randomizeCodes() {
        const randomIndex = Math.floor(Math.random() * this.codes.length);
        return this.codes[randomIndex];
    }

    static updateCode() {
        const code = this.randomizeCodes(this.codes);
        codeElement.textContent = code;
    }
}