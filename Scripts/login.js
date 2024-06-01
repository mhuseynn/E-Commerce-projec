const btn = document.getElementById("login");

//Login
async function checkLogin(postData) {
    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            window.location.href = "main.html";
        } else {
            alert("Login failed.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error");
    }
}


btn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    checkLogin({ email: email, password: password });
});
