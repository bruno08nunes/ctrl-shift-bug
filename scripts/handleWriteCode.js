import Events from "./events.js";
import Codes from "./code.js"

const codeElement = document.querySelector("pre");
const currentCodeAmountElement = document.querySelector(".current-code-amount");
const maxCodeAmountElement = document.querySelector(".max-code-amount");

export const handleWriteCode = (e) => {
    const textareaValue = e.target.value
        .replace(/\s+/g, "")
        .replace(/\n+/g, "");

    const code = codeElement.textContent
        .replace(/\s+/g, "")
        .replace(/\n+/g, "");

    if (textareaValue !== code) {
        return;
    }

    const currentCodeAmount = +currentCodeAmountElement.textContent;
    const maxCodeAmount = +maxCodeAmountElement.textContent;

    setTimeout(() => {
        e.target.value = "";
    }, 200)
    Codes.updateCode();

    if (currentCodeAmount < maxCodeAmount) {
        currentCodeAmountElement.textContent = currentCodeAmount + 1;

        return;
    }
    
    currentCodeAmountElement.textContent = 1;
    Events.createEventElement(e.target);
};
