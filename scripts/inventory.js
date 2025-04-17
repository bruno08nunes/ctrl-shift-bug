export default class Inventory {
    static items = [];

    static listItems() {
        const storeArticle = document.querySelector(".inventory-article");
        storeArticle.innerHTML = `<h3>Equipamentos</h3>
        <p class="no-items-message">Você não possui nenhum item!</p>`;

        this.items.forEach((item) => {
            storeArticle.innerHTML += `
            <div class="item">
                <h3>${item.title}</h3>
                <p>${item.text}</p>
            </div>
            `;
        });
    }
}