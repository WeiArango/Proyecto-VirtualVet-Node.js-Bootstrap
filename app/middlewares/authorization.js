//Archivo para la autorización de usuarios para permanecer o no en admin, register o login si están loggeados o no
// Los middlewares son códigos que se interponen entre la req y la res y nos permiten hacer cosas en el medio. En este caso vamos a revisar antes de mandar la respuesta si esta persona tiene acceso para estar en ese lugar y eso lo hacemos desde index.js en Routing
import JsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";
import { usuarios } from "./../controllers/authentication.controller.js";

dotenv.config();

function soloAdmin(req, res, next) { //Next en los middwares es lo que ejecutamos para decir que siga adelante en la linea de procesos que tiene que hacer, osea que pase al próximo middware
    const logueado = revisarCookie(req);
    if(logueado) return next();
    return res.redirect("/");     
}

function soloPublico(req, res, next) {
    const logueado = revisarCookie(req);
    if(!logueado) return next();
    return res.redirect("/admin");  
}

function revisarCookie(req) {
    try {
        //Para mostar la cookie 
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
         console.log("COOKIE", cookieJWT)
        //Para decodificar el password
        const decodificada = JsonWebToken.verify(cookieJWT, process.env.JWT_SECRET)    
        console.log(decodificada);
        //Para validar la cookie con el usuario
        const usuarioValidar = usuarios.find(usuario => usuario.name === decodificada.name);
        console.log(usuarioValidar);
        if(!usuarioValidar) {
             return false
        }
         return true;
    }
    catch {
        return false;
    }
}

export const methods = {
    soloAdmin,
    soloPublico
}