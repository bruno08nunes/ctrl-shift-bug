import { changeTab } from "./scripts/changeTab.js";
import { handleWriteCode } from "./scripts/handleWriteCode.js";
import StartGame from "./scripts/init.js";

const buttonsTabs = document.querySelectorAll(".section-tabs-menu button");
const textarea = document.querySelector("textarea");

StartGame.Reset();

buttonsTabs.forEach(button => button.addEventListener("click", changeTab));
textarea.addEventListener("input", handleWriteCode)