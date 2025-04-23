const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

const tableBody = document.querySelector("#rankingTable tbody");
tableBody.innerHTML = "";

ranking.sort((a, b) => b.score - a.score);

ranking.forEach((player) => {
    const row = document.createElement("tr");
    const positionCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const scoreCell = document.createElement("td");

    nameCell.textContent = player.name;
    scoreCell.textContent = player.score;

    row.appendChild(positionCell);
    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    tableBody.appendChild(row);
});