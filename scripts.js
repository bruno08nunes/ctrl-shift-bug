import { changeTab } from "./scripts/changeTab.js";
import Codes from "./scripts/code.js";
import Events from "./scripts/events.js";
import { getData } from "./scripts/init.js";
import { handleWriteCode } from "./scripts/handleWriteCode.js";
import Store from "./scripts/store.js";
import Inventory from "./scripts/inventory.js";
import Status from "./scripts/status.js";

const buttonsTabs = document.querySelectorAll(".section-tabs-menu button");
const textarea = document.querySelector("textarea");

const data = await getData();

export const events = new Events(data.events);
export const codes = new Codes(data.codes);
codes.updateCode();
Store.items = data.storeItems;
Store.listItems();
Inventory.listItems();
Status.updateStatusElement();

buttonsTabs.forEach(button => button.addEventListener("click", changeTab));
textarea.addEventListener("input", handleWriteCode)