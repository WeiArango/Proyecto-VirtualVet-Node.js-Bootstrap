//Para mostrar error cuando hay un error
const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("register-form").addEventListener("submit", async(e) => {
    e.preventDefault();
   console.log(e.target.children.name.value);
   console.log(e.target.children.email.value);
   console.log(e.target.children.phone.value);
   console.log(e.target.children.adress.value);
   console.log(e.target.children.password.value);
  

   const res = await fetch("http://localhost:3000/api/register", {
    method:"POST",
    headers: {
        "content-Type" : "application/json"
        },
        body: JSON.stringify({
            name: e.target.children.name.value,
            email: e.target.children.email.value,
            phone: e.target.children.phone.value,
            adress: e.target.children.adress.value,
            password: e.target.children.password.value        
        }) 
        
    }); 
    if(!res.ok) return mensajeError.classList.toggle("escondido", false);    
    const resJSON = await res.json();
    if(resJSON.redirect) {
        window.location.href = resJSON.redirect;
    }     
})
