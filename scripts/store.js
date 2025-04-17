import Inventory from "./inventory.js";
import Status from "./status.js";

export default class Store {
    static items = [];

    static buyItem(id) {
        const index = this.items.findIndex((item) => item.id === id);

        if (index !== -1) {
            const [removedItem] = this.items.splice(index, 1);
            Inventory.items.push(removedItem);
            Inventory.listItems();
            Status.setAllStatus({ money: -removedItem.price });
            Status.updateStatusElement();
        }
    }

    static listItems() {
        const storeArticle = document.querySelector(".section-store");
        storeArticle.innerHTML = `<h2>Loja</h2>
        <p class="no-items-message">Você já comprou todos os itens!</p>`;

        this.items.forEach((item) => {
            storeArticle.innerHTML += `
            <div class="item">
                <h3>${item.title}</h3>
                <span>${item.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                })}</span>
                <p>${item.text}</p>
                <button class="button-store-item" data-id="${
                    item.id
                }">Comprar</button>
            </div>
            `;
        });

        const buttons = document.querySelectorAll(".button-store-item");
        buttons.forEach((button) =>
            button.addEventListener("click", (e) => {
                Store.buyItem(button.dataset.id);
                Store.listItems();
            })
        );
    }
}
