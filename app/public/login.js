const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();//Esto evita que la página se actualice
    console.log(e.target.children.name.value);
    console.log(e.target.children.password.value);

    // const name = e.target.children.name.value;
    // const password = e.target.children.password.value;
    const res = await fetch("http://localhost:3000/api/login", {
        method:"POST",
        headers: {
            "content-Type" : "application/json"
            },
            body: JSON.stringify({
                name: e.target.children.name.value,                
                password: e.target.children.password.value        
            })
    });
    if(!res.ok) return mensajeError.classList.toggle("escondido", false);
    const resJson = await res.json();
    if(resJson.redirect) {
        window.location.href = resJson.redirect;
    }
})