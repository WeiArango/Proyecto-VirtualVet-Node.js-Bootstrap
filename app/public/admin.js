//Vamos a programar el botón cerrar sesión
document.getElementsByTagName("button")[0].addEventListener("click", () => {
//Generamos una cokie que ya esté expirada y cuando el navegador detecte que tiene una cookie que ya expiró, la borra automaticamente
    document.cookie='jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.location.href = "/"
})