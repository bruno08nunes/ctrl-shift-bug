const tabs = document.querySelectorAll(".tab");
const buttonsTabs = document.querySelectorAll(".section-tabs-menu button");

export const changeTab = (e) => {
    const tabName = e.target.dataset.tab;

    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add("active");
            return;
        }
        tab.classList.remove("active");
    });
    buttonsTabs.forEach(button => {
        if (button.dataset.tab === tabName) {
            button.classList.add("active");
            return;
        }
        button.classList.remove("active");
    });
}