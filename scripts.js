import { changeTab } from "./scripts/changeTab.js";
import { handleWriteCode, updateCode } from "./scripts/code.js";
import { getData } from "./scripts/init.js";

const buttonsTabs = document.querySelectorAll(".section-tabs-menu button");
const textarea = document.querySelector("textarea");

const data = await getData();

updateCode(data.codes);

buttonsTabs.forEach(button => button.addEventListener("click", changeTab));
textarea.addEventListener("input", handleWriteCode)