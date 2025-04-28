const form = document.querySelector(".register-form");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = {
        name: username,
        email: email,
        password: password,
    };

    const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    const { data } = await res.json();

    localStorage.setItem("userData", JSON.stringify({...userData, id: data.insertId}));

    location.pathname = "index.html";
});
