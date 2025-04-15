export const randomizeEvent = (events) => {
    const randomIndex = Math.floor(Math.random() * events.length);
    return events[randomIndex];
};

export const createEventElement = (events) => {
    const event = randomizeEvent(events);

    const sectionEvents = document.querySelector(".section-events");
    sectionEvents.innerHTML += `
    <div class="event">
        <h3>${event.title}</h3>
        <p>${event.text}</p>
        ${event.actions ? `
            <div>
                <button>${event.actions[0].text}</button>
                <button>${event.actions[1].text}</button>
            </div>
        ` : ""}
    </div>
    `;
};
