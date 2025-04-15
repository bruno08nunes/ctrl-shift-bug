const codeElement = document.querySelector("pre");
const currentCodeAmountElement = document.querySelector(".current-code-amount");
const maxCodeAmountElement = document.querySelector(".max-code-amount");

let codes;

export const randomizeCodes = () => {
    const randomIndex = Math.floor(Math.random() * codes.length);
    return codes[randomIndex];
};

export const updateCode = (codesArg) => {
    codes ??= codesArg;
    const code = randomizeCodes(codes);
    codeElement.textContent = code;
}

export const handleWriteCode = (e) => {
    const textareaValue = e.target.value.replace(/\s+/g, '').replace(/\n+/g, '');
    const code = codeElement.textContent.replace(/\s+/g, '').replace(/\n+/g, '');
    if (textareaValue !== code) {
        return;
    }

    const currentCodeAmount = +currentCodeAmountElement.textContent;
    const maxCodeAmount = +maxCodeAmountElement.textContent;

    if (currentCodeAmount < maxCodeAmount) {
        currentCodeAmountElement.textContent = currentCodeAmount + 1;

        updateCode();
    }
}