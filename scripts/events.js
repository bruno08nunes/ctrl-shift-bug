import Status from "./status.js";

export default class Events {
    alreadyRandomizedEventIndexes = [];
    events = [];

    constructor(events) {
        this.events = events;
    }

    randomizeEvent() {
        const randomIndex = Math.floor(Math.random() * this.events.length);
        return { index: randomIndex, event: this.events[randomIndex] };
    }

    createEventElement(inputElement) {
        let { event, index } = this.randomizeEvent(this.events);

        const allIndexesAreRandomized =
            this.alreadyRandomizedEventIndexes.length === this.events.length;

        if (allIndexesAreRandomized) {
            this.alreadyRandomizedEventIndexes.length = 0;
        }

        let isIndexAlreadyRandomized =
            this.alreadyRandomizedEventIndexes.includes(index);

        while (isIndexAlreadyRandomized) {
            ({ event, index } = this.randomizeEvent(this.events));
            isIndexAlreadyRandomized =
                this.alreadyRandomizedEventIndexes.includes(index);
        }

        this.alreadyRandomizedEventIndexes.push(index);

        if (event.effect) {
            const money = event.effect.money;
            const mentalHealth = event.effect.mentalHealth;
            const energy = event.effect.energy;
            const maxEnergy = event.effect.maxEnergy;
            const maxMentalHealth = event.effect.maxMentalHealth;

            Status.setAllStatus({
                money,
                mentalHealth,
                energy,
                maxEnergy,
                maxMentalHealth,
            });

            Status.updateStatusElement();
        }

        if (event.actions) {
            inputElement.disabled = true;
        }

        const handleEventSubmit = (effect, divButtons) => {
            const money = effect.money;
            const mentalHealth = effect.mentalHealth;
            const energy = effect.energy;
            const maxEnergy = effect.maxEnergy;
            const maxMentalHealth = effect.maxMentalHealth;

            Status.setAllStatus({
                money,
                mentalHealth,
                energy,
                maxEnergy,
                maxMentalHealth,
            });
            Status.updateStatusElement();

            inputElement.disabled = false;
            divButtons.remove();
        };

        const sectionEvents = document.querySelector(".section-events");
        sectionEvents.innerHTML += `
            <div class="event">
                <h3>${event.title}</h3>
                <p>${event.text}</p>
                ${
                    event.actions
                        ? `
                    <div class="event-buttons">
                        <button data-effect="0">${event.actions[0].text}</button>
                        <button data-effect="1">${event.actions[1].text}</button>
                    </div>
                    `
                        : ""
                }
            </div>
        `;

        const divButtons = document.querySelector(".event-buttons");
        const buttons = document.querySelectorAll(".event-buttons button");
        buttons.forEach((button) =>
            button.addEventListener("click", (e) => {
                const effect = event.actions[e.target.dataset.effect].effect
                handleEventSubmit(
                    effect, divButtons
                );
            })
        );

        sectionEvents.scrollTop = sectionEvents.scrollHeight;
    }
}
