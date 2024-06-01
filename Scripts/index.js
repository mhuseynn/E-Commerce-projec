



const btn = document.getElementById("register");

//Register
async function createPost(postData) {
    try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        alert("error");
    }
}

btn.addEventListener("click", () => {
    const names = document.getElementById("names").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createPost({ name: names, surname: surname, email: email, password: password });
});