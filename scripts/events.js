import Status from "./status.js";

export default class Events {
    static _alreadyRandomizedEventIndexes = [];
    static events = [];

    static randomizeEvent() {
        const randomIndex = Math.floor(Math.random() * this.events.length);
        return { index: randomIndex, event: this.events[randomIndex] };
    }

    static applyEffectInStatus(effect) {
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
    }

    static createEventElement(inputElement) {
        let { event, index } = this.randomizeEvent(this.events);

        const allIndexesAreRandomized =
            this._alreadyRandomizedEventIndexes.length === this.events.length;
        if (allIndexesAreRandomized) {
            this._alreadyRandomizedEventIndexes.length = 0;
        }

        let isIndexAlreadyRandomized =
            this._alreadyRandomizedEventIndexes.includes(index);

        while (isIndexAlreadyRandomized) {
            ({ event, index } = this.randomizeEvent(this.events));
            isIndexAlreadyRandomized =
                this._alreadyRandomizedEventIndexes.includes(index);
        }

        this._alreadyRandomizedEventIndexes.push(index);

        if (event.effect) {
            this.applyEffectInStatus(event.effect);
        }

        if (event.actions) {
            inputElement.disabled = true;
        }
        
        const handleEventSubmit = (action) => {
            this.applyEffectInStatus(action.effect);
            
            inputElement.disabled = false;
            
            const divButtons = document.querySelector(".event-buttons");
            divButtons.remove();
            
            const eventElement = document.querySelector(`.event:last-child`);
            eventElement.innerHTML += `
                <p><span class="result-event-title">Resultado: </span>${action.result}</p>
                <div class="icons">
                    ${
                        Object.entries(action.effect).map(([effectName, effectValue]) => {
                            return `<span class="icon">
                                <img src="/assets/${effectName}-icon.svg" style="${window.matchMedia("(prefers-color-scheme: dark)").matches ? "filter: invert()" : ""}"> 
                                ${effectValue > 0 ? `+${effectValue}` : effectValue}
                            </span>`;
                        })
                    }
                </div>
            `;
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

        const buttons = document.querySelectorAll(".event-buttons button");
        buttons.forEach((button) =>
            button.addEventListener("click", (e) => {
                const action = event.actions[e.target.dataset.effect]
                handleEventSubmit(
                    action
                );
            })
        );

        sectionEvents.scrollTop = sectionEvents.scrollHeight;
    }
}
