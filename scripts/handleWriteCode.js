import Events from "./events.js";
import Codes from "./code.js";
import Status from "./status.js";
import showToast from "./toast.js";

const codeElement = document.querySelector("pre");
const currentCodeAmountElement = document.querySelector(".current-code-amount");
const maxCodeAmountElement = document.querySelector(".max-code-amount");

export const handleWriteCode = (e) => {
    currentCodeAmountElement.textContent = Status.currentCodeAmount;
    maxCodeAmountElement.textContent = Status.maxCodeAmount;

    const textareaValue = e.target.value
        .replace(/\s+/g, "")
        .replace(/\n+/g, "");

    const code = codeElement.textContent
        .replace(/\s+/g, "")
        .replace(/\n+/g, "");

    if (textareaValue !== code) {
        return;
    }

    setTimeout(() => {
        e.target.value = "";
    }, 200);
    Codes.updateCode();

    Status.currentCodeAmount++;
    currentCodeAmountElement.textContent = Status.currentCodeAmount;
    if (Status.currentCodeAmount < Status.maxCodeAmount) {
        return;
    }

    Status.currentCodeAmount = 0;
    Status.maxCodeAmount = 5 + Math.ceil(Status.week / 3);
    currentCodeAmountElement.textContent = Status.currentCodeAmount;
    maxCodeAmountElement.textContent = Status.maxCodeAmount;

    Status.week++;

    // const moneyWon = 100 * Math.ceil((Status.week / 3) || 1);
    const moneyWon = 100 + (Status.week * 20);
    Status.setAllStatus({ money: moneyWon });
    showToast(`Você ganhou R$${moneyWon + Status.moneyBonus}!`);

    if (Status.week % 4 === 0) {
        // const moneyLose = -500 * Math.ceil((Status.week / 4) || 1);
        const moneyLose = -600 - (Status.week * 30); // cresce devagar, mas sempre
        Status.setAllStatus({ money: moneyLose });
        showToast(`Você gastou com seu aluguel: R$${Math.abs(moneyLose)}`);
    }

    Status.updateStatusElement();

    Events.createEventElement(e.target);
};
