export default class Status {
    static money = 1000;
    static moneyBonus = 0;

    static mentalHealth = 50;
    static maxMentalHealth = 100;

    static energy = 50;
    static maxEnergy = 100;

    static week = 0;

    static currentCodeAmount = 0;
    static maxCodeAmount = 5;

    static gameOver() {
        alert("Você perdeu");
    }

    static winGame() {
        alert("Você venceu");
    }

    static setAllStatus({
        money = 0,
        mentalHealth = 0,
        energy = 0,
        maxEnergy = 0,
        maxMentalHealth = 0,
        moneyBonus = 0,
        win = false
    }) {
        this.moneyBonus += moneyBonus;
        this.money += money + this.moneyBonus;
        this.mentalHealth += mentalHealth;
        this.energy += energy;
        this.maxEnergy += maxEnergy;
        this.maxMentalHealth += maxMentalHealth;
        this.win = win;

        if (win) {
            this.win();
            return;
        }

        if (this.mentalHealth > this.maxMentalHealth) {
            this.mentalHealth = this.maxMentalHealth;
        }

        if (this.energy > this.maxEnergy) {
            this.energy = this.maxEnergy;
        }

        if (this.money <= 0 || this.mentalHealth <= 0 || this.energy <= 0) {
            this.gameOver();
        }
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
