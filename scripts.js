import { changeTab } from "./scripts/changeTab.js";

const buttonsTabs = document.querySelectorAll(".section-tabs-menu button");

buttonsTabs.forEach(button => button.addEventListener("click", changeTab));
