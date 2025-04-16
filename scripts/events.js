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

    createEventElement() {
        let { event, index } = this.randomizeEvent(this.events);

        const allIndexesAreRandomized =
            this.alreadyRandomizedEventIndexes.length === this.events.length;

        if (allIndexesAreRandomized) {
            this.alreadyRandomizedEventIndexes.length = 0;
        }

        let isIndexAlreadyRandomized =
            this.alreadyRandomizedEventIndexes.includes(index);
        while (isIndexAlreadyRandomized) {
            console.log(this.alreadyRandomizedEventIndexes);
            ({ event, index } = this.randomizeEvent(this.events));
            isIndexAlreadyRandomized =
                this.alreadyRandomizedEventIndexes.includes(index);
        }

        this.alreadyRandomizedEventIndexes.push(index);

        const sectionEvents = document.querySelector(".section-events");
        sectionEvents.innerHTML += `
            <div class="event">
                <h3>${event.title}</h3>
                <p>${event.text}</p>
                ${
                    event.actions
                        ? `
                    <div>
                        <button>${event.actions[0].text}</button>
                        <button>${event.actions[1].text}</button>
                    </div>
                    `
                        : ""
                }
            </div>
        `;
    }
}
