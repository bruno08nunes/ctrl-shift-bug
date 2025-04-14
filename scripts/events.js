export const getEvents = (events) => {
    const sectionEvents = document.querySelector(".section-events");
    for (const event of events) {
        sectionEvents.innerHTML += `
        <div class="event">
            <h3>${event.title}</h3>
            <p>${event.text}</p>
        </div>`
    }
}