const form = document.querySelector(".register-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = {
        username: username,
        email: email,
        password: password,
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    location.pathname = "index.html";
});
