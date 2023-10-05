const btn = document.getElementById("btn");

async function login() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    const email = document.getElementById("email").value;

    for (let user of users) {
        if (user.email === email) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));

            location.replace("http://127.0.0.1:5500/eighth%20task/discover%20page/discover.html")
        }
    }
}

btn.addEventListener("click", login)