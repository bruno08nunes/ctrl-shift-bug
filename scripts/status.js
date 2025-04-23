export default class Status {
    static money = 1000;
    static moneyBonus = 0;

    static mentalHealth = 50;
    static maxMentalHealth = 100;

    static energy = 50;
    static maxEnergy = 100;

    static week = 0;

    static currentCodeAmount = 0;
    static maxCodeAmount = 1;

    static gameOverAlreadyStart = false;

    static gameOver() {
        if (this.gameOverAlreadyStart) {
            return;
        }
        const player = JSON.parse(localStorage.getItem("userData") ?? "{}");
        const ranking = JSON.parse(localStorage.getItem("ranking") ?? "[]");
        ranking.push({ name: player.username, score: Status.week });
        localStorage.setItem("ranking", JSON.stringify(ranking));

        this.gameOverAlreadyStart = true;

        alert("Você perdeu");
        location.reload();
    }

    static winGame() {
        alert("Você venceu");
        location.reload();
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
        if (money > 0) {
            this.money += this.moneyBonus
        }
        this.money += money;
        this.moneyBonus += moneyBonus;
        this.mentalHealth += mentalHealth;
        this.energy += energy;
        this.maxEnergy += maxEnergy;
        this.maxMentalHealth += maxMentalHealth;

        if (win) {
            this.winGame();
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
