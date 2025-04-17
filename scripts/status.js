export default class Status {
    static money = 100;

    static mentalHealth = 100;
    static maxMentalHealth = 100;

    static energy = 100;
    static maxEnergy = 100;

    static setAllStatus({
        money = 0,
        mentalHealth = 0,
        energy = 0,
        maxEnergy = 0,
        maxMentalHealth = 0,
    }) {
        Status.money += money;
        Status.mentalHealth += mentalHealth;
        Status.energy += energy;
        Status.maxEnergy += maxEnergy;
        Status.maxMentalHealth += maxMentalHealth;
    }

    static updateStatusElement() {
        const moneyElement = document.querySelector(".money-status");
        const mentalHealthElement = document.querySelector(
            ".mental-health-status"
        );
        const energyElement = document.querySelector(".energy-status");
        const maxMentalHealthElement = document.querySelector(
            ".max-mental-health-status"
        );
        const maxEnergyElement = document.querySelector(".max-energy-status");

        moneyElement.textContent = this.money.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
        mentalHealthElement.textContent = this.mentalHealth;
        energyElement.textContent = this.energy;
        maxMentalHealthElement.textContent = this.maxMentalHealth;
        maxEnergyElement.textContent = this.maxEnergy;
    }
}
