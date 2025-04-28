const getRanking = async () => {
    const res = await fetch("http://localhost:3000/rounds");
    const {data: ranking} = await res.json();
    
    const tableBody = document.querySelector("#rankingTable tbody");
    tableBody.innerHTML = "";
    
    ranking.forEach((player) => {
        console.log(player)
        const row = document.createElement("tr");
        const positionCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const scoreCell = document.createElement("td");
    
        nameCell.textContent = player.name;
        scoreCell.textContent = player.weeks;
    
        row.appendChild(positionCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        tableBody.appendChild(row);
    });
}

getRanking();