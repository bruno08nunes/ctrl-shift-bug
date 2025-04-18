import Inventory from "./inventory.js";
import Codes from "./code.js";
import Events from "./events.js";
import Store from "./store.js";
import Status from "./status.js";

export default class StartGame {
    static async #getData() {
        const res = await fetch("../data.json");
        const results = await res.json();
    
        return results;
    };

    static async Reset() {
        const data = await this.#getData();

        Events.events = data.events;
        
        Codes.codes = data.codes;
        Codes.updateCode();
        
        Store.items = data.storeItems;
        Store.listItems();
        
        Inventory.items = [];
        Inventory.listItems();
        
        Status.updateStatusElement();
    }
}
